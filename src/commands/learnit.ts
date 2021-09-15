/* eslint-disable unicorn/prefer-module */
import { Command, flags } from "@oclif/command";
import chalk = require("chalk");
import cli from "cli-ux";
import inquirer = require("inquirer");
import fs = require("fs");
import path = require("path");
const { search } = require("fast-fuzzy");

// eslint-disable-next-line no-path-concat
const configFilePath = path.join(__dirname, "..", "..", "learnit-config.json");
const hasConfigFile = () => fs.existsSync(configFilePath);

export default class Learnit extends Command {
  static aliases = ["l"];

  static description = `Open a course's LearnIT page directly from your terminal.

  CONFIG
  For a course page to be openable, it must first be added to the config file.

  to generate the config file, use
  $ itu learnit --init

  to add a single course, use
  $ itu learnit --add

  to find the course id:
  - open the LearnIT page
  - locate the number in the end of the URL

  Example: https://learnit.itu.dk/course/view.php?id=3020335
  `;

  static examples = [
    "$ itu learnit security",
    "$ itu learnit 'Applied Algorithms' ",
    "$ itu l discrete",
    "",
    "$ itu learnit -init",
    "$ itu learnit -reset",
    "$ itu learnit -add",
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    reset: flags.boolean({ char: "r", description: "Reset the config file" }),
    init: flags.boolean({
      char: "i",
      exclusive: ["reset"],
      description: "Initialize the config file",
    }),
    add: flags.boolean({
      char: "a",
      exclusive: ["init", "reset"],
      description: "Add a course to the config file",
    }),
  };

  static args = [
    {
      name: "course",
      required: false,
      description:
        "The name of the course to open in LearnIT. The command uses fuzzy-search to find the course, meaning it is not necessary to enter the name letter for letter",
    },
  ];

  async run(): Promise<any> {
    const { args, flags } = this.parse(Learnit);

    if (args.course) {
      if (!hasConfigFile()) {
        return console.error(
          chalk.red(
            "The course config file has not been set up. Please run: itu learnit --init"
          )
        );
      }

      const { courseID, courseName } = getCourseMatch(args.course);

      if (courseID === undefined) {
        console.error(
          chalk.red("No course matched the query. Please rerun the command")
        );
      } else {
        console.log(
          "Opening course page for: " + chalk.cyan(courseName.toUpperCase())
        );
        openCoursePage(courseID);
      }
      return;
    }

    if (flags.init || flags.reset) {
      if (hasConfigFile() && flags.init) {
        const confirmOverwrite = await cli.confirm(
          "A config file already exists. Do you wish to replace the old one? (y/n)"
        );
        if (!confirmOverwrite) return;
      }

      const numberOfCourses = await cli.prompt(
        "How many courses do you wish to add?"
      );

      if (isValidNumber(numberOfCourses) === false) {
        return console.log(
          chalk.red("Invalid number. Please rerun the command")
        );
      }

      const questions = createPrompts(numberOfCourses);

      await inquirer.prompt(questions).then(function (courses) {
        try {
          const newConfigFile: { [key: string]: string } = {};

          for (let i = 1; i <= numberOfCourses; i++) {
            const id = courses["id" + i];
            const name = courses["course" + i].toLowerCase();
            newConfigFile[name] = id;
          }
          fs.writeFileSync(configFilePath, JSON.stringify(newConfigFile));
        } catch (error) {
          console.error(error);
        }
      });
    }
    if (flags.add) {
      await inquirer
        .prompt([
          {
            name: "name",
            message: "Give the course a name:",
            type: "input",
          },
          {
            name: "id",
            message: "Enter course id:",
            type: "number",
          },
        ])
        .then(function (course) {
          const config = getConfig();
          const { id, name } = course;
          config[name] = id;
          fs.writeFileSync(configFilePath, JSON.stringify(config));
        });
    }
  }
}

function getCourseMatch(_course: string) {
  const config = getConfig();
  const courseName = search(_course, Object.keys(config))[0];
  const courseID = config[courseName];
  return { courseID, courseName };
}

function getConfig() {
  return JSON.parse(fs.readFileSync(configFilePath, "utf-8"));
}

function openCoursePage(id: number) {
  cli.open(`https://learnit.itu.dk/course/view.php?id=${id}`);
}

function isValidNumber(str: string) {
  return Number.isInteger(Number.parseInt(str, 10));
}

function createPrompts(amount: any) {
  const questions = [];
  for (let i = 1; i <= amount; i++) {
    questions.push(
      {
        name: "course" + i,
        message: `[${i}/${amount}] Give the course a name:`,
        type: "input",
      },
      {
        name: "id" + i,
        message: `[${i}/${amount}] Enter course id:`,
        type: "number",
      }
    );
  }
  return questions;
}
