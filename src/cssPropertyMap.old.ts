export const cssPropertyMap = {
  objectFit: [
    "cover",
    "contain",
    "none",
    "inherit",
    "initial",
    "unset",
    "fill",
  ] as const,
  whiteSpace: ["normal", "nowrap", "pre", "pre-wrap", "pre-line"] as const,
  color: ["string", "inherit", "initial", "unset", "transparent"] as const,
  backgroundColor: [
    "string",
    "inherit",
    "initial",
    "unset",
    "transparent",
  ] as const,
  background: ["string", "inherit", "initial", "unset", "transparent"] as const,
  opacity: ["number", "inherit", "initial", "unset"] as const,
  display: [
    "block",
    "inline",
    "inline-block",
    "flex",
    "grid",
    "none",
    "inline-flex",
    "inline-grid",
    "table",
    "table-row",
    "table-cell",
    "list-item",
    "run-in",
    "contents",
    "inherit",
    "initial",
    "unset",
  ] as const,
  visibility: [
    "visible",
    "hidden",
    "collapse",
    "inherit",
    "initial",
    "unset",
  ] as const,
  zIndex: ["number", "auto", "inherit", "initial", "unset"] as const,
  position: [
    "static",
    "relative",
    "absolute",
    "fixed",
    "sticky",
    "inherit",
    "initial",
    "unset",
  ] as const,
  top: ["string", "auto", "inherit", "initial", "unset"] as const,
  right: ["string", "auto", "inherit", "initial", "unset"] as const,
  bottom: ["string", "auto", "inherit", "initial", "unset"] as const,
  left: ["string", "auto", "inherit", "initial", "unset"] as const,
  width: [
    "string",
    "number",
    "auto",
    "inherit",
    "initial",
    "unset",
    "max-content",
    "min-content",
    "fit-content",
  ] as const,
  height: [
    "string",
    "number",
    "auto",
    "inherit",
    "initial",
    "unset",
    "max-content",
    "min-content",
    "fit-content",
  ] as const,
  minWidth: [
    "string",
    "inherit",
    "initial",
    "unset",
    "max-content",
    "min-content",
    "fit-content",
    "auto",
  ] as const,
  minHeight: [
    "string",
    "inherit",
    "initial",
    "unset",
    "max-content",
    "min-content",
    "fit-content",
    "auto",
  ] as const,
  maxWidth: [
    "string",
    "none",
    "inherit",
    "initial",
    "unset",
    "max-content",
    "min-content",
    "fit-content",
  ] as const,
  maxHeight: [
    "string",
    "none",
    "inherit",
    "initial",
    "unset",
    "max-content",
    "min-content",
    "fit-content",
  ] as const,
  margin: ["auto", "inherit", "initial", "unset", "string"] as const,
  marginTop: ["auto", "inherit", "initial", "unset", "string"] as const,
  marginRight: ["auto", "inherit", "initial", "unset", "string"] as const,
  marginBottom: ["auto", "inherit", "initial", "unset", "string"] as const,
  marginLeft: ["auto", "inherit", "initial", "unset", "string"] as const,
  padding: ["inherit", "initial", "unset", "string", "number"] as const,
  paddingTop: ["inherit", "initial", "unset", "string"] as const,
  paddingRight: ["inherit", "initial", "unset", "string"] as const,
  paddingBottom: ["inherit", "initial", "unset", "string"] as const,
  paddingLeft: ["inherit", "initial", "unset", "string"] as const,
  boxSizing: [
    "content-box",
    "border-box",
    "inherit",
    "initial",
    "unset",
  ] as const,
  border: ["string"] as const,
  borderWidth: [
    "string",
    "thin",
    "medium",
    "thick",
    "inherit",
    "initial",
    "unset",
  ] as const,
  borderStyle: [
    "none",
    "hidden",
    "dotted",
    "dashed",
    "solid",
    "double",
    "groove",
    "ridge",
    "inset",
    "outset",
    "inherit",
    "initial",
    "unset",
  ] as const,
  borderColor: [
    "string",
    "transparent",
    "inherit",
    "initial",
    "unset",
  ] as const,
  borderRadius: ["string", "number"] as const,
  borderTop: ["string"] as const,
  borderRight: ["string"] as const,
  borderBottom: ["string"] as const,
  borderLeft: ["string"] as const,
  backgroundImage: ["string", "none", "inherit", "initial", "unset"] as const,
  backgroundPosition: ["string"] as const,
  backgroundSize: [
    "auto",
    "cover",
    "contain",
    "inherit",
    "initial",
    "unset",
    "string",
  ] as const,
  backgroundRepeat: [
    "repeat",
    "repeat-x",
    "repeat-y",
    "no-repeat",
    "space",
    "round",
    "inherit",
    "initial",
    "unset",
  ] as const,
  backgroundAttachment: [
    "scroll",
    "fixed",
    "local",
    "inherit",
    "initial",
    "unset",
  ] as const,
  backgroundClip: [
    "border-box",
    "padding-box",
    "content-box",
    "inherit",
    "initial",
    "unset",
  ] as const,
  backgroundOrigin: [
    "border-box",
    "padding-box",
    "content-box",
    "inherit",
    "initial",
    "unset",
  ] as const,
  backgroundBlendMode: [
    "normal",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity",
    "inherit",
    "initial",
    "unset",
  ] as const,
  fontFamily: ["string"] as const,
  fontSize: [
    "xx-small",
    "x-small",
    "small",
    "medium",
    "large",
    "x-large",
    "xx-large",
    "smaller",
    "larger",
    "inherit",
    "initial",
    "unset",
    "string",
    "number",
  ] as const,
  fontWeight: [
    "number",
    "normal",
    "bold",
    "bolder",
    "lighter",
    "inherit",
    "initial",
    "unset",
  ] as const,
  fontStyle: [
    "normal",
    "italic",
    "oblique",
    "inherit",
    "initial",
    "unset",
  ] as const,
  fontVariant: ["normal", "small-caps", "inherit", "initial", "unset"] as const,
  lineHeight: [
    "number",
    "normal",
    "inherit",
    "initial",
    "unset",
    "string",
  ] as const,
  textAlign: [
    "left",
    "right",
    "center",
    "justify",
    "start",
    "end",
    "inherit",
    "initial",
    "unset",
  ] as const,
  textDecoration: [
    "none",
    "underline",
    "overline",
    "line-through",
    "blink",
    "inherit",
    "initial",
    "unset",
    "string",
  ] as const,
  textTransform: [
    "capitalize",
    "uppercase",
    "lowercase",
    "none",
    "inherit",
    "initial",
    "unset",
  ] as const,
  letterSpacing: ["normal", "inherit", "initial", "unset", "string"] as const,
  wordSpacing: ["normal", "inherit", "initial", "unset", "string"] as const,
  wordWrap: [
    "normal",
    "nowrap",
    "wrap",
    "break-word",
    "inherit",
    "initial",
    "unset",
  ] as const,
  listStyleType: [
    "disc",
    "circle",
    "square",
    "decimal",
    "decimal-leading-zero",
    "lower-roman",
    "upper-roman",
    "lower-greek",
    "lower-latin",
    "upper-latin",
    "armenian",
    "georgian",
    "lower-alpha",
    "upper-alpha",
    "none",
    "inherit",
    "initial",
    "unset",
  ] as const,
  listStylePosition: [
    "inside",
    "outside",
    "inherit",
    "initial",
    "unset",
  ] as const,
  listStyleImage: ["string", "none", "inherit", "initial", "unset"] as const,
  flex: ["string", "number"] as const,
  flexDirection: [
    "row",
    "row-reverse",
    "column",
    "column-reverse",
    "inherit",
    "initial",
    "unset",
  ] as const,
  flexWrap: [
    "nowrap",
    "wrap",
    "wrap-reverse",
    "inherit",
    "initial",
    "unset",
  ] as const,
  flexFlow: ["string"] as const,
  justifyContent: [
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
    "start",
    "end",
    "left",
    "right",
    "inherit",
    "initial",
    "unset",
  ] as const,
  alignItems: [
    "stretch",
    "flex-start",
    "flex-end",
    "center",
    "baseline",
    "inherit",
    "initial",
    "unset",
  ] as const,
  alignContent: [
    "stretch",
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "inherit",
    "initial",
    "unset",
  ] as const,
  order: ["number", "inherit", "initial", "unset"] as const,
  flexGrow: ["number", "inherit", "initial", "unset"] as const,
  flexShrink: ["number", "inherit", "initial", "unset"] as const,
  flexBasis: ["auto", "inherit", "initial", "unset", "string"] as const,
  alignSelf: [
    "auto",
    "flex-start",
    "flex-end",
    "center",
    "baseline",
    "stretch",
    "inherit",
    "initial",
    "unset",
  ] as const,
  gap: ["inherit", "initial", "unset", "string"] as const,
  gridTemplateColumns: ["string"] as const,
  gridTemplateRows: ["string"] as const,
  gridTemplateAreas: ["string"] as const,
  gridTemplate: ["string"] as const,
  gridColumnGap: ["inherit", "initial", "unset", "string"] as const,
  columnGap: ["inherit", "initial", "unset", "string"] as const,
  gridRowGap: ["inherit", "initial", "unset", "string"] as const,
  rowGap: ["inherit", "initial", "unset", "string"] as const,
  gridGap: ["string"] as const,
  gridAutoRows: ["string"] as const,
  gridAutoColumns: ["string"] as const,
  gridAutoFlow: [
    "row",
    "column",
    "dense",
    "row dense",
    "column dense",
    "inherit",
    "initial",
    "unset",
  ] as const,
  gridArea: ["string"] as const,
  gridColumnStart: ["string", "number"] as const,
  gridColumnEnd: ["string", "number"] as const,
  gridRowStart: ["string", "number"] as const,
  gridRowEnd: ["string", "number"] as const,
  animation: ["string"] as const,
  animationName: ["string", "none", "inherit", "initial", "unset"] as const,
  animationDuration: ["string", "number"] as const,
  animationTimingFunction: [
    "ease",
    "ease-in",
    "ease-out",
    "ease-in-out",
    "linear",
    "step-start",
    "step-end",
    "inherit",
    "initial",
    "unset",
    "string",
  ] as const,
  animationDelay: ["string", "number"] as const,
  animationIterationCount: [
    "number",
    "infinite",
    "inherit",
    "initial",
    "unset",
  ] as const,
  animationDirection: [
    "normal",
    "reverse",
    "alternate",
    "alternate-reverse",
    "inherit",
    "initial",
    "unset",
  ] as const,
  animationFillMode: [
    "none",
    "forwards",
    "backwards",
    "both",
    "inherit",
    "initial",
    "unset",
  ] as const,
  animationPlayState: [
    "running",
    "paused",
    "inherit",
    "initial",
    "unset",
  ] as const,
  transition: ["string"] as const,
  transitionProperty: ["string"] as const,
  transitionDuration: ["string", "number"] as const,
  transitionTimingFunction: [
    "ease",
    "ease-in",
    "ease-out",
    "ease-in-out",
    "linear",
    "step-start",
    "step-end",
    "inherit",
    "initial",
    "unset",
    "string",
  ] as const,
  transitionDelay: ["string", "number"] as const,
  transform: ["string"] as const,
  transformOrigin: ["string"] as const,
  transformStyle: [
    "flat",
    "preserve-3d",
    "inherit",
    "initial",
    "unset",
  ] as const,
  perspective: ["none", "inherit", "initial", "unset", "string"] as const,
  perspectiveOrigin: ["string"] as const,
  backfaceVisibility: [
    "visible",
    "hidden",
    "inherit",
    "initial",
    "unset",
  ] as const,
  cursor: [
    "string",
    "auto",
    "default",
    "none",
    "context-menu",
    "help",
    "pointer",
    "progress",
    "wait",
    "cell",
    "crosshair",
    "text",
    "vertical-text",
    "alias",
    "copy",
    "move",
    "no-drop",
    "not-allowed",
    "grab",
    "grabbing",
    "e-resize",
    "n-resize",
    "ne-resize",
    "nw-resize",
    "s-resize",
    "se-resize",
    "sw-resize",
    "w-resize",
    "ew-resize",
    "ns-resize",
    "nesw-resize",
    "nwse-resize",
    "col-resize",
    "row-resize",
    "all-scroll",
    "zoom-in",
    "zoom-out",
    "inherit",
    "initial",
    "unset",
  ] as const,
  overflow: [
    "visible",
    "hidden",
    "scroll",
    "auto",
    "inherit",
    "initial",
    "unset",
  ] as const,
  overflowX: [
    "visible",
    "hidden",
    "scroll",
    "auto",
    "inherit",
    "initial",
    "unset",
  ] as const,
  overflowY: [
    "visible",
    "hidden",
    "scroll",
    "auto",
    "inherit",
    "initial",
    "unset",
  ] as const,
  outline: ["string"] as const,
  outlineWidth: [
    "string",
    "thin",
    "medium",
    "thick",
    "inherit",
    "initial",
    "unset",
  ] as const,
  outlineStyle: [
    "none",
    "dotted",
    "dashed",
    "solid",
    "double",
    "groove",
    "ridge",
    "inset",
    "outset",
    "inherit",
    "initial",
    "unset",
  ] as const,
  outlineColor: ["string", "invert", "inherit", "initial", "unset"] as const,
  boxShadow: ["string", "none", "inherit", "initial", "unset"] as const,
  textShadow: ["string", "none", "inherit", "initial", "unset"] as const,
  resize: [
    "none",
    "both",
    "horizontal",
    "vertical",
    "inherit",
    "initial",
    "unset",
  ] as const,
  userSelect: [
    "auto",
    "none",
    "text",
    "all",
    "inherit",
    "initial",
    "unset",
  ] as const,
  pointerEvents: [
    "auto",
    "none",
    "visiblePainted",
    "visibleFill",
    "visibleStroke",
    "visible",
    "painted",
    "fill",
    "stroke",
    "all",
    "inherit",
    "initial",
    "unset",
  ] as const,
  content: ["string"] as const,
  aspectRatio: ["number"] as const,
} as const;

type MapValues<T extends readonly any[]> = T[number] extends infer U
  ? U extends "string"
    ? string
    : U extends "number"
    ? number
    : U
  : never;

export type CSSPropertyMap = {
  [K in keyof typeof cssPropertyMap]: MapValues<(typeof cssPropertyMap)[K]>;
};

export default cssPropertyMap;