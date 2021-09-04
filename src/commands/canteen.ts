/* eslint-disable arrow-parens */
import { Command, flags } from "@oclif/command";
import * as https from "https";
import * as cheerio from "cheerio";
import cli from "cli-ux";
import chalk = require("chalk");

const baseURL = "https://itustudent.itu.dk/Campus-Life/Student-Life/";
const canteenPageURL =
  "https://itustudent.itu.dk/Campus-Life/Student-Life/Canteen";

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
    const menuFilePDF = cheerio
      .load(html)("aside[aria-label='This weeks menu'] > a")
      .attr("href");
    const url = baseURL + menuFilePDF;
    console.log("Opening " + url);
    cli.open(url);
  });
};

const printOpeningHours = () => {
  console.log(chalk.cyan("---------------------"));
  console.log(chalk.cyan("Canteen opening hours"));
  console.log(chalk.cyan("Monday: 07:45 - 18:00"));
  console.log(chalk.cyan("Friday: 07:45 - 16:00"));
  console.log(chalk.cyan("---------------------"));
};

export default class Canteen extends Command {
  static aliases = ["lunch"];

  static description = "Get the menu and opening hours of ITU's canteen";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [{ name: "action", options: ["menu", "hours"] }];

  async run(): Promise<void> {
    const { args } = this.parse(Canteen);
    if (args.action === "menu") {
      openMenuPDF();
    } else if (args.action === "hours") {
      printOpeningHours();
    }
  }
}
