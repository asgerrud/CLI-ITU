/* eslint-disable arrow-parens */
import { Command, flags } from "@oclif/command";
import * as https from "https";
import * as cheerio from "cheerio";
import cli from "cli-ux";
import chalk = require("chalk");

const baseURL = "https://billboard.itu.dk/";
const canteenPageURL = "https://billboard.itu.dk/canteen-menu";

const fetch = (url: any) =>
  new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const dataBuffers: any[] = [];
        res.on("data", (data) => dataBuffers.push(data.toString("utf8")));
        res.on("end", () => resolve(dataBuffers.join("")));
      })
      .on("error", reject);
  });

const openMenuPDF = () => {
  fetch(canteenPageURL).then((html: any) => {
    const menuFilePDF = cheerio.load(html)(".canteen > img:last-of-type").attr("src");
    const url = baseURL + menuFilePDF;
    process.stdout.write("Opening latest menu");
    cli.open(url);
  });
};

const printOpeningHours = () => {
  console.log(chalk.cyan("----------------------"));
  console.log(chalk.cyan("Canteen opening hours"));
  console.log(chalk.cyan("Mon-Fri: 07:45 - 15:00"));
  console.log(chalk.cyan("Lunch:   11:15 - 14:00"));
  console.log(chalk.cyan("----------------------"));
};

export default class Canteen extends Command {
  static aliases = ["lunch"];

  static description = "Get the menu and opening hours of ITU's canteen";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [
    {
      name: "action",
      options: ["menu", "hours"],
      default: "menu",
      description: `
      menu:  fetches the most recently uploaded lunch menu (not always up-to-date)
      hours: get the opening hours`,
    },
  ];

  async run(): Promise<void> {
    const { args } = this.parse(Canteen);
    if (args.action === "menu") {
      openMenuPDF();
    } else if (args.action === "hours") {
      printOpeningHours();
    }
  }
}
