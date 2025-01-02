export const hStack = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
} as const;

export const vStack = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
} as const;

export const hvCenterColumn = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
} as const;

export const hvCenterRow = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
} as const;

export const jumbotron = {
  ...hvCenterColumn,
  width: "100%",
  height: "100%",
} as const;
