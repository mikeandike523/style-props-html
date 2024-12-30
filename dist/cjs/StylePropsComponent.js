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
 * Cached list of valid CSS property names
 */
const cssPropertyNames = Object.keys(cssPropertyMap_1.default);
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
 * A closure to check if a string is an allowed tag
 */
const allTagsIC = makeInclusionChecker([...htmlTagData_1.allTags]);
/**
 * A closure to check if a string is a no-children tag
 */
const voidTagsIC = makeInclusionChecker([
    ...htmlTagData_1.voidTags,
]);
/**
 * A closure to check if a string is a CSS property name
 */
const cssPropertyNamesIC = makeInclusionChecker(cssPropertyNames);
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
    className } = _a, rest = __rest(_a, ["children", "tag", "className"]);
    if (!allTagsIC(tag)) {
        throw new Error(`Invalid tag. Only \`${htmlTagData_1.allTags.join(", ")}\` are allowed.`);
    }
    const restPropsStyleProps = {};
    const restPropsRegularProps = {};
    if (!special_cases_1.specialCaseList.includes(tag)) {
        for (const [propName, propValue] of Object.entries(rest)) {
            if (cssPropertyNamesIC(propName)) {
                restPropsStyleProps[propName] = propValue;
            }
            else {
                restPropsRegularProps[propName] = propValue;
            }
        }
    }
    else {
        const specialCaseAttributeList = special_cases_1.specialCaseMap[tag];
        for (const [propName, propValue] of Object.entries(rest)) {
            if (cssPropertyNamesIC(propName)) {
                if (specialCaseAttributeList.includes(propName)) {
                    restPropsRegularProps[propName] = propValue;
                }
                else {
                    restPropsStyleProps[propName] = propValue;
                }
            }
            else {
                if (propName.startsWith("css") && propName !== "css") {
                    const withoutCssPrefix = propName.replace(/^css/, "");
                    const uncapitalized = withoutCssPrefix.charAt(0).toLowerCase() +
                        withoutCssPrefix.slice(1);
                    restPropsStyleProps[uncapitalized] = propValue;
                }
                else {
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
        return `${(0, lodash_1.kebabCase)(key)}: ${value};`;
    })
        .join("\n")}\n\n`;
    const existingClassNameList = (className || "")
        .replace(/\s+/g, " ")
        .trim()
        .split(" ");
    const combinedClassNames = [
        (0, css_1.css) `${stylePropsString}`,
        ...existingClassNameList,
    ];
    if (voidTagsIC(tag)) {
        return (0, react_1.createElement)(tag, Object.assign(Object.assign({}, restPropsRegularProps), { ref, className: combinedClassNames.join(" ") }));
    }
    else {
        return (0, react_1.createElement)(tag, Object.assign(Object.assign({}, restPropsRegularProps), { ref, className: combinedClassNames.join(" ") }), children);
    }
});
//# sourceMappingURL=StylePropsComponent.js.map