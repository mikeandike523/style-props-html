import { ReactNode, RefAttributes, HTMLAttributes, ForwardedRef } from "react";
import { CSSPropertyMap } from "./cssPropertyMap";
import { allTags } from "./htmlTagData";
/**
 * A union of string literal types where each string literal represents a valid HTML tag.
 */
export type AllowedTag = (typeof allTags)[number];
/**
 * The props present on a style props component.
 */
export type StylePropsComponentProps<T extends HTMLElement> = HTMLAttributes<T> & RefAttributes<T> & {
    ref?: ForwardedRef<T>;
    children?: ReactNode | ReactNode[];
    className?: string;
} & {
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
declare const _default: import("react").ForwardRefExoticComponent<Omit<HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement> & {
    ref?: ForwardedRef<HTMLElement> | undefined;
    children?: ReactNode | ReactNode[];
    className?: string;
} & {
    readonly objectFit?: "cover" | "contain" | "none" | "inherit" | "initial" | "unset" | "fill" | undefined;
    readonly whiteSpace?: "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line" | undefined;
    readonly color?: string | undefined;
    readonly backgroundColor?: string | undefined;
    readonly background?: string | undefined;
    readonly opacity?: number | "inherit" | "initial" | "unset" | undefined;
    readonly display?: "none" | "inherit" | "initial" | "unset" | "block" | "inline" | "inline-block" | "flex" | "grid" | "inline-flex" | "inline-grid" | "table" | "table-row" | "table-cell" | "list-item" | "run-in" | "contents" | undefined;
    readonly visibility?: "inherit" | "initial" | "unset" | "visible" | "hidden" | "collapse" | undefined;
    readonly zIndex?: number | "inherit" | "initial" | "unset" | "auto" | undefined;
    readonly position?: "inherit" | "initial" | "unset" | "static" | "relative" | "absolute" | "fixed" | "sticky" | undefined;
    readonly top?: string | undefined;
    readonly right?: string | undefined;
    readonly bottom?: string | undefined;
    readonly left?: string | undefined;
    readonly width?: string | number | undefined;
    readonly height?: string | number | undefined;
    readonly minWidth?: string | undefined;
    readonly minHeight?: string | undefined;
    readonly maxWidth?: string | undefined;
    readonly maxHeight?: string | undefined;
    readonly margin?: string | undefined;
    readonly marginTop?: string | undefined;
    readonly marginRight?: string | undefined;
    readonly marginBottom?: string | undefined;
    readonly marginLeft?: string | undefined;
    readonly padding?: string | number | undefined;
    readonly paddingTop?: string | undefined;
    readonly paddingRight?: string | undefined;
    readonly paddingBottom?: string | undefined;
    readonly paddingLeft?: string | undefined;
    readonly boxSizing?: "inherit" | "initial" | "unset" | "content-box" | "border-box" | undefined;
    readonly border?: string | undefined;
    readonly borderWidth?: string | undefined;
    readonly borderStyle?: "none" | "inherit" | "initial" | "unset" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset" | undefined;
    readonly borderColor?: string | undefined;
    readonly borderRadius?: string | number | undefined;
    readonly borderTop?: string | undefined;
    readonly borderRight?: string | undefined;
    readonly borderBottom?: string | undefined;
    readonly borderLeft?: string | undefined;
    readonly backgroundImage?: string | undefined;
    readonly backgroundPosition?: string | undefined;
    readonly backgroundSize?: string | undefined;
    readonly backgroundRepeat?: "inherit" | "initial" | "unset" | "repeat" | "repeat-x" | "repeat-y" | "no-repeat" | "space" | "round" | undefined;
    readonly backgroundAttachment?: "inherit" | "initial" | "unset" | "fixed" | "scroll" | "local" | undefined;
    readonly backgroundClip?: "inherit" | "initial" | "unset" | "content-box" | "border-box" | "padding-box" | undefined;
    readonly backgroundOrigin?: "inherit" | "initial" | "unset" | "content-box" | "border-box" | "padding-box" | undefined;
    readonly backgroundBlendMode?: "inherit" | "initial" | "unset" | "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity" | undefined;
    readonly fontFamily?: string | undefined;
    readonly fontSize?: string | number | undefined;
    readonly fontWeight?: number | "inherit" | "initial" | "unset" | "normal" | "bold" | "bolder" | "lighter" | undefined;
    readonly fontStyle?: "inherit" | "initial" | "unset" | "normal" | "italic" | "oblique" | undefined;
    readonly fontVariant?: "inherit" | "initial" | "unset" | "normal" | "small-caps" | undefined;
    readonly lineHeight?: string | number | undefined;
    readonly textAlign?: "inherit" | "initial" | "unset" | "left" | "right" | "center" | "justify" | "start" | "end" | undefined;
    readonly textDecoration?: string | undefined;
    readonly textTransform?: "none" | "inherit" | "initial" | "unset" | "capitalize" | "uppercase" | "lowercase" | undefined;
    readonly letterSpacing?: string | undefined;
    readonly wordSpacing?: string | undefined;
    readonly wordWrap?: "inherit" | "initial" | "unset" | "normal" | "nowrap" | "wrap" | "break-word" | undefined;
    readonly listStyleType?: "none" | "inherit" | "initial" | "unset" | "disc" | "circle" | "square" | "decimal" | "decimal-leading-zero" | "lower-roman" | "upper-roman" | "lower-greek" | "lower-latin" | "upper-latin" | "armenian" | "georgian" | "lower-alpha" | "upper-alpha" | undefined;
    readonly listStylePosition?: "inherit" | "initial" | "unset" | "inside" | "outside" | undefined;
    readonly listStyleImage?: string | undefined;
    readonly flex?: string | number | undefined;
    readonly flexDirection?: "inherit" | "initial" | "unset" | "row" | "row-reverse" | "column" | "column-reverse" | undefined;
    readonly flexWrap?: "inherit" | "initial" | "unset" | "nowrap" | "wrap" | "wrap-reverse" | undefined;
    readonly flexFlow?: string | undefined;
    readonly justifyContent?: "inherit" | "initial" | "unset" | "left" | "right" | "center" | "start" | "end" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined;
    readonly alignItems?: "inherit" | "initial" | "unset" | "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | undefined;
    readonly alignContent?: "inherit" | "initial" | "unset" | "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "stretch" | undefined;
    readonly order?: number | "inherit" | "initial" | "unset" | undefined;
    readonly flexGrow?: number | "inherit" | "initial" | "unset" | undefined;
    readonly flexShrink?: number | "inherit" | "initial" | "unset" | undefined;
    readonly flexBasis?: string | undefined;
    readonly alignSelf?: "inherit" | "initial" | "unset" | "auto" | "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | undefined;
    readonly gap?: string | number | undefined;
    readonly gridTemplateColumns?: string | undefined;
    readonly gridTemplateRows?: string | undefined;
    readonly gridTemplateAreas?: string | undefined;
    readonly gridTemplate?: string | undefined;
    readonly gridColumnGap?: string | undefined;
    readonly columnGap?: string | undefined;
    readonly gridRowGap?: string | undefined;
    readonly rowGap?: string | undefined;
    readonly gridGap?: string | undefined;
    readonly gridAutoRows?: string | undefined;
    readonly gridAutoColumns?: string | undefined;
    readonly gridAutoFlow?: "inherit" | "initial" | "unset" | "row" | "column" | "dense" | undefined;
    readonly gridArea?: string | undefined;
    readonly gridColumnStart?: string | number | undefined;
    readonly gridColumnEnd?: string | number | undefined;
    readonly gridRowStart?: string | number | undefined;
    readonly gridRowEnd?: string | number | undefined;
    readonly animation?: string | undefined;
    readonly animationName?: string | undefined;
    readonly animationDuration?: string | number | undefined;
    readonly animationTimingFunction?: string | undefined;
    readonly animationDelay?: string | number | undefined;
    readonly animationIterationCount?: number | "inherit" | "initial" | "unset" | "infinite" | undefined;
    readonly animationDirection?: "inherit" | "initial" | "unset" | "normal" | "reverse" | "alternate" | "alternate-reverse" | undefined;
    readonly animationFillMode?: "none" | "inherit" | "initial" | "unset" | "forwards" | "backwards" | "both" | undefined;
    readonly animationPlayState?: "inherit" | "initial" | "unset" | "running" | "paused" | undefined;
    readonly transition?: string | undefined;
    readonly transitionProperty?: string | undefined;
    readonly transitionDuration?: string | number | undefined;
    readonly transitionTimingFunction?: string | undefined;
    readonly transitionDelay?: string | number | undefined;
    readonly transform?: string | undefined;
    readonly transformOrigin?: string | undefined;
    readonly transformStyle?: "inherit" | "initial" | "unset" | "flat" | "preserve-3d" | undefined;
    readonly perspective?: string | undefined;
    readonly perspectiveOrigin?: string | undefined;
    readonly backfaceVisibility?: "inherit" | "initial" | "unset" | "visible" | "hidden" | undefined;
    readonly cursor?: string | undefined;
    readonly overflow?: "inherit" | "initial" | "unset" | "visible" | "hidden" | "auto" | "scroll" | undefined;
    readonly overflowX?: "inherit" | "initial" | "unset" | "visible" | "hidden" | "auto" | "scroll" | undefined;
    readonly overflowY?: "inherit" | "initial" | "unset" | "visible" | "hidden" | "auto" | "scroll" | undefined;
    readonly outline?: string | undefined;
    readonly outlineWidth?: string | undefined;
    readonly outlineStyle?: "none" | "inherit" | "initial" | "unset" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset" | undefined;
    readonly outlineColor?: string | undefined;
    readonly boxShadow?: string | undefined;
    readonly textShadow?: string | undefined;
    readonly resize?: "none" | "inherit" | "initial" | "unset" | "both" | "horizontal" | "vertical" | undefined;
    readonly userSelect?: "none" | "inherit" | "initial" | "unset" | "auto" | "text" | "all" | undefined;
    readonly pointerEvents?: "none" | "inherit" | "initial" | "unset" | "fill" | "visible" | "auto" | "all" | "visiblePainted" | "visibleFill" | "visibleStroke" | "painted" | "stroke" | undefined;
    readonly content?: string | undefined;
    readonly aspectRatio?: number | undefined;
    readonly cssWidth?: string | number | undefined;
    readonly cssHeight?: string | number | undefined;
} & {
    /**
     * The html tag to use in `createElement`
     */
    tag: AllowedTag;
}, "ref"> & RefAttributes<HTMLElement>>;
export default _default;
