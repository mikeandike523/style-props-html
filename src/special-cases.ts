export const specialCaseMap = {
  "canvas": [
    "width",
    "height"
  ],
  "img": [
    "width",
    "height"
  ],
  "iframe": [
    "width",
    "height"
  ],
  "video": [
    "width",
    "height"
  ],
  "svg": [
    "width",
    "height"
  ]
} as const;

export const specialCaseList = Object.keys(specialCaseMap) as Array<keyof typeof specialCaseMap>;
