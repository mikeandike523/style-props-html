"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jumbotron = exports.hvCenterRow = exports.hvCenterColumn = exports.vStack = exports.hStack = void 0;
exports.hStack = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
};
exports.vStack = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
};
exports.hvCenterColumn = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
};
exports.hvCenterRow = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
};
exports.jumbotron = Object.assign(Object.assign({}, exports.hvCenterColumn), { width: "100%", height: "100%" });
//# sourceMappingURL=utility-style-props.js.map