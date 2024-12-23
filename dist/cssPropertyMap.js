export const cssPropertyMap = {
    objectFit: ["cover", "contain", "none", "inherit", "initial", "unset", "fill"],
    whiteSpace: ["normal", "nowrap", "pre", "pre-wrap", "pre-line"],
    color: ["string", "inherit", "initial", "unset", "transparent"],
    backgroundColor: ["string", "inherit", "initial", "unset", "transparent"],
    background: ["string", "inherit", "initial", "unset", "transparent"],
    opacity: ["number", "inherit", "initial", "unset"],
    display: ["block", "inline", "inline-block", "flex", "grid", "none", "inline-flex", "inline-grid", "table", "table-row", "table-cell", "list-item", "run-in", "contents", "inherit", "initial", "unset"],
    visibility: ["visible", "hidden", "collapse", "inherit", "initial", "unset"],
    zIndex: ["number", "auto", "inherit", "initial", "unset"],
    position: ["static", "relative", "absolute", "fixed", "sticky", "inherit", "initial", "unset"],
    top: ["string", "auto", "inherit", "initial", "unset"],
    right: ["string", "auto", "inherit", "initial", "unset"],
    bottom: ["string", "auto", "inherit", "initial", "unset"],
    left: ["string", "auto", "inherit", "initial", "unset"],
    width: ["string", "number", "auto", "inherit", "initial", "unset", "max-content", "min-content", "fit-content"],
    height: ["string", "number", "auto", "inherit", "initial", "unset", "max-content", "min-content", "fit-content"],
    minWidth: ["string", "inherit", "initial", "unset", "max-content", "min-content", "fit-content", "auto"],
    minHeight: ["string", "inherit", "initial", "unset", "max-content", "min-content", "fit-content", "auto"],
    maxWidth: ["string", "none", "inherit", "initial", "unset", "max-content", "min-content", "fit-content"],
    maxHeight: ["string", "none", "inherit", "initial", "unset", "max-content", "min-content", "fit-content"],
    margin: ["auto", "inherit", "initial", "unset", "string"],
    marginTop: ["auto", "inherit", "initial", "unset", "string"],
    marginRight: ["auto", "inherit", "initial", "unset", "string"],
    marginBottom: ["auto", "inherit", "initial", "unset", "string"],
    marginLeft: ["auto", "inherit", "initial", "unset", "string"],
    padding: ["inherit", "initial", "unset", "string", "number"],
    paddingTop: ["inherit", "initial", "unset", "string"],
    paddingRight: ["inherit", "initial", "unset", "string"],
    paddingBottom: ["inherit", "initial", "unset", "string"],
    paddingLeft: ["inherit", "initial", "unset", "string"],
    boxSizing: ["content-box", "border-box", "inherit", "initial", "unset"],
    border: ["string"],
    borderWidth: ["string", "thin", "medium", "thick", "inherit", "initial", "unset"],
    borderStyle: ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "inherit", "initial", "unset"],
    borderColor: ["string", "transparent", "inherit", "initial", "unset"],
    borderRadius: ["string", "number"],
    borderTop: ["string"],
    borderRight: ["string"],
    borderBottom: ["string"],
    borderLeft: ["string"],
    backgroundImage: ["string", "none", "inherit", "initial", "unset"],
    backgroundPosition: ["string"],
    backgroundSize: ["auto", "cover", "contain", "inherit", "initial", "unset", "string"],
    backgroundRepeat: ["repeat", "repeat-x", "repeat-y", "no-repeat", "space", "round", "inherit", "initial", "unset"],
    backgroundAttachment: ["scroll", "fixed", "local", "inherit", "initial", "unset"],
    backgroundClip: ["border-box", "padding-box", "content-box", "inherit", "initial", "unset"],
    backgroundOrigin: ["border-box", "padding-box", "content-box", "inherit", "initial", "unset"],
    backgroundBlendMode: ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "inherit", "initial", "unset"],
    fontFamily: ["string"],
    fontSize: ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "smaller", "larger", "inherit", "initial", "unset", "string", "number"],
    fontWeight: ["number", "normal", "bold", "bolder", "lighter", "inherit", "initial", "unset"],
    fontStyle: ["normal", "italic", "oblique", "inherit", "initial", "unset"],
    fontVariant: ["normal", "small-caps", "inherit", "initial", "unset"],
    lineHeight: ["number", "normal", "inherit", "initial", "unset", "string"],
    textAlign: ["left", "right", "center", "justify", "start", "end", "inherit", "initial", "unset"],
    textDecoration: ["none", "underline", "overline", "line-through", "blink", "inherit", "initial", "unset", "string"],
    textTransform: ["capitalize", "uppercase", "lowercase", "none", "inherit", "initial", "unset"],
    letterSpacing: ["normal", "inherit", "initial", "unset", "string"],
    wordSpacing: ["normal", "inherit", "initial", "unset", "string"],
    wordWrap: ["normal", "nowrap", "wrap", "break-word", "inherit", "initial", "unset"],
    listStyleType: ["disc", "circle", "square", "decimal", "decimal-leading-zero", "lower-roman", "upper-roman", "lower-greek", "lower-latin", "upper-latin", "armenian", "georgian", "lower-alpha", "upper-alpha", "none", "inherit", "initial", "unset"],
    listStylePosition: ["inside", "outside", "inherit", "initial", "unset"],
    listStyleImage: ["string", "none", "inherit", "initial", "unset"],
    flex: ["string", "number"],
    flexDirection: ["row", "row-reverse", "column", "column-reverse", "inherit", "initial", "unset"],
    flexWrap: ["nowrap", "wrap", "wrap-reverse", "inherit", "initial", "unset"],
    flexFlow: ["string"],
    justifyContent: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly", "start", "end", "left", "right", "inherit", "initial", "unset"],
    alignItems: ["stretch", "flex-start", "flex-end", "center", "baseline", "inherit", "initial", "unset"],
    alignContent: ["stretch", "flex-start", "flex-end", "center", "space-between", "space-around", "inherit", "initial", "unset"],
    order: ["number", "inherit", "initial", "unset"],
    flexGrow: ["number", "inherit", "initial", "unset"],
    flexShrink: ["number", "inherit", "initial", "unset"],
    flexBasis: ["auto", "inherit", "initial", "unset", "string"],
    alignSelf: ["auto", "flex-start", "flex-end", "center", "baseline", "stretch", "inherit", "initial", "unset"],
    gap: ["inherit", "initial", "unset", "string"],
    gridTemplateColumns: ["string"],
    gridTemplateRows: ["string"],
    gridTemplateAreas: ["string"],
    gridTemplate: ["string"],
    gridColumnGap: ["inherit", "initial", "unset", "string"],
    columnGap: ["inherit", "initial", "unset", "string"],
    gridRowGap: ["inherit", "initial", "unset", "string"],
    rowGap: ["inherit", "initial", "unset", "string"],
    gridGap: ["string"],
    gridAutoRows: ["string"],
    gridAutoColumns: ["string"],
    gridAutoFlow: ["row", "column", "dense", "row", "dense", "column", "dense", "inherit", "initial", "unset"],
    gridArea: ["string"],
    gridColumnStart: ["string", "number"],
    gridColumnEnd: ["string", "number"],
    gridRowStart: ["string", "number"],
    gridRowEnd: ["string", "number"],
    animation: ["string"],
    animationName: ["string", "none", "inherit", "initial", "unset"],
    animationDuration: ["string", "number"],
    animationTimingFunction: ["ease", "ease-in", "ease-out", "ease-in-out", "linear", "step-start", "step-end", "inherit", "initial", "unset", "string"],
    animationDelay: ["string", "number"],
    animationIterationCount: ["number", "infinite", "inherit", "initial", "unset"],
    animationDirection: ["normal", "reverse", "alternate", "alternate-reverse", "inherit", "initial", "unset"],
    animationFillMode: ["none", "forwards", "backwards", "both", "inherit", "initial", "unset"],
    animationPlayState: ["running", "paused", "inherit", "initial", "unset"],
    transition: ["string"],
    transitionProperty: ["string"],
    transitionDuration: ["string", "number"],
    transitionTimingFunction: ["ease", "ease-in", "ease-out", "ease-in-out", "linear", "step-start", "step-end", "inherit", "initial", "unset", "string"],
    transitionDelay: ["string", "number"],
    transform: ["string"],
    transformOrigin: ["string"],
    transformStyle: ["flat", "preserve-3d", "inherit", "initial", "unset"],
    perspective: ["none", "inherit", "initial", "unset", "string"],
    perspectiveOrigin: ["string"],
    backfaceVisibility: ["visible", "hidden", "inherit", "initial", "unset"],
    cursor: ["string", "auto", "default", "none", "context-menu", "help", "pointer", "progress", "wait", "cell", "crosshair", "text", "vertical-text", "alias", "copy", "move", "no-drop", "not-allowed", "grab", "grabbing", "e-resize", "n-resize", "ne-resize", "nw-resize", "s-resize", "se-resize", "sw-resize", "w-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "col-resize", "row-resize", "all-scroll", "zoom-in", "zoom-out", "inherit", "initial", "unset"],
    overflow: ["visible", "hidden", "scroll", "auto", "inherit", "initial", "unset"],
    overflowX: ["visible", "hidden", "scroll", "auto", "inherit", "initial", "unset"],
    overflowY: ["visible", "hidden", "scroll", "auto", "inherit", "initial", "unset"],
    outline: ["string"],
    outlineWidth: ["string", "thin", "medium", "thick", "inherit", "initial", "unset"],
    outlineStyle: ["none", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "inherit", "initial", "unset"],
    outlineColor: ["string", "invert", "inherit", "initial", "unset"],
    boxShadow: ["string", "none", "inherit", "initial", "unset"],
    textShadow: ["string", "none", "inherit", "initial", "unset"],
    resize: ["none", "both", "horizontal", "vertical", "inherit", "initial", "unset"],
    userSelect: ["auto", "none", "text", "all", "inherit", "initial", "unset"],
    pointerEvents: ["auto", "none", "visiblePainted", "visibleFill", "visibleStroke", "visible", "painted", "fill", "stroke", "all", "inherit", "initial", "unset"],
    content: ["string"],
    aspectRatio: ["number"],
    cssWidth: ["string", "number", "auto", "inherit", "initial", "unset", "max-content", "min-content", "fit-content"],
    cssHeight: ["string", "number", "auto", "inherit", "initial", "unset", "max-content", "min-content", "fit-content"],
};
export default cssPropertyMap;
