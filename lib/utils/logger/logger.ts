import * as fns from "date-fns";
import chalk from "chalk";
import { LogLevel } from "./types";
import { PROGRAM_OPTIONS } from "../../modules/program/cli/cli";

export class Logger {
  private readonly colors: Record<LogLevel, any> = {
    DEBUG: chalk.blue,
    INFO: chalk.green,
    WARN: chalk.yellow,
    ERROR: chalk.red,
    FATAL: chalk.bgRed,
  };
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
      logOutput += `${chalk.gray(this.getDate())} `;
    }

    logOutput += this.colors[logLevel]("TypedRoutes");

    if (this.verbose) {
      logOutput += chalk.yellow(` - [${this.name}] - `);
    }

    logOutput += this.colors[logLevel](`[${logLevel}] - ${message}`);

    if (object) {
      console.log(logOutput, object);
    } else {
      console.log(logOutput);
    }
  }

  private getDate() {
    return fns.format(new Date(), "HH:mm:ss.SSS");
  }
}
