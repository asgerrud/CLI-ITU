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

  static description = `open a course's LearnIT page directly from your terminal.

  CONFIG
  for a course page to be openable, it must first be added to the config file.

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
    reset: flags.boolean({ char: "r", description: "reset the config file" }),
    init: flags.boolean({
      char: "i",
      exclusive: ["reset"],
      description: "initialize the config file",
    }),
    add: flags.boolean({
      char: "a",
      exclusive: ["init", "reset"],
      description: "add a course to the config file",
    }),
    delete: flags.boolean({
      char: "d",
      exclusive: ["add"],
      description: "remove a course from the config list",
    }),
    edit: flags.boolean({
      char: "e",
      exclusive: ["delete", "add"],
      description: "edit a course from the config list",
    }),
  };

  static args = [
    {
      name: "course",
      required: false,
      description:
        "The name of the course to open in LearnIT. Supports fuzzy searching",
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

    if (flags.add) return addCourse();
    if (flags.delete) return removeCourse();
    if (flags.edit) return editCourse();

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
  }
}

async function addCourse() {
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
      console.log("the course was successfully added 👌");
    });
}

async function editCourse() {
  const config = getConfig();
  await inquirer
    .prompt([
      {
        type: "list",
        name: "course",
        message: "Which course do you want to edit?",
        choices: Object.keys(config),
      },
      {
        type: "input",
        name: "newName",
        message: "Rename course? (leave blank to keep name):",
      },
      {
        type: "input",
        name: "newID",
        message: "Change id? (leave blank to keep id)",
        validate: function (answer) {
          if (answer === "") return true;
          const isInteger = Number.isInteger(Number.parseInt(answer, 10));
          if (!isInteger) {
            console.log(chalk.red("\nPlease enter a valid a number"));
          }
          return isInteger;
        },
      },
      { type: "confirm", name: "confirm", message: "Confirm edit?" },
    ])
    .then(function (ans) {
      if (ans.confirm) {
        const id = ans.newID || config[ans.course];
        config[ans.course] = Number.parseInt(id, 10);

        if (ans.newName !== "") {
          config[ans.newName] = config[ans.course];
          delete config[ans.course];
        }
        fs.writeFileSync(configFilePath, JSON.stringify(config));
        console.log("the course was successfully edited 👌");
      }
    });
}

async function removeCourse() {
  const config = getConfig();
  await inquirer
    .prompt([
      {
        type: "list",
        name: "course",
        message: "Which course do you want to delete?",
        choices: Object.keys(config),
      },
      {
        type: "confirm",
        name: "confirm",
        message: "Confirm deletion?",
      },
    ])
    .then(function (ans) {
      if (ans.confirm) {
        delete config[ans.course];
        fs.writeFileSync(configFilePath, JSON.stringify(config));
        console.log("the course was successfully removed 👌");
      }
    });
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
