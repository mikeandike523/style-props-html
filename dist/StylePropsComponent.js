import { forwardRef, createElement, } from "react";
import { kebabCase } from "lodash";
import { css as emotionCss } from "@emotion/css";
import cssPropertyMap from "./cssPropertyMap";
import { allTags, voidTags } from "./htmlTagData";
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
function makeInclusionChecker(array) {
    const asSet = new Set(array);
    return (value) => asSet.has(value);
}
/**
 * Checks if a given set is a valid subset of another set
 */
function isSubset(subset, superset) {
    for (const elem of subset) {
        if (!superset.has(elem)) {
            return false;
        }
    }
    return true;
}
/**
 * A closure to check if a string is an allowed tag
 */
const allTagsIC = makeInclusionChecker([...allTags]);
/**
 * A closure to check if a string is a no-children tag
 */
const voidTagsIC = makeInclusionChecker([
    ...voidTags,
]);
/**
 * A closure to check if a string is a CSS property name
 */
const cssPropertyNamesIC = makeInclusionChecker(cssPropertyNames);
export default forwardRef(function StylePropsComponent({ 
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
className, ...rest }, 
/**
 * A reference to an enhanced `ref` prop that enables ref forwarding
 */
ref) {
    if (!allTagsIC(tag)) {
        throw new Error(`Invalid tag. Only \`${allTags.join(", ")}\` are allowed.`);
    }
    const restPropsStyleProps = {};
    const restPropsRegularProps = {};
    for (const [propName, propValue] of Object.entries(rest)) {
        if (cssPropertyNamesIC(propName)) {
            restPropsStyleProps[propName] = propValue;
        }
        else {
            restPropsRegularProps[propName] = propValue;
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
    const existingClassNameList = (className || "")
        .replace(/\s+/g, " ")
        .trim()
        .split(" ");
    const combinedClassNames = [
        emotionCss `${stylePropsString}`,
        ...existingClassNameList,
    ];
    if (voidTagsIC(tag)) {
        return createElement(tag, {
            ...restPropsRegularProps,
            ref,
            className: combinedClassNames.join(" "),
        });
    }
    else {
        return createElement(tag, {
            ...restPropsRegularProps,
            ref,
            className: combinedClassNames.join(" "),
        }, children);
    }
});
