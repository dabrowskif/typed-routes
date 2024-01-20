import * as fns from "date-fns";
import chalk from "chalk";
import { LogDetails, LogLevel, LogsDetailsMap } from "./types";

export class Logger {
  private readonly colors: Record<LogLevel, any> = {
    DEBUG: chalk.blue,
    INFO: chalk.green,
    WARN: chalk.yellow,
    ERROR: chalk.red,
    FATAL: chalk.bgRed,
  };
  private readonly logDetails: LogDetails;

  constructor(private readonly name: string = "Default") {
    // TODO: change DEBUG to be dynamic based on program args
    this.logDetails = LogsDetailsMap.DEBUG;
  }

  debug(message: string, object?: Record<string, any>) {
    if (this.logDetails.value <= 0) {
      this.log(message, "DEBUG", object);
    }
  }

  info(message: string, object?: Record<string, any>) {
    if (this.logDetails.value <= 1) {
      this.log(message, "INFO", object);
    }
  }

  warn(message: string, object?: Record<string, any>) {
    if (this.logDetails.value <= 2) {
      this.log(message, "WARN", object);
    }
  }

  error(message: string, object?: Record<string, any>) {
    if (this.logDetails.value <= 3) {
      this.log(message, "ERROR", object);
    }
  }

  fatal(message: string, object?: Record<string, any>) {
    if (this.logDetails.value <= 4) {
      this.log(message, "FATAL", object);
    }
  }

  private log(
    message: string,
    logLevel: LogLevel,
    object?: Record<string, any>,
  ) {
    if (object) {
      return console.log(
        chalk.gray(this.getDate()),
        chalk.yellow(`TypedRoutes - [${this.name}] -`),
        this.colors[logLevel](`[${logLevel}] - ${message}`),
        object,
      );
    } else {
      return console.log(
        chalk.gray(this.getDate()),
        chalk.yellow(`TypedRoutes - [${this.name}] -`),
        this.colors[logLevel](`[${logLevel}] - ${message}`),
      );
    }
  }

  private getDate() {
    return fns.format(new Date(), "HH:mm:ss.SSS");
  }
}
