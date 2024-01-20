import chalk from "chalk";

export class Logger {
  constructor(private readonly verboseLogging: boolean) {}

  log(message: any) {
    this.verboseLogging &&
      console.log(chalk.white(this.messageToString(message)));
  }

  info(message: any) {
    this.verboseLogging &&
      console.info(chalk.white(this.messageToString(message)));
  }

  success(message: any) {
    console.info(chalk.green(this.messageToString(message)));
  }

  warn(message: any) {
    console.warn(chalk.yellow(this.messageToString(message)));
  }

  error(message: any, error?: any) {
    console.error(chalk.red(this.messageToString(message)));

    if (this.verboseLogging) {
      console.error(error);
    }
  }

  private messageToString(message: any) {
    if (typeof message === "object") {
      return JSON.stringify(message, null, 2) + "\n";
    }
    return message;
  }
}
