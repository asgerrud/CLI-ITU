# CLItu

A CLI for all things ITU related

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cli-itu.svg)](https://npmjs.org/package/cli-itu)
[![Downloads/week](https://img.shields.io/npm/dw/cli-itu.svg)](https://npmjs.org/package/cli-itu)
[![License](https://img.shields.io/npm/l/cli-itu.svg)](https://github.com/AsgereDreemurr/CLI-ITU/blob/main/package.json)

<!-- toc -->

- [CLItu](#clitu)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g CLI-ITU
$ itu COMMAND
running command...
$ itu (-v|--version|version)
CLI-ITU/0.0.0-development linux-x64 node-v10.19.0
$ itu --help [COMMAND]
USAGE
  $ itu COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`itu help [COMMAND]`](#itu-help-command)
- [`itu java FILENAME [MAINCLASS]`](#itu-java-filename-mainclass)
- [`itu kattis ACTION PROBLEM_ID`](#itu-kattis-action-problem_id)
- [`itu lol`](#itu-lol)
- [`itu open PLATFORM`](#itu-open-platform)
- [`itu test CLASSNAME [DIRECTORY]`](#itu-test-classname-directory)

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

## `itu java FILENAME [MAINCLASS]`

run the specified Java program.

```
USAGE
  $ itu java FILENAME [MAINCLASS]

ARGUMENTS
  FILENAME   The name of the Java file

  MAINCLASS  Specify the main class.
             Leave blank, if the main class has the same name as the .java file

OPTIONS
  -d, --dir=dir      Define the directory of the java file
  -h, --help         show CLI help
  -i, --input=input  Input file to redirect
  -n, --nocompile    Run the program without compiling the file first
  -t, --time         Measure the time to execute the program

EXAMPLES
  $ itu java MyClass.java
  $ itu java DisjointSets.java -n -t
  $ itu java MyClass.java AnotherClass -i='./input/1.in'
```

_See code: [src/commands/java.ts](https://github.com/AsgereDreemurr/CLI-ITU/blob/v0.0.0-development/src/commands/java.ts)_

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

## `itu lol`

```
USAGE
  $ itu lol
```

_See code: [src/commands/lol.ts](https://github.com/AsgereDreemurr/CLI-ITU/blob/v0.0.0-development/src/commands/lol.ts)_

## `itu open PLATFORM`

open an ITU platform

```
USAGE
  $ itu open PLATFORM

ARGUMENTS
  PLATFORM  (learnit|student|timeedit|mystudyactivities|itu|github) [default: learnit] ITU platform to open

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ itu o

EXAMPLES
  $ itu open learnit
  $ itu open timeedit
```

_See code: [src/commands/open.ts](https://github.com/AsgereDreemurr/CLI-ITU/blob/v0.0.0-development/src/commands/open.ts)_

## `itu test CLASSNAME [DIRECTORY]`

test your Java program against a series of sample data files

```
USAGE
  $ itu test CLASSNAME [DIRECTORY]

ARGUMENTS
  CLASSNAME
  DIRECTORY  The directory containing the input (.in) and answer (.ans) files

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/test.ts](https://github.com/AsgereDreemurr/CLI-ITU/blob/v0.0.0-development/src/commands/test.ts)_

<!-- commandsstop -->
