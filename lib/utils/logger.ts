import chalk from "chalk";

export class Logger {
  constructor(private readonly verbose: boolean) {}

  info(message: any) {
    this.verbose && console.info(chalk.white(this.messageToString(message)));
  }

  success(message: any) {
    console.info(chalk.green(this.messageToString(message)));
  }

  warn(message: any) {
    console.warn(chalk.yellow(this.messageToString(message)));
  }

  error(message: any) {
    console.error(chalk.red(this.messageToString(message)));
  }

  private messageToString(message: any) {
    if (typeof message === "object") {
      return JSON.stringify(message, null, 2) + "\n";
    }
    return message;
  }
}
