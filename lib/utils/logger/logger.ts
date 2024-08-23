import { LogLevel } from "./types";
import { PROGRAM_OPTIONS } from "../../modules/program/cli/cli";

export class Logger {
  private readonly colors: Record<LogLevel, string> = {
    DEBUG: "\x1b[34m",
    INFO: "\x1b[32m",
    WARN: "\x1b[33m",
    ERROR: "\x1b[31m",
    FATAL: "\x1b[41m",
  };

  private readonly resetColor: string = "\x1b[0m";
  private readonly verbose: boolean;

  constructor(private readonly name: string) {
    this.verbose = PROGRAM_OPTIONS.verbose;
  }

  debug(message: string, object?: Record<string, any>) {
    if (this.verbose) {
      this.log(message, "DEBUG", object);
    }
  }

  info(message: string, object?: Record<string, any>) {
    this.log(message, "INFO", object);
  }

  warn(message: string, object?: Record<string, any>) {
    this.log(message, "WARN", object);
  }

  error(message: string, object?: Record<string, any>) {
    this.log(message, "ERROR", object);
  }

  fatal(message: string, object?: Record<string, any>) {
    this.log(message, "FATAL", object);
  }

  private log(
    message: string,
    logLevel: LogLevel,
    object?: Record<string, any>,
  ) {
    let logOutput = "";

    if (this.verbose) {
      logOutput += `\x1b[90m${this.getDate()} ${this.resetColor}`;
    }

    logOutput += `${this.colors[logLevel]}TypedRoutes${this.resetColor}`;

    if (this.verbose) {
      logOutput += `${this.colors["WARN"]} - [${this.name}] - ${this.resetColor}`;
    }

    logOutput += `${this.colors[logLevel]}[${logLevel}] - ${message}${this.resetColor}`;

    if (object) {
      console.log(logOutput, object);
    } else {
      console.log(logOutput);
    }
  }

  private getDate(): string {
    const now = new Date();

    const pad = (n: number, width: number = 2): string => {
      return n.toString().padStart(width, "0");
    };

    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());
    const milliseconds = pad(now.getMilliseconds(), 3);

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }
}
