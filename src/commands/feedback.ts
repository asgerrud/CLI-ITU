import { Command, flags } from "@oclif/command";
import chalk = require("chalk");
import inquirer = require("inquirer");
import * as shell from "shelljs";
import ghCli = require("../utils/gh");
import cli from "cli-ux";

const issuePage = "https://github.com/AsgereDreemurr/CLI-ITU/issues";

export default class Feedback extends Command {
  static description =
    "Report a bug or suggest an issue to improve the CLI. \n Requires Github CLI installed to create the issue. To manually submit, use the --noprompt flag.";

  static flags = {
    help: flags.help({ char: "h" }),
    noprompt: flags.boolean({
      char: "n",
      description:
        "Turns off the issue prompt. Instead opens the issues page for the CLI",
    }),
  };

  async run(): Promise<any> {
    const { flags } = this.parse(Feedback);

    if (flags.noprompt) {
      console.log("Opening " + issuePage);
      cli.open(issuePage);
      return;
    }

    if (!ghCli.isInstalled()) return;

    if (!ghCli.isAuthenticated()) return;

    await inquirer
      .prompt([
        {
          name: "type",
          message: "What type of feedback are you reporting?",
          type: "list",
          choices: [
            { name: "bug", value: "bug" },
            {
              name: "enhancement (new feature or request)",
              value: "enhancement",
            },
            {
              name: "documentation (improvements or additions)",
              value: "documentation",
            },
            { name: "question" },
            { name: "other" },
          ],
        },
        { name: "title", message: "Enter title:", type: "input" },
        { name: "description", message: "Enter description:", type: "input" },
        { name: "confirm", message: "Submit issue?", type: "confirm" },
      ])
      .then(function (answers) {
        const { type, title, description, confirm } = answers;

        if (confirm) {
          const issue = shell.exec(
            `gh issue create --title "${title}" --body "${description}" --label "${type}" --repo github.com/AsgereDreemurr/CLI-ITU"`,
            { async: false, silent: true }
          );
          if (issue.stderr !== "") {
            console.error(chalk.red(issue.stderr.trim()));
            return;
          }
          console.log("✔ issue submitted:", issue.stdout.trim());
          console.log("Thanks for the feedback!");
        }
      })
      .catch(function (error) {
        if (error.isTtyError) {
          console.error(
            "The prompt couldn't be rendered in the current environment"
          );
        } else {
          console.error("Something went wrong while showing the issue prompt");
        }
      });
  }
}
