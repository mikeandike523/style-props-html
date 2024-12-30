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
 * Cached list of valid CSS property names
 */
const cssPropertyNames = Object.keys(cssPropertyMap);

/**
 *
 * Generate a closure that can perform
 * a function similar to `.includes`
 * but faster
 */
function makeInclusionChecker<T>(array: T[]) {
  const asSet = new Set<T>(array);
  return (value: T) => asSet.has(value);
}

export type StylePropsCollection = {
  [P in keyof typeof cssPropertyMap]: (typeof cssPropertyMap)[P];
};

export type AllowedTag = (typeof allTags)[number];

/**
 * A closure to check if a string is an allowed tag
 */
const allTagsIC = makeInclusionChecker<(typeof allTags)[number]>([...allTags]);
/**
 * A closure to check if a string is a no-children tag
 */
const voidTagsIC = makeInclusionChecker<(typeof voidTags)[number]>([
  ...voidTags,
]);
/**
 * A closure to check if a string is a CSS property name
 */
const cssPropertyNamesIC = makeInclusionChecker(cssPropertyNames);

export type StylePropsComponentProps<T extends HTMLElement> =
  HTMLAttributes<T> &
    RefAttributes<T> & {
      ref?: ForwardedRef<T>;
      children?: ReactNode | ReactNode[];
      className?: string;
    } & {
      [K in keyof CSSPropertyMap]?: CSSPropertyMap[K];
    };

export default forwardRef<
  HTMLElement,
  StylePropsComponentProps<HTMLElement> & {
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
    ...rest
  },
  /**
   * A reference to an enhanced `ref` prop that enables ref forwarding
   */
  ref
) {
  if (!allTagsIC(tag as (typeof allTags)[number])) {
    throw new Error(
      `Invalid tag. Only \`${(allTags as Readonly<string[]>).join(
        ", "
      )}\` are allowed.`
    );
  }
  const restPropsStyleProps = {} as any;
  const restPropsRegularProps = {} as any;

  if (!specialCaseList.includes(tag as (typeof specialCaseList)[number])) {
    for (const [propName, propValue] of Object.entries(rest)) {
      if (cssPropertyNamesIC(propName)) {
        restPropsStyleProps[propName] = propValue;
      } else {
        restPropsRegularProps[propName] = propValue;
      }
    }
  } else {
    const specialCaseAttributeList =
      specialCaseMap[tag as keyof typeof specialCaseMap];
    for (const [propName, propValue] of Object.entries(rest)) {
      if (cssPropertyNamesIC(propName)) {
        if (
          specialCaseAttributeList.includes(
            propName as (typeof specialCaseAttributeList)[number]
          )
        ) {
          restPropsRegularProps[propName] = propValue;
        } else {
          restPropsStyleProps[propName] = propValue;
        }
      } else {
        if (propName.startsWith("css") && propName !== "css") {
          const withoutCssPrefix = propName.replace(/^css/, "");
          const uncapitalized =
            withoutCssPrefix.charAt(0).toLowerCase() +
            withoutCssPrefix.slice(1);
          restPropsStyleProps[uncapitalized] = propValue;
        } else {
          restPropsRegularProps[propName] = propValue;
        }
      }
    }
  }

  const stylePropsString = `\n\n${Object.entries(restPropsStyleProps)
    .map(([key, value]) => {
      if (!cssPropertyNamesIC(key)) {
        throw new Error(`Unrecognized CSS attribute name: ${key}.`);
      }

      return `${kebabCase(key)}: ${value};`;
    })
    .join("\n")}\n\n`;

  const existingClassNameList = ((className as string) || "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  const combinedClassNames = [
    emotionCss`${stylePropsString}`,
    ...existingClassNameList,
  ];

  if (voidTagsIC(tag as (typeof voidTags)[number])) {
    return createElement(tag as string, {
      ...restPropsRegularProps,
      ref,
      className: combinedClassNames.join(" "),
    });
  } else {
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
