"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const lodash_1 = require("lodash");
const css_1 = require("@emotion/css");
const cssPropertyMap_1 = require("./cssPropertyMap");
const htmlTagData_1 = require("./htmlTagData");
const special_cases_1 = require("./special-cases");
/**
 * List of valid CSS property names
 */
const cssPropertyNames = Object.keys(cssPropertyMap_1.default);
/**
 * Creates a closure that can check if a given value belongs to a given array
 * Uses a Set for faster lookup
 */
function makeInclusionChecker(array) {
    const asSet = new Set(array);
    return (value) => asSet.has(value);
}
/**
 * A closure to check if a string is a valid HTML tag.
 */
const allTagsIC = makeInclusionChecker([...htmlTagData_1.allTags]);
/**
 * A closure to check if a string is a void (no children) tag.
 */
const voidTagsIC = makeInclusionChecker([
    ...htmlTagData_1.voidTags,
]);
/**
 * A closure to check if a string is a CSS property name.
 */
const cssPropertyNamesIC = makeInclusionChecker(cssPropertyNames);
/**
 * A closure to check if a particular tag is a special case.
 */
const specialCaseIC = makeInclusionChecker(special_cases_1.specialCaseList);
/**
 * The style props component
 *
 * Supports ref forwarding, so each component behaves identical to their plain HTML counterpart
 * with regards to React's ref system.
 *
 * Note: The user of this library should never use this component directly.
 */
exports.default = (0, react_1.forwardRef)(function StylePropsComponent(_a, 
/**
 * A reference to an enhanced `ref` prop that enables ref forwarding
 */
ref) {
    var { 
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
    className } = _a, 
    /**
     * This will contain a combination of regular props and style props
     */
    rest = __rest(_a, ["children", "tag", "className"]);
    /**
     * The portion of the remaining props that are interpreted as style props
     */
    const restPropsStyleProps = {};
    /**
     * The portion of the remaining props that are interpreted as regular props
     */
    const restPropsRegularProps = {};
    // Normal case
    if (!specialCaseIC(tag)) {
        // For each prop in `rest`
        for (const [propName, propValue] of Object.entries(rest)) {
            // If the prop is a CSS property then add to style props, otherwise add to regular props
            if (cssPropertyNamesIC(propName)) {
                restPropsStyleProps[propName] = propValue;
            }
            else {
                restPropsRegularProps[propName] = propValue;
            }
        }
        // Special case
    }
    else {
        // Identify the list of css attributes that can conflict in the special case
        const specialCaseAttributeList = special_cases_1.specialCaseMap[tag];
        // Enhance performance by creating a Set for faster lookup
        const specialCaseAttributeListIC = makeInclusionChecker(specialCaseAttributeList);
        // For each prop in `rest`
        for (const [propName, propValue] of Object.entries(rest)) {
            // The css property names also include the special case attributes
            if (cssPropertyNamesIC(propName)) {
                if (specialCaseAttributeListIC(propName)) {
                    // If the prop follows the special case naming convention such as "cssWidth" or "cssHeight"
                    if (propName.length > 3 && propName.startsWith("css")) {
                        const withoutCss = propName.slice(3);
                        const unmangled = withoutCss.charAt(0).toUpperCase() + withoutCss.slice(1);
                        restPropsStyleProps[unmangled] = propValue;
                    }
                    else {
                        // Must be a regular prop
                        // In the special cases this means that attributes such as "width" and "height"
                        // would be applied preferentially to the regular props
                        // and we would need to add the "css" prefix if we explicitly want a style prop
                        restPropsRegularProps[propName] = propValue;
                    }
                }
                else {
                    // If not a special case attribute we can confidently add it to style props
                    restPropsStyleProps[propName] = propValue;
                }
            }
            else {
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
        return `${(0, lodash_1.kebabCase)(key)}: ${value};`;
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
        (0, css_1.css) `${stylePropsString}`,
    ];
    // The following differentiation may be unnecessary based on how javascript
    // handles variadic functions, but...
    // If the element is a void tag, we don't specify children at all, even as "undefined"
    if (voidTagsIC(tag)) {
        return (0, react_1.createElement)(tag, Object.assign(Object.assign({}, restPropsRegularProps), { ref, className: combinedClassNames.join(" ") }));
    }
    else {
        // If the element is a void tag we specify children
        // Some elements may have falsy children such as null or undefined
        // But React's engine handles it gracefully
        return (0, react_1.createElement)(tag, Object.assign(Object.assign({}, restPropsRegularProps), { ref, className: combinedClassNames.join(" ") }), children);
    }
});
//# sourceMappingURL=StylePropsComponent.js.map