export type LogDetails = {
  value: number;
  level: LogLevel;
};
export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL";

export const LogsDetailsMap = {
  DEBUG: {
    value: 0,
    level: "DEBUG",
  },
  INFO: {
    value: 1,
    level: "INFO",
  },
  WARN: {
    value: 2,
    level: "WARN",
  },
  ERROR: {
    value: 3,
    level: "ERROR",
  },
  FATAL: {
    value: 4,
    level: "FATAL",
  },
} as const;
