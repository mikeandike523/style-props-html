import {
  forwardRef,
  ReactNode,
  RefAttributes,
  HTMLAttributes,
  ForwardedRef,
  RefObject
} from "react";
import { kebabCase } from "lodash";
import {
  css as emotionCss,
  type Interpolation,
  type Theme,
  ClassNames,
} from "@emotion/react";

import cssPropertyMap, { CSSPropertyMap } from "./cssPropertyMap";
import { allTags, voidTags } from "./htmlTagData";
import { specialCaseList, specialCaseMap } from "./special-cases";

/**
 * List of valid CSS property names
 */
const cssPropertyNames = Object.keys(cssPropertyMap);

/**
 * Creates a closure that can check if a given value belongs to a given array
 * Uses a Set for faster lookup
 */
function makeInclusionChecker<T>(array: T[] | readonly T[]) {
  const asSet = new Set<T>(array);
  return (value: T) => asSet.has(value);
}

/**
 * A union of string literal types where each string literal represents a valid HTML tag.
 */
export type AllowedTag = (typeof allTags)[number];

/**
 * A closure to check if a string is a void (no children) tag.
 */
const voidTagsIC = makeInclusionChecker<(typeof voidTags)[number]>([
  ...voidTags,
]);

/**
 * A closure to check if a string is a CSS property name.
 */
const cssPropertyNamesIC = makeInclusionChecker(cssPropertyNames);

/**
 * A closure to check if a particular tag is a special case.
 */
const specialCaseIC = makeInclusionChecker(specialCaseList);

function getOriginalFromMangled(name: string): string {
  if (name.startsWith("css")) {
    const withoutCss = name.slice(3);
    if (withoutCss.length === 1) {
      return withoutCss.toLowerCase();
    }
    if (withoutCss.length > 1) {
      return withoutCss.charAt(0).toLowerCase() + withoutCss.slice(1);
    }
    return name;
  }
  return name;
}

/**
 * The props present on a style props component.
 */
export type StylePropsComponentProps<T extends HTMLElement> =
  // Aria and DOM
  HTMLAttributes<T> &
    // Support for React's ref system
    RefAttributes<T> & {
      // May be redundant
      // But we want to make it clear that this component is compatible with ref forwarding
      ref?: ForwardedRef<T>;
      // Optional children of the component
      // This supports the JSX syntax
      // Using ReactNode is preferable (as of 2024) to ReactElement or JSX.element
      // Particularly, around string literal children or falsy children
      children?: ReactNode | ReactNode[];
      // Capture Emotion's css prop when passed to this component.
      // Note: Emotion's css prop accepts many forms (objects, arrays, functions, etc),
      // so prefer Interpolation<Theme> over SerializedStyles.
      css?: Interpolation<Theme>;
    } & {
      // A collection of style props and their values
      [K in keyof CSSPropertyMap]?: CSSPropertyMap[K];
    };

/**
 * The style props component
 *
 * Supports ref forwarding, so each component behaves identical to their plain HTML counterpart
 * with regards to React's ref system.
 *
 * Note: The user of this library should never use this component directly.
 */
export default forwardRef<
  HTMLElement,
  StylePropsComponentProps<HTMLElement> & {
    /**
     * The html tag to use in `createElement`
     */
    tag: AllowedTag;
  }
>(function StylePropsComponent(
  {
    /**
     * Children to be rendered within the component
     */
    children,
    /**
     * The html tag to use in `createElement`
     */
    tag,
    /**
     * Forwarded Emotion css prop from callers, if any
     */
    css: existingCss,
    /**
     * This will contain a combination of regular props and style props
     */
    ...rest
  },
  /**
   * A reference to an enhanced `ref` prop that enables ref forwarding
   */
  ref
) {
  /**
   * The portion of the remaining props that are interpreted as style props
   */
  const restPropsStyleProps = {} as any;

  /**
   * The portion of the remaining props that are interpreted as regular props
   *
   * NOTE:
   * - This will include className if the user passes it.
   * - It will also include data-*, aria-*, onClick, etc.
   */
  const restPropsRegularProps = {} as any;

  // Normal case
  if (!specialCaseIC(tag as (typeof specialCaseList)[number])) {
    // For each prop in `rest`
    for (const [propName, propValue] of Object.entries(rest)) {
      // If the prop is a CSS property then add to style props, otherwise add to regular props
      if (cssPropertyNamesIC(propName)) {
        restPropsStyleProps[propName] = propValue;
      } else {
        restPropsRegularProps[propName] = propValue;
      }
    }
    // Special case
  } else {
    // Identify the list of css attributes that can conflict in the special case
    const specialCaseAttributeList =
      specialCaseMap[tag as keyof typeof specialCaseMap];
    // Enhance performance by creating a Set for faster lookup
    const specialCaseAttributeListIC = makeInclusionChecker(
      specialCaseAttributeList
    );
    // For each prop in `rest`
    for (const [propName, propValue] of Object.entries(rest)) {
      // The css property names also include the special case attributes
      if (cssPropertyNamesIC(propName)) {
        if (
          specialCaseAttributeListIC(
            getOriginalFromMangled(
              propName
            ) as (typeof specialCaseAttributeList)[number]
          )
        ) {
          // If the prop follows the special case naming convention such as "cssWidth" or "cssHeight"
          if (getOriginalFromMangled(propName) !== propName) {
            restPropsStyleProps[getOriginalFromMangled(propName)] = propValue;
          } else {
            // Must be a regular prop
            // In the special cases this means that attributes such as "width" and "height"
            // would be applied preferentially to the regular props
            // and we would need to add the "css" prefix if we explicitly want a style prop
            restPropsRegularProps[propName] = propValue;
          }
        } else {
          // If not a special case attribute we can confidently add it to style props
          restPropsStyleProps[propName] = propValue;
        }
      } else {
        // For sure is regular prop
        restPropsRegularProps[propName] = propValue;
      }
    }
  }

    const {
    className: incomingClassName,
    ...restPropsRegularPropsSansClassName
  } = restPropsRegularProps as { className?: string };

  /**
   * Compile CSS source code compatible with Emotion CSS
   */
  const stylePropsEntries = Object.entries(restPropsStyleProps).filter(
    ([, value]) =>
      value !== undefined &&
      value !== null &&
      value !== false &&
      (typeof value === "string" || typeof value === "number")
  );

  const stylePropsString =
    stylePropsEntries.length === 0
      ? ""
      : `\n\n${stylePropsEntries
          .map(([key, value]) => `${kebabCase(key)}: ${String(value)};`)
          .join("\n")}\n\n`;

  /**
   * Convert generated style-props CSS into an Emotion style block,
   * then compose with any incoming css prop.
   */
  const hasGeneratedCss = stylePropsString.length > 0;
  const hasIncomingCss = existingCss !== undefined;

  const mergedCss: Interpolation<Theme> | Interpolation<Theme>[] | undefined =
    hasGeneratedCss && hasIncomingCss
      ? [emotionCss`${stylePropsString}`, existingCss]
      : hasGeneratedCss
        ? emotionCss`${stylePropsString}`
        : hasIncomingCss
          ? existingCss
          : undefined;

  return (
    tag == 'a' ? <a ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</a> :
    tag == 'abbr' ? <abbr ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</abbr> :
    tag == 'address' ? <address ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</address> :
    tag == 'area' ? <area ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}/> :
    tag == 'article' ? <article ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</article> :
    tag == 'aside' ? <aside ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</aside> :
    tag == 'audio' ? <audio ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</audio> :
    tag == 'b' ? <b ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</b> :
    tag == 'base' ? <base ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}/> :
    tag == 'bdi' ? <bdi ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</bdi> :
    tag == 'bdo' ? <bdo ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</bdo> :
    tag == 'blockquote' ? <blockquote ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</blockquote> :
    tag == 'body' ? <body ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</body> :
    tag == 'br' ? <br ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}/> :
    tag == 'button' ? <button ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</button> :
    tag == 'canvas' ? <canvas ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</canvas> :
    tag == 'caption' ? <caption ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</caption> :
    tag == 'cite' ? <cite ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</cite> :
    tag == 'code' ? <code ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</code> :
    tag == 'col' ? <col ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}/> :
    tag == 'colgroup' ? <colgroup ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</colgroup> :
    tag == 'data' ? <data ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</data> :
    tag == 'datalist' ? <datalist ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</datalist> :
    tag == 'dd' ? <dd ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</dd> :
    tag == 'del' ? <del ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</del> :
    tag == 'details' ? <details ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</details> :
    tag == 'dfn' ? <dfn ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</dfn> :
    tag == 'dialog' ? <dialog ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</dialog> :
    tag == 'div' ? <div ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</div> :
    tag == 'dl' ? <dl ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</dl> :
    tag == 'dt' ? <dt ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</dt> :
    tag == 'em' ? <em ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</em> :
    tag == 'embed' ? <embed ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}/> :
    tag == 'fieldset' ? <fieldset ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</fieldset> :
    tag == 'figcaption' ? <figcaption ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</figcaption> :
    tag == 'figure' ? <figure ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</figure> :
    tag == 'footer' ? <footer ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</footer> :
    tag == 'form' ? <form ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</form> :
    tag == 'h1' ? <h1 ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</h1> :
    tag == 'h2' ? <h2 ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</h2> :
    tag == 'h3' ? <h3 ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</h3> :
    tag == 'h4' ? <h4 ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</h4> :
    tag == 'h5' ? <h5 ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</h5> :
    tag == 'h6' ? <h6 ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</h6> :
    tag == 'head' ? <head ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</head> :
    tag == 'header' ? <header ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</header> :
    tag == 'hr' ? <hr ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}/> :
    tag == 'html' ? <html ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</html> :
    tag == 'i' ? <i ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</i> :
    tag == 'iframe' ? <iframe ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</iframe> :
    tag == 'img' ? <img ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}/> :
    tag == 'input' ? <input ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}/> :
    tag == 'ins' ? <ins ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</ins> :
    tag == 'kbd' ? <kbd ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</kbd> :
    tag == 'label' ? <label ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</label> :
    tag == 'legend' ? <legend ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</legend> :
    tag == 'li' ? <li ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</li> :
    tag == 'link' ? <link ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}/> :
    tag == 'main' ? <main ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</main> :
    tag == 'map' ? <map ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</map> :
    tag == 'mark' ? <mark ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</mark> :
    tag == 'menu' ? <menu ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</menu> :
    tag == 'meta' ? <meta ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}/> :
    tag == 'meter' ? <meter ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</meter> :
    tag == 'nav' ? <nav ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</nav> :
    tag == 'noscript' ? <noscript ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</noscript> :
    tag == 'object' ? <object ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</object> :
    tag == 'ol' ? <ol ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</ol> :
    tag == 'optgroup' ? <optgroup ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</optgroup> :
    tag == 'option' ? <option ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</option> :
    tag == 'output' ? <output ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</output> :
    tag == 'p' ? <p ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</p> :
    tag == 'param' ? <param ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}/> :
    tag == 'picture' ? <picture ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</picture> :
    tag == 'pre' ? <pre ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</pre> :
    tag == 'progress' ? <progress ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</progress> :
    tag == 'q' ? <q ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</q> :
    tag == 'rp' ? <rp ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</rp> :
    tag == 'rt' ? <rt ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</rt> :
    tag == 'ruby' ? <ruby ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</ruby> :
    tag == 's' ? <s ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</s> :
    tag == 'samp' ? <samp ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</samp> :
    tag == 'script' ? <script ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</script> :
    tag == 'section' ? <section ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</section> :
    tag == 'select' ? <select ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</select> :
    tag == 'slot' ? <slot ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</slot> :
    tag == 'small' ? <small ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</small> :
    tag == 'source' ? <source ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}/> :
    tag == 'span' ? <span ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</span> :
    tag == 'strong' ? <strong ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</strong> :
    tag == 'style' ? <style ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</style> :
    tag == 'sub' ? <sub ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</sub> :
    tag == 'summary' ? <summary ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</summary> :
    tag == 'sup' ? <sup ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</sup> :
    tag == 'table' ? <table ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</table> :
    tag == 'tbody' ? <tbody ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</tbody> :
    tag == 'td' ? <td ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</td> :
    tag == 'template' ? <template ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</template> :
    tag == 'textarea' ? <textarea ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</textarea> :
    tag == 'tfoot' ? <tfoot ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</tfoot> :
    tag == 'th' ? <th ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</th> :
    tag == 'thead' ? <thead ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</thead> :
    tag == 'time' ? <time ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</time> :
    tag == 'title' ? <title ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</title> :
    tag == 'tr' ? <tr ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</tr> :
    tag == 'track' ? <track ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}/> :
    tag == 'u' ? <u ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</u> :
    tag == 'ul' ? <ul ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</ul> :
    tag == 'var' ? <var ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</var> :
    tag == 'video' ? <video ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}>{children}</video> :
    tag == 'wbr' ? <wbr ref={ref as RefObject<any>} className={incomingClassName} css={mergedCss} {...restPropsRegularPropsSansClassName}/> :
          <></>
  );
});
