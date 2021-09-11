import { Command, flags } from "@oclif/command";
import * as shell from "shelljs";
import path = require("path");
import fs = require("fs");
import chalk = require("chalk");
import timing = require("../utils/timing");

function red(msg: string) {
  console.log(chalk.red(msg));
}
function green(msg: string) {
  console.log(chalk.green(msg));
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

        const t0 = process.hrtime.bigint();
        const diff = shell.exec(
          `java -cp ${args.classname} < ${filename}.in | diff - ${filename}.ans >/dev/null`,
          { async: false }
        ).stdout;
        const t1 = process.hrtime.bigint();
        const seconds = timing.nanoToSeconds(t0, t1).toFixed(2);

        if (diff === "") {
          green(`✔ PASSED [${filename}] [${seconds}s]`);
        } else {
          red(`✖ FAILED [${filename}] [${seconds}s]`);
          failed++;
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
