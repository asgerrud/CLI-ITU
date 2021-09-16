# CLI-ITU

A CLI for all things ITU related

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cli-itu.svg)](https://npmjs.org/package/cli-itu)
[![Downloads/week](https://img.shields.io/npm/dw/cli-itu.svg)](https://npmjs.org/package/cli-itu)
[![License](https://img.shields.io/npm/l/cli-itu.svg)](https://github.com/AsgereDreemurr/CLI-ITU/blob/main/package.json)

<!-- toc -->
* [CLI-ITU](#cli-itu)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g cli-itu
$ itu COMMAND
running command...
$ itu (-v|--version|version)
cli-itu/0.0.0-development win32-x64 node-v14.17.6
$ itu --help [COMMAND]
USAGE
  $ itu COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`itu canteen [ACTION]`](#itu-canteen-action)
* [`itu commands`](#itu-commands)
* [`itu feedback`](#itu-feedback)
* [`itu help [COMMAND]`](#itu-help-command)
* [`itu kattis ACTION PROBLEM_ID`](#itu-kattis-action-problem_id)
* [`itu learnit [COURSE]`](#itu-learnit-course)
* [`itu open PLATFORM`](#itu-open-platform)
* [`itu update [CHANNEL]`](#itu-update-channel)
* [`itu where ROOMNAME`](#itu-where-roomname)

## `itu canteen [ACTION]`

get the menu and opening hours of ITU's canteen

```
USAGE
  $ itu canteen [ACTION]

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ itu lunch
```

_See code: [src/commands/canteen.ts](https://github.com/AsgereDreemurr/CLI-ITU/blob/v0.0.0-development/src/commands/canteen.ts)_

## `itu commands`

list all the commands

```
USAGE
  $ itu commands

OPTIONS
  -h, --help              show CLI help
  -j, --json              display unfiltered api data in json format
  -x, --extended          show extra columns
  --columns=columns       only show provided columns (comma-separated)
  --csv                   output is csv format [alias: --output=csv]
  --filter=filter         filter property by partial string matching, ex: name=foo
  --hidden                show hidden commands
  --no-header             hide table header from output
  --no-truncate           do not truncate output to fit screen
  --output=csv|json|yaml  output in a more machine friendly format
  --sort=sort             property to sort by (prepend '-' for descending)
```

_See code: [@oclif/plugin-commands](https://github.com/oclif/plugin-commands/blob/v1.3.0/src/commands/commands.ts)_

## `itu feedback`

report a bug or suggest an issue to improve the CLI. 

```
USAGE
  $ itu feedback

OPTIONS
  -h, --help      show CLI help
  -n, --noprompt  turn off the issue prompt and open the issues page for the CLI instead

DESCRIPTION
  Requires Github CLI installed to create the issue. To manually submit, use the --noprompt flag.
```

_See code: [src/commands/feedback.ts](https://github.com/AsgereDreemurr/CLI-ITU/blob/v0.0.0-development/src/commands/feedback.ts)_

## `itu help [COMMAND]`

display help for itu

```
USAGE
  $ itu help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_

## `itu kattis ACTION PROBLEM_ID`

fetch: downloads sample data files to directory. WARNING: the program will overwrite existing data files of the same name.

```
USAGE
  $ itu kattis ACTION PROBLEM_ID

OPTIONS
  -h, --help  show CLI help

DESCRIPTION
  fetch: downloads sample data files to directory. WARNING: the program will overwrite existing data files of the same 
  name.
```

_See code: [src/commands/kattis.ts](https://github.com/AsgereDreemurr/CLI-ITU/blob/v0.0.0-development/src/commands/kattis.ts)_

## `itu learnit [COURSE]`

open a course's LearnIT page directly from your terminal.

```
USAGE
  $ itu learnit [COURSE]

ARGUMENTS
  COURSE  the name of the course to open in LearnIT. Supports fuzzy searching

OPTIONS
  -a, --add     add a course to the config file
  -d, --delete  remove a course from the config file
  -e, --edit    edit a course from the config file
  -h, --help    show CLI help
  -i, --init    initialize the config file
  -r, --reset   reset the config file

DESCRIPTION
  CONFIG
     for a course page to be openable, it must first be added to the config file.

     generate config   $ itu learnit --init
     add a course      $ itu learnit --add
     edit a course     $ itu learnit --edit
     remove a course   $ itu learnit --edit

     to find the course id:
     - open the LearnIT page
     - locate the number in the end of the URL

     Example: https://learnit.itu.dk/course/view.php?id=3020335 -> 3020335

ALIASES
  $ itu l

EXAMPLES
  $ itu learnit security
  $ itu learnit 'Applied Algorithms' 
  $ itu l discrete

  $ itu learnit -init
  $ itu learnit -reset
  $ itu learnit -add
```

_See code: [src/commands/learnit.ts](https://github.com/AsgereDreemurr/CLI-ITU/blob/v0.0.0-development/src/commands/learnit.ts)_

## `itu open PLATFORM`

open an ITU platform

```
USAGE
  $ itu open PLATFORM

ARGUMENTS
  PLATFORM  (learnit|student|timeedit|mystudyactivities|itu|github|kattis) [default: learnit] ITU platform to open

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ itu o

EXAMPLES
  $ itu open learnit
  $ itu open timeedit
```

_See code: [src/commands/open.ts](https://github.com/AsgereDreemurr/CLI-ITU/blob/v0.0.0-development/src/commands/open.ts)_

## `itu update [CHANNEL]`

update the itu CLI

```
USAGE
  $ itu update [CHANNEL]

OPTIONS
  --from-local  interactively choose an already installed version
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.5.0/src/commands/update.ts)_

## `itu where ROOMNAME`

find the location of auditoriums, labs, departments and class rooms - on the first try

```
USAGE
  $ itu where ROOMNAME

ARGUMENTS
  ROOMNAME
      the following arguments are accepted: 
      Auditoriums: (AUD0|AUD1|AUD2|AUD3|AUD4) 
      Departments: (SAP|studentadvisors|IT|analog|scrollbar|canteen) 
      Labs: (AIR|BUILD|ETHOS|IXD) 
      Rooms: (2A08|2A12|...|5A64) 
      Wings: (B|C|D|E)

OPTIONS
  -h, --help  show CLI help

DESCRIPTION
  Tells which side the room is facing

ALIASES
  $ itu w
  $ itu whereis
```

_See code: [src/commands/where.ts](https://github.com/AsgereDreemurr/CLI-ITU/blob/v0.0.0-development/src/commands/where.ts)_
<!-- commandsstop -->
