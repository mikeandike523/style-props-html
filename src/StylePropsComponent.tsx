import {
  forwardRef,
  ReactNode,
  RefAttributes,
  HTMLAttributes,
  ForwardedRef,
} from "react";
import { kebabCase } from "lodash";
import { css as emotionCss, type Interpolation, type Theme } from "@emotion/react";

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

  /**
   * Compile CSS source code compatible with Emotion CSS
   */
  const stylePropsString = `\n\n${Object.entries(restPropsStyleProps)
    .map(([key, value]) => {
      return `${kebabCase(key)}: ${value};`;
    })
    .join("\n")}\n\n`;

  /**
   * Convert generated style-props CSS into an Emotion style block,
   * then compose with any incoming css prop.
   */
  const generatedCss = emotionCss`${stylePropsString}`;
  const mergedCss = [generatedCss, existingCss];

  return (
    tag == 'a' ? <a ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</a> :
    tag == 'abbr' ? <abbr ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</abbr> :
    tag == 'address' ? <address ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</address> :
    tag == 'area' ? <area ref={ref} css={mergedCss} {...restPropsRegularProps}/> :
    tag == 'article' ? <article ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</article> :
    tag == 'aside' ? <aside ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</aside> :
    tag == 'audio' ? <audio ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</audio> :
    tag == 'b' ? <b ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</b> :
    tag == 'base' ? <base ref={ref} css={mergedCss} {...restPropsRegularProps}/> :
    tag == 'bdi' ? <bdi ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</bdi> :
    tag == 'bdo' ? <bdo ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</bdo> :
    tag == 'blockquote' ? <blockquote ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</blockquote> :
    tag == 'body' ? <body ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</body> :
    tag == 'br' ? <br ref={ref} css={mergedCss} {...restPropsRegularProps}/> :
    tag == 'button' ? <button ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</button> :
    tag == 'canvas' ? <canvas ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</canvas> :
    tag == 'caption' ? <caption ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</caption> :
    tag == 'cite' ? <cite ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</cite> :
    tag == 'code' ? <code ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</code> :
    tag == 'col' ? <col ref={ref} css={mergedCss} {...restPropsRegularProps}/> :
    tag == 'colgroup' ? <colgroup ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</colgroup> :
    tag == 'data' ? <data ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</data> :
    tag == 'datalist' ? <datalist ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</datalist> :
    tag == 'dd' ? <dd ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</dd> :
    tag == 'del' ? <del ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</del> :
    tag == 'details' ? <details ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</details> :
    tag == 'dfn' ? <dfn ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</dfn> :
    tag == 'dialog' ? <dialog ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</dialog> :
    tag == 'div' ? <div ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</div> :
    tag == 'dl' ? <dl ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</dl> :
    tag == 'dt' ? <dt ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</dt> :
    tag == 'em' ? <em ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</em> :
    tag == 'embed' ? <embed ref={ref} css={mergedCss} {...restPropsRegularProps}/> :
    tag == 'fieldset' ? <fieldset ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</fieldset> :
    tag == 'figcaption' ? <figcaption ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</figcaption> :
    tag == 'figure' ? <figure ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</figure> :
    tag == 'footer' ? <footer ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</footer> :
    tag == 'form' ? <form ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</form> :
    tag == 'h1' ? <h1 ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</h1> :
    tag == 'h2' ? <h2 ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</h2> :
    tag == 'h3' ? <h3 ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</h3> :
    tag == 'h4' ? <h4 ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</h4> :
    tag == 'h5' ? <h5 ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</h5> :
    tag == 'h6' ? <h6 ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</h6> :
    tag == 'head' ? <head ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</head> :
    tag == 'header' ? <header ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</header> :
    tag == 'hr' ? <hr ref={ref} css={mergedCss} {...restPropsRegularProps}/> :
    tag == 'html' ? <html ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</html> :
    tag == 'i' ? <i ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</i> :
    tag == 'iframe' ? <iframe ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</iframe> :
    tag == 'img' ? <img ref={ref} css={mergedCss} {...restPropsRegularProps}/> :
    tag == 'input' ? <input ref={ref} css={mergedCss} {...restPropsRegularProps}/> :
    tag == 'ins' ? <ins ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</ins> :
    tag == 'kbd' ? <kbd ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</kbd> :
    tag == 'label' ? <label ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</label> :
    tag == 'legend' ? <legend ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</legend> :
    tag == 'li' ? <li ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</li> :
    tag == 'link' ? <link ref={ref} css={mergedCss} {...restPropsRegularProps}/> :
    tag == 'main' ? <main ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</main> :
    tag == 'map' ? <map ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</map> :
    tag == 'mark' ? <mark ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</mark> :
    tag == 'menu' ? <menu ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</menu> :
    tag == 'meta' ? <meta ref={ref} css={mergedCss} {...restPropsRegularProps}/> :
    tag == 'meter' ? <meter ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</meter> :
    tag == 'nav' ? <nav ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</nav> :
    tag == 'noscript' ? <noscript ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</noscript> :
    tag == 'object' ? <object ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</object> :
    tag == 'ol' ? <ol ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</ol> :
    tag == 'optgroup' ? <optgroup ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</optgroup> :
    tag == 'option' ? <option ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</option> :
    tag == 'output' ? <output ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</output> :
    tag == 'p' ? <p ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</p> :
    tag == 'param' ? <param ref={ref} css={mergedCss} {...restPropsRegularProps}/> :
    tag == 'picture' ? <picture ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</picture> :
    tag == 'pre' ? <pre ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</pre> :
    tag == 'progress' ? <progress ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</progress> :
    tag == 'q' ? <q ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</q> :
    tag == 'rp' ? <rp ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</rp> :
    tag == 'rt' ? <rt ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</rt> :
    tag == 'ruby' ? <ruby ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</ruby> :
    tag == 's' ? <s ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</s> :
    tag == 'samp' ? <samp ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</samp> :
    tag == 'script' ? <script ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</script> :
    tag == 'section' ? <section ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</section> :
    tag == 'select' ? <select ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</select> :
    tag == 'slot' ? <slot ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</slot> :
    tag == 'small' ? <small ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</small> :
    tag == 'source' ? <source ref={ref} css={mergedCss} {...restPropsRegularProps}/> :
    tag == 'span' ? <span ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</span> :
    tag == 'strong' ? <strong ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</strong> :
    tag == 'style' ? <style ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</style> :
    tag == 'sub' ? <sub ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</sub> :
    tag == 'summary' ? <summary ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</summary> :
    tag == 'sup' ? <sup ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</sup> :
    tag == 'table' ? <table ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</table> :
    tag == 'tbody' ? <tbody ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</tbody> :
    tag == 'td' ? <td ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</td> :
    tag == 'template' ? <template ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</template> :
    tag == 'textarea' ? <textarea ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</textarea> :
    tag == 'tfoot' ? <tfoot ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</tfoot> :
    tag == 'th' ? <th ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</th> :
    tag == 'thead' ? <thead ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</thead> :
    tag == 'time' ? <time ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</time> :
    tag == 'title' ? <title ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</title> :
    tag == 'tr' ? <tr ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</tr> :
    tag == 'track' ? <track ref={ref} css={mergedCss} {...restPropsRegularProps}/> :
    tag == 'u' ? <u ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</u> :
    tag == 'ul' ? <ul ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</ul> :
    tag == 'var' ? <var ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</var> :
    tag == 'video' ? <video ref={ref} css={mergedCss} {...restPropsRegularProps}>{children}</video> :
    tag == 'wbr' ? <wbr ref={ref} css={mergedCss} {...restPropsRegularProps}/> :
    <></>
  );
});
