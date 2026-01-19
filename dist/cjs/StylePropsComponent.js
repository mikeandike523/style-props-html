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
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const react_1 = require("react");
const lodash_1 = require("lodash");
const react_2 = require("@emotion/react");
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
function getOriginalFromMangled(name) {
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
     * Forwarded Emotion css prop from callers, if any
     */
    css: existingCss } = _a, 
    /**
     * This will contain a combination of regular props and style props
     */
    rest = __rest(_a, ["children", "tag", "css"]);
    /**
     * The portion of the remaining props that are interpreted as style props
     */
    const restPropsStyleProps = {};
    /**
     * The portion of the remaining props that are interpreted as regular props
     *
     * NOTE:
     * - This will include className if the user passes it.
     * - It will also include data-*, aria-*, onClick, etc.
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
                if (specialCaseAttributeListIC(getOriginalFromMangled(propName))) {
                    // If the prop follows the special case naming convention such as "cssWidth" or "cssHeight"
                    if (getOriginalFromMangled(propName) !== propName) {
                        restPropsStyleProps[getOriginalFromMangled(propName)] = propValue;
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
    const _b = restPropsRegularProps, { className: incomingClassName } = _b, restPropsRegularPropsSansClassName = __rest(_b, ["className"]);
    /**
     * Compile CSS source code compatible with Emotion CSS
     */
    const stylePropsEntries = Object.entries(restPropsStyleProps).filter(([, value]) => value !== undefined &&
        value !== null &&
        value !== false &&
        (typeof value === "string" || typeof value === "number"));
    const stylePropsString = stylePropsEntries.length === 0
        ? ""
        : `\n\n${stylePropsEntries
            .map(([key, value]) => `${(0, lodash_1.kebabCase)(key)}: ${String(value)};`)
            .join("\n")}\n\n`;
    /**
     * Convert generated style-props CSS into an Emotion style block,
     * then compose with any incoming css prop.
     */
    const hasGeneratedCss = stylePropsString.length > 0;
    const hasIncomingCss = existingCss !== undefined;
    const mergedCss = hasGeneratedCss && hasIncomingCss
        ? [(0, react_2.css) `${stylePropsString}`, existingCss]
        : hasGeneratedCss
            ? (0, react_2.css) `${stylePropsString}`
            : hasIncomingCss
                ? existingCss
                : undefined;
    return (tag == 'a' ? (0, jsx_runtime_1.jsx)("a", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
        tag == 'abbr' ? (0, jsx_runtime_1.jsx)("abbr", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
            tag == 'address' ? (0, jsx_runtime_1.jsx)("address", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                tag == 'area' ? (0, jsx_runtime_1.jsx)("area", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName)) :
                    tag == 'article' ? (0, jsx_runtime_1.jsx)("article", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                        tag == 'aside' ? (0, jsx_runtime_1.jsx)("aside", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                            tag == 'audio' ? (0, jsx_runtime_1.jsx)("audio", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                tag == 'b' ? (0, jsx_runtime_1.jsx)("b", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                    tag == 'base' ? (0, jsx_runtime_1.jsx)("base", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName)) :
                                        tag == 'bdi' ? (0, jsx_runtime_1.jsx)("bdi", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                            tag == 'bdo' ? (0, jsx_runtime_1.jsx)("bdo", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                tag == 'blockquote' ? (0, jsx_runtime_1.jsx)("blockquote", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                    tag == 'body' ? (0, jsx_runtime_1.jsx)("body", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                        tag == 'br' ? (0, jsx_runtime_1.jsx)("br", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName)) :
                                                            tag == 'button' ? (0, jsx_runtime_1.jsx)("button", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                tag == 'canvas' ? (0, jsx_runtime_1.jsx)("canvas", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                    tag == 'caption' ? (0, jsx_runtime_1.jsx)("caption", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                        tag == 'cite' ? (0, jsx_runtime_1.jsx)("cite", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                            tag == 'code' ? (0, jsx_runtime_1.jsx)("code", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                tag == 'col' ? (0, jsx_runtime_1.jsx)("col", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName)) :
                                                                                    tag == 'colgroup' ? (0, jsx_runtime_1.jsx)("colgroup", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                        tag == 'data' ? (0, jsx_runtime_1.jsx)("data", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                            tag == 'datalist' ? (0, jsx_runtime_1.jsx)("datalist", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                tag == 'dd' ? (0, jsx_runtime_1.jsx)("dd", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                    tag == 'del' ? (0, jsx_runtime_1.jsx)("del", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                        tag == 'details' ? (0, jsx_runtime_1.jsx)("details", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                            tag == 'dfn' ? (0, jsx_runtime_1.jsx)("dfn", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                tag == 'dialog' ? (0, jsx_runtime_1.jsx)("dialog", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                    tag == 'div' ? (0, jsx_runtime_1.jsx)("div", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                        tag == 'dl' ? (0, jsx_runtime_1.jsx)("dl", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                            tag == 'dt' ? (0, jsx_runtime_1.jsx)("dt", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                tag == 'em' ? (0, jsx_runtime_1.jsx)("em", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                    tag == 'embed' ? (0, jsx_runtime_1.jsx)("embed", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName)) :
                                                                                                                                        tag == 'fieldset' ? (0, jsx_runtime_1.jsx)("fieldset", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                            tag == 'figcaption' ? (0, jsx_runtime_1.jsx)("figcaption", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                tag == 'figure' ? (0, jsx_runtime_1.jsx)("figure", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                    tag == 'footer' ? (0, jsx_runtime_1.jsx)("footer", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                        tag == 'form' ? (0, jsx_runtime_1.jsx)("form", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                            tag == 'h1' ? (0, jsx_runtime_1.jsx)("h1", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                tag == 'h2' ? (0, jsx_runtime_1.jsx)("h2", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                    tag == 'h3' ? (0, jsx_runtime_1.jsx)("h3", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                        tag == 'h4' ? (0, jsx_runtime_1.jsx)("h4", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                            tag == 'h5' ? (0, jsx_runtime_1.jsx)("h5", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                tag == 'h6' ? (0, jsx_runtime_1.jsx)("h6", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                    tag == 'head' ? (0, jsx_runtime_1.jsx)("head", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                        tag == 'header' ? (0, jsx_runtime_1.jsx)("header", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                            tag == 'hr' ? (0, jsx_runtime_1.jsx)("hr", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName)) :
                                                                                                                                                                                                tag == 'html' ? (0, jsx_runtime_1.jsx)("html", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                    tag == 'i' ? (0, jsx_runtime_1.jsx)("i", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                        tag == 'iframe' ? (0, jsx_runtime_1.jsx)("iframe", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                            tag == 'img' ? (0, jsx_runtime_1.jsx)("img", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName)) :
                                                                                                                                                                                                                tag == 'input' ? (0, jsx_runtime_1.jsx)("input", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName)) :
                                                                                                                                                                                                                    tag == 'ins' ? (0, jsx_runtime_1.jsx)("ins", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                        tag == 'kbd' ? (0, jsx_runtime_1.jsx)("kbd", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                            tag == 'label' ? (0, jsx_runtime_1.jsx)("label", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                tag == 'legend' ? (0, jsx_runtime_1.jsx)("legend", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                    tag == 'li' ? (0, jsx_runtime_1.jsx)("li", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                        tag == 'link' ? (0, jsx_runtime_1.jsx)("link", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName)) :
                                                                                                                                                                                                                                            tag == 'main' ? (0, jsx_runtime_1.jsx)("main", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                tag == 'map' ? (0, jsx_runtime_1.jsx)("map", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                    tag == 'mark' ? (0, jsx_runtime_1.jsx)("mark", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                        tag == 'menu' ? (0, jsx_runtime_1.jsx)("menu", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                            tag == 'meta' ? (0, jsx_runtime_1.jsx)("meta", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName)) :
                                                                                                                                                                                                                                                                tag == 'meter' ? (0, jsx_runtime_1.jsx)("meter", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                    tag == 'nav' ? (0, jsx_runtime_1.jsx)("nav", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                        tag == 'noscript' ? (0, jsx_runtime_1.jsx)("noscript", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                            tag == 'object' ? (0, jsx_runtime_1.jsx)("object", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                tag == 'ol' ? (0, jsx_runtime_1.jsx)("ol", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                    tag == 'optgroup' ? (0, jsx_runtime_1.jsx)("optgroup", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                        tag == 'option' ? (0, jsx_runtime_1.jsx)("option", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                            tag == 'output' ? (0, jsx_runtime_1.jsx)("output", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                tag == 'p' ? (0, jsx_runtime_1.jsx)("p", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                    tag == 'param' ? (0, jsx_runtime_1.jsx)("param", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName)) :
                                                                                                                                                                                                                                                                                                        tag == 'picture' ? (0, jsx_runtime_1.jsx)("picture", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                            tag == 'pre' ? (0, jsx_runtime_1.jsx)("pre", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                tag == 'progress' ? (0, jsx_runtime_1.jsx)("progress", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                    tag == 'q' ? (0, jsx_runtime_1.jsx)("q", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                        tag == 'rp' ? (0, jsx_runtime_1.jsx)("rp", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                            tag == 'rt' ? (0, jsx_runtime_1.jsx)("rt", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                tag == 'ruby' ? (0, jsx_runtime_1.jsx)("ruby", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                    tag == 's' ? (0, jsx_runtime_1.jsx)("s", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                        tag == 'samp' ? (0, jsx_runtime_1.jsx)("samp", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                            tag == 'script' ? (0, jsx_runtime_1.jsx)("script", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                tag == 'section' ? (0, jsx_runtime_1.jsx)("section", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                    tag == 'select' ? (0, jsx_runtime_1.jsx)("select", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                        tag == 'slot' ? (0, jsx_runtime_1.jsx)("slot", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                            tag == 'small' ? (0, jsx_runtime_1.jsx)("small", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                tag == 'source' ? (0, jsx_runtime_1.jsx)("source", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName)) :
                                                                                                                                                                                                                                                                                                                                                                    tag == 'span' ? (0, jsx_runtime_1.jsx)("span", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                        tag == 'strong' ? (0, jsx_runtime_1.jsx)("strong", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                            tag == 'style' ? (0, jsx_runtime_1.jsx)("style", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                tag == 'sub' ? (0, jsx_runtime_1.jsx)("sub", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                    tag == 'summary' ? (0, jsx_runtime_1.jsx)("summary", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                        tag == 'sup' ? (0, jsx_runtime_1.jsx)("sup", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                            tag == 'table' ? (0, jsx_runtime_1.jsx)("table", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                tag == 'tbody' ? (0, jsx_runtime_1.jsx)("tbody", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                    tag == 'td' ? (0, jsx_runtime_1.jsx)("td", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                        tag == 'template' ? (0, jsx_runtime_1.jsx)("template", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                            tag == 'textarea' ? (0, jsx_runtime_1.jsx)("textarea", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                tag == 'tfoot' ? (0, jsx_runtime_1.jsx)("tfoot", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                    tag == 'th' ? (0, jsx_runtime_1.jsx)("th", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                        tag == 'thead' ? (0, jsx_runtime_1.jsx)("thead", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                            tag == 'time' ? (0, jsx_runtime_1.jsx)("time", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                                tag == 'title' ? (0, jsx_runtime_1.jsx)("title", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                                    tag == 'tr' ? (0, jsx_runtime_1.jsx)("tr", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                                        tag == 'track' ? (0, jsx_runtime_1.jsx)("track", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName)) :
                                                                                                                                                                                                                                                                                                                                                                                                                                            tag == 'u' ? (0, jsx_runtime_1.jsx)("u", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                                                tag == 'ul' ? (0, jsx_runtime_1.jsx)("ul", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                                                    tag == 'var' ? (0, jsx_runtime_1.jsx)("var", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                                                        tag == 'video' ? (0, jsx_runtime_1.jsx)("video", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                                                            tag == 'wbr' ? (0, jsx_runtime_1.jsx)("wbr", Object.assign({ ref: ref, className: incomingClassName, css: mergedCss }, restPropsRegularPropsSansClassName)) :
                                                                                                                                                                                                                                                                                                                                                                                                                                                                (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
});
//# sourceMappingURL=StylePropsComponent.js.map