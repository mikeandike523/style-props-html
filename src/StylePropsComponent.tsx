import {
  forwardRef,
  createElement,
  ReactNode,
  RefAttributes,
  HTMLAttributes,
  ForwardedRef,
} from "react";
import { kebabCase } from "lodash";
import { css as emotionCss } from "@emotion/css";

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

  /**
   * Identify if there are any existing classnames.
   * These can occur either due to user custom class names or if the user is using the Emotion CSS library
   * in their own project.
   */
  const existingClassNameList = className
    ? className
        .trim()
        .split(" ")
        .map((x) => x.trim())
    : [];

  /**
   * By placing our style props emotion object second, the assures that the style props
   * are as likely as possible to override other styles
   * (such as if user uses emotion css `css` prop in their own project).
   *
   * @remarks
   * I believe that this is generally the expectation style props syntax,
   * but it may be helpful to look at other libraries such as Chakra UI and see
   * how they handle priority when using both Emotion CSS and style props.
   */
  const combinedClassNames = [
    ...existingClassNameList,
    emotionCss`${stylePropsString}`,
  ];

  // The following differentiation may be unnecessary based on how javascript
  // handles variadic functions, but...

  // If the element is a void tag, we don't specify children at all, even as "undefined"
  if (voidTagsIC(tag as (typeof voidTags)[number])) {
    return createElement(tag as string, {
      ...restPropsRegularProps,
      ref,
      className: combinedClassNames.join(" "),
    });
  } else {
    // If the element is a void tag we specify children
    // Some elements may have falsy children such as null or undefined
    // But React's engine handles it gracefully
    return createElement(
      tag as string,
      {
        ...restPropsRegularProps,
        ref,
        className: combinedClassNames.join(" "),
      },
      children as undefined | ReactNode | ReactNode[]
    );
  }
});
