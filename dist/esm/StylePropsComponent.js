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
import { jsx as _jsx, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { forwardRef, } from "react";
import { kebabCase } from "lodash";
import { css as emotionCss } from "@emotion/react";
import cssPropertyMap from "./cssPropertyMap";
import { voidTags } from "./htmlTagData";
import { specialCaseList, specialCaseMap } from "./special-cases";
/**
 * List of valid CSS property names
 */
const cssPropertyNames = Object.keys(cssPropertyMap);
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
export default forwardRef(function StylePropsComponent(_a, 
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
    className, 
    /**
    * In case I was wrong with the previous statement...
    */
    css: existingCss } = _a, 
    /**
     * This will contain a combination of regular props and style props
     */
    rest = __rest(_a, ["children", "tag", "className", "css"]);
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
        const specialCaseAttributeList = specialCaseMap[tag];
        // Enhance performance by creating a Set for faster lookup
        const specialCaseAttributeListIC = makeInclusionChecker(specialCaseAttributeList);
        // For each prop in `rest`
        for (const [propName, propValue] of Object.entries(rest)) {
            // The css property names also include the special case attributes
            if (cssPropertyNamesIC(propName)) {
                if (specialCaseAttributeListIC(getOriginalFromMangled(propName))) {
                    // If the prop foll`ows the special case naming convention such as "cssWidth" or "cssHeight"
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
    /**
     * Compile CSS source code compatible with Emotion CSS
     */
    const stylePropsString = `\n\n${Object.entries(restPropsStyleProps)
        .map(([key, value]) => {
        return `${kebabCase(key)}: ${value};`;
    })
        .join("\n")}\n\n`;
    return (tag == 'a' ? _jsx("a", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
        tag == 'abbr' ? _jsx("abbr", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
            tag == 'address' ? _jsx("address", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                tag == 'area' ? _jsx("area", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps)) :
                    tag == 'article' ? _jsx("article", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                        tag == 'aside' ? _jsx("aside", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                            tag == 'audio' ? _jsx("audio", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                tag == 'b' ? _jsx("b", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                    tag == 'base' ? _jsx("base", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps)) :
                                        tag == 'bdi' ? _jsx("bdi", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                            tag == 'bdo' ? _jsx("bdo", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                tag == 'blockquote' ? _jsx("blockquote", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                    tag == 'body' ? _jsx("body", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                        tag == 'br' ? _jsx("br", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps)) :
                                                            tag == 'button' ? _jsx("button", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                tag == 'canvas' ? _jsx("canvas", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                    tag == 'caption' ? _jsx("caption", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                        tag == 'cite' ? _jsx("cite", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                            tag == 'code' ? _jsx("code", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                tag == 'col' ? _jsx("col", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps)) :
                                                                                    tag == 'colgroup' ? _jsx("colgroup", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                        tag == 'data' ? _jsx("data", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                            tag == 'datalist' ? _jsx("datalist", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                tag == 'dd' ? _jsx("dd", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                    tag == 'del' ? _jsx("del", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                        tag == 'details' ? _jsx("details", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                            tag == 'dfn' ? _jsx("dfn", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                tag == 'dialog' ? _jsx("dialog", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                    tag == 'div' ? _jsx("div", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                        tag == 'dl' ? _jsx("dl", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                            tag == 'dt' ? _jsx("dt", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                tag == 'em' ? _jsx("em", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                    tag == 'embed' ? _jsx("embed", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps)) :
                                                                                                                                        tag == 'fieldset' ? _jsx("fieldset", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                            tag == 'figcaption' ? _jsx("figcaption", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                tag == 'figure' ? _jsx("figure", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                    tag == 'footer' ? _jsx("footer", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                        tag == 'form' ? _jsx("form", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                            tag == 'h1' ? _jsx("h1", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                tag == 'h2' ? _jsx("h2", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                    tag == 'h3' ? _jsx("h3", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                        tag == 'h4' ? _jsx("h4", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                            tag == 'h5' ? _jsx("h5", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                tag == 'h6' ? _jsx("h6", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                    tag == 'head' ? _jsx("head", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                        tag == 'header' ? _jsx("header", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                            tag == 'hr' ? _jsx("hr", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps)) :
                                                                                                                                                                                                tag == 'html' ? _jsx("html", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                    tag == 'i' ? _jsx("i", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                        tag == 'iframe' ? _jsx("iframe", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                            tag == 'img' ? _jsx("img", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps)) :
                                                                                                                                                                                                                tag == 'input' ? _jsx("input", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps)) :
                                                                                                                                                                                                                    tag == 'ins' ? _jsx("ins", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                        tag == 'kbd' ? _jsx("kbd", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                            tag == 'label' ? _jsx("label", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                tag == 'legend' ? _jsx("legend", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                    tag == 'li' ? _jsx("li", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                        tag == 'link' ? _jsx("link", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps)) :
                                                                                                                                                                                                                                            tag == 'main' ? _jsx("main", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                tag == 'map' ? _jsx("map", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                    tag == 'mark' ? _jsx("mark", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                        tag == 'menu' ? _jsx("menu", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                            tag == 'meta' ? _jsx("meta", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps)) :
                                                                                                                                                                                                                                                                tag == 'meter' ? _jsx("meter", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                    tag == 'nav' ? _jsx("nav", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                        tag == 'noscript' ? _jsx("noscript", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                            tag == 'object' ? _jsx("object", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                tag == 'ol' ? _jsx("ol", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                    tag == 'optgroup' ? _jsx("optgroup", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                        tag == 'option' ? _jsx("option", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                            tag == 'output' ? _jsx("output", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                tag == 'p' ? _jsx("p", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                    tag == 'param' ? _jsx("param", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps)) :
                                                                                                                                                                                                                                                                                                        tag == 'picture' ? _jsx("picture", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                            tag == 'pre' ? _jsx("pre", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                tag == 'progress' ? _jsx("progress", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                    tag == 'q' ? _jsx("q", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                        tag == 'rp' ? _jsx("rp", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                            tag == 'rt' ? _jsx("rt", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                tag == 'ruby' ? _jsx("ruby", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                    tag == 's' ? _jsx("s", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                        tag == 'samp' ? _jsx("samp", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                            tag == 'script' ? _jsx("script", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                tag == 'section' ? _jsx("section", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                    tag == 'select' ? _jsx("select", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                        tag == 'slot' ? _jsx("slot", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                            tag == 'small' ? _jsx("small", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                tag == 'source' ? _jsx("source", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps)) :
                                                                                                                                                                                                                                                                                                                                                                    tag == 'span' ? _jsx("span", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                        tag == 'strong' ? _jsx("strong", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                            tag == 'style' ? _jsx("style", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                tag == 'sub' ? _jsx("sub", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                    tag == 'summary' ? _jsx("summary", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                        tag == 'sup' ? _jsx("sup", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                            tag == 'table' ? _jsx("table", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                tag == 'tbody' ? _jsx("tbody", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                    tag == 'td' ? _jsx("td", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                        tag == 'template' ? _jsx("template", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                            tag == 'textarea' ? _jsx("textarea", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                tag == 'tfoot' ? _jsx("tfoot", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                    tag == 'th' ? _jsx("th", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                        tag == 'thead' ? _jsx("thead", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                            tag == 'time' ? _jsx("time", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                                tag == 'title' ? _jsx("title", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                                    tag == 'tr' ? _jsx("tr", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                                        tag == 'track' ? _jsx("track", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps)) :
                                                                                                                                                                                                                                                                                                                                                                                                                                            tag == 'u' ? _jsx("u", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                                                tag == 'ul' ? _jsx("ul", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                                                    tag == 'var' ? _jsx("var", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                                                        tag == 'video' ? _jsx("video", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps, { children: children })) :
                                                                                                                                                                                                                                                                                                                                                                                                                                                            tag == 'wbr' ? _jsx("wbr", Object.assign({ className: className, ref: ref, css: emotionCss `${className};${existingCss};${stylePropsString}` }, restPropsRegularProps)) :
                                                                                                                                                                                                                                                                                                                                                                                                                                                                _jsx(_Fragment, {}));
});
//# sourceMappingURL=StylePropsComponent.js.map