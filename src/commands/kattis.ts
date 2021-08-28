import { Command, flags } from "@oclif/command";
import shell = require("shelljs");

export default class Kattis extends Command {
  static description = `
    fetch: downloads sample data files to directory. WARNING: the program will overwrite existing data files of the same name.
  `;

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [
    { name: "action", options: ["fetch"], required: true },
    { name: "problem_ID", required: true },
  ];

  async run(): Promise<void> {
    const { args } = this.parse(Kattis);

    if (args.action === "fetch") {
      shell.exec(
        `curl -s https://open.kattis.com/problems/${args.problem_ID}/file/statement/samples.zip > samples.zip && unzip -o samples.zip && rm samples.zip`,
        { async: false }
      );
      this.log("✅Fetch complete!");
      shell.exit(0);
    }
  }
}
