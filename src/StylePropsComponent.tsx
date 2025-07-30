import {
  forwardRef,
  createElement,
  ReactNode,
  RefAttributes,
  HTMLAttributes,
  ForwardedRef,
} from "react";
import { kebabCase } from "lodash";
import { css as emotionCss, SerializedStyles} from "@emotion/react";

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
      // Will contain any user specified classnames in the JSX, and may also contain the classname
      // For the class created from the `css` prop if the user's project uses Emotion CSS
      className?: string;
      // I'm not 100% sure how emotionCss is passed down, so just in case, let's capture "css" prop
      // (if it is passed at this stage)
      css?: SerializedStyles;
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
     * EmotionCSS engine does NOT pass down css prop
     * The propagated emotion css data is actually captured in the `className` prop
     */
    className,
    /**
    * In case I was wrong with the previous statement...
    */
    css:existingCss,
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
          // If the prop foll`ows the special case naming convention such as "cssWidth" or "cssHeight"
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

  return (
    tag == 'a' ? <a className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</a> :
    tag == 'abbr' ? <abbr className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</abbr> :
    tag == 'address' ? <address className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</address> :
    tag == 'area' ? <area className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}/> :
    tag == 'article' ? <article className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</article> :
    tag == 'aside' ? <aside className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</aside> :
    tag == 'audio' ? <audio className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</audio> :
    tag == 'b' ? <b className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</b> :
    tag == 'base' ? <base className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}/> :
    tag == 'bdi' ? <bdi className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</bdi> :
    tag == 'bdo' ? <bdo className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</bdo> :
    tag == 'blockquote' ? <blockquote className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</blockquote> :
    tag == 'body' ? <body className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</body> :
    tag == 'br' ? <br className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}/> :
    tag == 'button' ? <button className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</button> :
    tag == 'canvas' ? <canvas className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</canvas> :
    tag == 'caption' ? <caption className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</caption> :
    tag == 'cite' ? <cite className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</cite> :
    tag == 'code' ? <code className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</code> :
    tag == 'col' ? <col className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}/> :
    tag == 'colgroup' ? <colgroup className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</colgroup> :
    tag == 'data' ? <data className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</data> :
    tag == 'datalist' ? <datalist className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</datalist> :
    tag == 'dd' ? <dd className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</dd> :
    tag == 'del' ? <del className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</del> :
    tag == 'details' ? <details className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</details> :
    tag == 'dfn' ? <dfn className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</dfn> :
    tag == 'dialog' ? <dialog className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</dialog> :
    tag == 'div' ? <div className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</div> :
    tag == 'dl' ? <dl className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</dl> :
    tag == 'dt' ? <dt className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</dt> :
    tag == 'em' ? <em className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</em> :
    tag == 'embed' ? <embed className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}/> :
    tag == 'fieldset' ? <fieldset className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</fieldset> :
    tag == 'figcaption' ? <figcaption className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</figcaption> :
    tag == 'figure' ? <figure className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</figure> :
    tag == 'footer' ? <footer className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</footer> :
    tag == 'form' ? <form className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</form> :
    tag == 'h1' ? <h1 className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</h1> :
    tag == 'h2' ? <h2 className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</h2> :
    tag == 'h3' ? <h3 className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</h3> :
    tag == 'h4' ? <h4 className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</h4> :
    tag == 'h5' ? <h5 className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</h5> :
    tag == 'h6' ? <h6 className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</h6> :
    tag == 'head' ? <head className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</head> :
    tag == 'header' ? <header className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</header> :
    tag == 'hr' ? <hr className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}/> :
    tag == 'html' ? <html className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</html> :
    tag == 'i' ? <i className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</i> :
    tag == 'iframe' ? <iframe className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</iframe> :
    tag == 'img' ? <img className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}/> :
    tag == 'input' ? <input className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}/> :
    tag == 'ins' ? <ins className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</ins> :
    tag == 'kbd' ? <kbd className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</kbd> :
    tag == 'label' ? <label className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</label> :
    tag == 'legend' ? <legend className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</legend> :
    tag == 'li' ? <li className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</li> :
    tag == 'link' ? <link className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}/> :
    tag == 'main' ? <main className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</main> :
    tag == 'map' ? <map className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</map> :
    tag == 'mark' ? <mark className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</mark> :
    tag == 'menu' ? <menu className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</menu> :
    tag == 'meta' ? <meta className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}/> :
    tag == 'meter' ? <meter className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</meter> :
    tag == 'nav' ? <nav className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</nav> :
    tag == 'noscript' ? <noscript className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</noscript> :
    tag == 'object' ? <object className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</object> :
    tag == 'ol' ? <ol className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</ol> :
    tag == 'optgroup' ? <optgroup className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</optgroup> :
    tag == 'option' ? <option className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</option> :
    tag == 'output' ? <output className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</output> :
    tag == 'p' ? <p className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</p> :
    tag == 'param' ? <param className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}/> :
    tag == 'picture' ? <picture className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</picture> :
    tag == 'pre' ? <pre className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</pre> :
    tag == 'progress' ? <progress className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</progress> :
    tag == 'q' ? <q className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</q> :
    tag == 'rp' ? <rp className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</rp> :
    tag == 'rt' ? <rt className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</rt> :
    tag == 'ruby' ? <ruby className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</ruby> :
    tag == 's' ? <s className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</s> :
    tag == 'samp' ? <samp className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</samp> :
    tag == 'script' ? <script className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</script> :
    tag == 'section' ? <section className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</section> :
    tag == 'select' ? <select className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</select> :
    tag == 'slot' ? <slot className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</slot> :
    tag == 'small' ? <small className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</small> :
    tag == 'source' ? <source className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}/> :
    tag == 'span' ? <span className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</span> :
    tag == 'strong' ? <strong className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</strong> :
    tag == 'style' ? <style className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</style> :
    tag == 'sub' ? <sub className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</sub> :
    tag == 'summary' ? <summary className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</summary> :
    tag == 'sup' ? <sup className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</sup> :
    tag == 'table' ? <table className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</table> :
    tag == 'tbody' ? <tbody className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</tbody> :
    tag == 'td' ? <td className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</td> :
    tag == 'template' ? <template className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</template> :
    tag == 'textarea' ? <textarea className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</textarea> :
    tag == 'tfoot' ? <tfoot className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</tfoot> :
    tag == 'th' ? <th className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</th> :
    tag == 'thead' ? <thead className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</thead> :
    tag == 'time' ? <time className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</time> :
    tag == 'title' ? <title className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</title> :
    tag == 'tr' ? <tr className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</tr> :
    tag == 'track' ? <track className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}/> :
    tag == 'u' ? <u className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</u> :
    tag == 'ul' ? <ul className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</ul> :
    tag == 'var' ? <var className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</var> :
    tag == 'video' ? <video className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}>{children}</video> :
    tag == 'wbr' ? <wbr className={className} ref={ref} css={emotionCss`${className};${existingCss};${stylePropsString}`} {...restPropsRegularProps}/> :
    <></>
  );
});
