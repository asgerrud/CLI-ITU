import { Command, flags } from "@oclif/command";
import * as shell from "shelljs";
import path = require("path");
import fs = require("fs");
import chalk = require("chalk");

function red(msg: string) {
  console.log(chalk.red(msg));
}
function green(msg: string) {
  console.log(chalk.green(msg));
}

function timeInSeconds(t0: number, t1: number) {
  return (t1 - t0) / 1_000_000_000;
}

export default class Test extends Command {
  static description =
    "test your Java program against a series of sample data files";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [
    { name: "classname", required: true },
    {
      name: "directory",
      description:
        "The directory containing the input (.in) and answer (.ans) files",
      required: false,
    },
  ];

  async run(): Promise<void> {
    const { args } = this.parse(Test);
    const dir = args.dir ?? "./";

    let failed = 0;
    // listing all files using forEach
    fs.readdir(dir, function (error: any, files: any) {
      // handling error
      if (error) {
        return red("Unable to scan directory: " + error);
      }

      const inputFiles: string[] = [];
      const answerFiles: string[] = [];
      for (const file of files) {
        // Do whatever you want to do with the file
        const { name, ext } = path.parse(file);
        if (ext === ".in") {
          inputFiles.push(name);
        } else if (ext === ".ans") {
          answerFiles.push(name);
        }
      }

      const testCases = inputFiles.length;
      console.log("Detected " + testCases + " test cases");

      for (const filename of inputFiles) {
        if (!answerFiles.includes(filename)) {
          red(`✖ MISSING OUTPUT FILE: ${filename}.ans`);
          failed++;
          continue;
        }

        const t0 = process.hrtime()[1];
        const diff = shell.exec(
          `java -cp ${dir} ${args.classname} < ${filename}.in | diff - ${filename}.ans >/dev/null`
        ).stdout;
        const t1 = process.hrtime()[1];
        const seconds = timeInSeconds(t0, t1).toFixed(2);

        if (diff === "") {
          green(`✔ PASSED [${filename}] [${seconds}s]`);
          failed++;
        } else {
          red(`✖ FAILED [${filename}] [${seconds}s]`);
        }
      }

      if (failed === 0) {
        green("---------------------\n");
        green("All tests passed!\n");
      } else {
        red("---------------------\n");
        red(`${failed}/${testCases} tests failed 😐`);
      }
      shell.exit(0);
    });
  }
}