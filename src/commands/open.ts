import { Command, flags } from "@oclif/command";
import cli from "cli-ux";

export default class Open extends Command {
  static aliases = ["o"];

  static description = "open an ITU platform";

  static examples = ["$ itu open learnit", "$ itu open timeedit"];

  platforms: { [key: string]: string } = {
    learnit: "https://learnit.itu.dk/",
    student: "https://itustudent.itu.dk/",
    timeedit: "https://cloud.timeedit.net/itu/web/public/",
    mystudyactivities: "https://minestudieaktiviteter.itu.dk/",
    itu: "https://itu.dk",
    github: "https://github.itu.dk/login",
    kattis: "https://itu.kattis.com/",
  };

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [
    {
      name: "Platform",
      required: true,
      description: "ITU platform to open",
      default: "learnit",
      options: [
        "learnit",
        "student",
        "timeedit",
        "mystudyactivities",
        "itu",
        "github",
        "kattis",
      ],
    },
  ];

  async run(): Promise<void> {
    const { args } = this.parse(Open);
    const url: string = this.platforms[args.Platform];

    this.log(`Opening ${url} in default web browser`);
    await cli.open(url);
  }

  async catch(error: Error): Promise<void> {
    throw error;
  }
}
