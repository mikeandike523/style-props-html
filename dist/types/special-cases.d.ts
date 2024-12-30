export declare const specialCaseMap: {
    readonly canvas: readonly ["width", "height"];
    readonly img: readonly ["width", "height"];
    readonly iframe: readonly ["width", "height"];
    readonly video: readonly ["width", "height"];
    readonly svg: readonly ["width", "height"];
};
export declare const specialCaseList: Array<keyof typeof specialCaseMap>;
