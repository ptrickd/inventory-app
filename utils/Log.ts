export class Log {
  red(value: any): void {
    console.log("\x1b[31m%s\x1b[0m", value);
  }
  green(value: any): void {
    console.log("\x1b[32m%s\x1b[0m", value);
  }
  yellow(value: any): void {
    console.log("\x1b[33m%s\x1b[0m", value);
  }
  blue(value: any): void {
    console.log("\x1b[34m%s\x1b[0m", value);
  }
  magenta(value: any): void {
    console.log("\x1b[35m%s\x1b[0m", value);
  }
  cyan(value: any): void {
    console.log("\x1b[36m%s\x1b[0m", value);
  }
}
