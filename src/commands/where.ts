import { Command, flags } from "@oclif/command";
import chalk = require("chalk");

const stories: string[] = ["0nd", "1st", "2nd", "3rd", "4th", "5th"];

const roomLocation = (story: number, directions: string): string => {
  return stories[story] + " story\n" + directions;
};

enum directions {
  BWing = "side: canal\nend: KUA",
  CWing = "side: parking lot\nend: KUA",
  EWing = "side: canal\nend: DR side",
  DWing = "side: parking lot\nend: DR",
  east = "side: parking lot",
  west = "side: canal",
}

const rooms: { [key: string]: string } = {
  // Wings
  B: directions.BWing,
  C: directions.CWing,
  D: directions.DWing,
  E: directions.EWing,
  // Auditoriums
  AUD0: roomLocation(0, directions.east),
  AUD1: roomLocation(0, directions.west),
  AUD2: roomLocation(0, directions.east),
  AUD3: roomLocation(2, directions.east),
  AUD4: roomLocation(4, directions.east),
  // Skyboxes
  "2A01": roomLocation(2, directions.west),
  "2A03": roomLocation(2, directions.west),
  "2A05": roomLocation(2, directions.east),
  "2A07": roomLocation(2, directions.east),
  "3A01": roomLocation(3, directions.west),
  "3A03": roomLocation(3, directions.west),
  "3A05": roomLocation(3, directions.east),
  "3A07": roomLocation(3, directions.east),
  "4A01": roomLocation(4, directions.west),
  "4A03": roomLocation(4, directions.west),
  "4A05": roomLocation(4, directions.east),
  "4A07": roomLocation(4, directions.east),
  "4A09": roomLocation(4, directions.east),
  "5A01": roomLocation(5, directions.west),
  "5A03": roomLocation(5, directions.west),
  "5A05": roomLocation(5, directions.east),
  "5A07": roomLocation(5, directions.east),
  "5A09": roomLocation(5, directions.east),
  // regular rooms: 2nd
  "2A08": roomLocation(2, directions.BWing),
  "2A12": roomLocation(2, directions.west),
  "2A14": roomLocation(2, directions.west),
  "2A18": roomLocation(2, directions.west),
  "2A20": roomLocation(2, directions.west),
  "2A28": roomLocation(2, directions.EWing),
  "2A30": roomLocation(2, directions.EWing),
  "2A40": roomLocation(2, directions.DWing),
  "2A42": roomLocation(2, directions.DWing),
  "2A52": roomLocation(2, directions.east),
  "2A54": roomLocation(2, directions.east),
  "2A58": roomLocation(2, directions.CWing),
  "2A60": roomLocation(2, directions.CWing),
  // regular rooms: 3rd
  "3A08": roomLocation(3, directions.BWing),
  "3A12": roomLocation(3, directions.west),
  "3A14": roomLocation(3, directions.west),
  "3A18": roomLocation(3, directions.west),
  "3A20": roomLocation(3, directions.west),
  "3A28": roomLocation(3, directions.EWing),
  "3A30": roomLocation(3, directions.EWing),
  "3A40": roomLocation(3, directions.DWing),
  "3A42": roomLocation(3, directions.DWing),
  "3A52": roomLocation(3, directions.east),
  "3A58": roomLocation(3, directions.CWing),
  "3A60": roomLocation(3, directions.CWing),
  // regular rooms: 4th
  "4A08": roomLocation(4, directions.BWing),
  "4A10": roomLocation(4, directions.BWing),
  "4A14": roomLocation(4, directions.west),
  "4A16": roomLocation(4, directions.west),
  "4A20": roomLocation(4, directions.west),
  "4A22": roomLocation(4, directions.west),
  "4A30": roomLocation(4, directions.EWing),
  "4A32": roomLocation(4, directions.EWing),
  "4A34": roomLocation(4, directions.EWing),
  "4A44": roomLocation(4, directions.DWing),
  "4A46": roomLocation(4, directions.DWing),
  "4A62": roomLocation(4, directions.CWing),
  "4A64": roomLocation(4, directions.CWing),
  // regular rooms: 5th
  "5A08": roomLocation(5, directions.BWing),
  "5A10": roomLocation(5, directions.BWing),
  "5A14": roomLocation(5, directions.west),
  "5A16": roomLocation(5, directions.west),
  "5A20": roomLocation(5, directions.west),
  "5A22": roomLocation(5, directions.west),
  "5A30": roomLocation(5, directions.EWing),
  "5A32": roomLocation(5, directions.EWing),
  "5A34": roomLocation(5, directions.EWing),
  "5A40": roomLocation(5, directions.DWing),
  "5A42": roomLocation(5, directions.DWing),
  "5A62": roomLocation(5, directions.CWing),
  "5A64": roomLocation(5, directions.CWing),
  // Departments and organisations
  SAP: roomLocation(2, directions.EWing),
  studentadvisors: roomLocation(2, directions.DWing), // 2A40 and 2A42
  IT: roomLocation(2, directions.CWing),
  analog: roomLocation(0, directions.BWing),
  scrollbar: roomLocation(0, directions.EWing),
  canteen: roomLocation(0, directions.DWing),
  // Labs
  AIR: roomLocation(0, directions.west),
  BUILD: roomLocation(5, directions.east),
  DASYA: roomLocation(5, directions.east),
  ETHOS: roomLocation(3, directions.EWing),
  IXD: roomLocation(5, directions.east),
  // REAL: ""
  // STUDY: ""
  // GAME: ""
};

export default class Where extends Command {
  static aliases = ["w", "whereis"];

  static description = `Find the location of auditoriums, labs, departments and class rooms - on the first try
    Tells which side the room is facing
    `;

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [
    {
      name: "roomName",
      required: true,
      description:
        "The following arguments are accepted: \nAuditoriums: (AUD0|AUD1|AUD2|AUD3|AUD4) \nDepartments: (SAP|studentadvisors|IT|analog|scrollbar|canteen) \nLabs: (AIR|BUILD|ETHOS|IXD) \nRooms: (2A08|2A12|...|5A64) \nWings: (B|C|D|E)",
    },
  ];

  async run(): Promise<void> {
    const { args } = this.parse(Where);

    const roomDirection = rooms[`${args.roomName}`];
    if (roomDirection === undefined) {
      console.log(
        "❌ The room has not been defined. If you believe this is an error, please use `$ itu feedback` to submit an issue"
      );
    } else {
      console.log(chalk.cyan("-----------------"));
      console.log(chalk.cyan(roomDirection));
      console.log(chalk.cyan("-----------------"));
    }
  }
}
