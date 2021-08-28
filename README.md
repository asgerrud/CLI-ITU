# CLItu

A CLI for all things ITU related

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/CLItu.svg)](https://npmjs.org/package/CLItu)
[![Downloads/week](https://img.shields.io/npm/dw/CLItu.svg)](https://npmjs.org/package/CLItu)
[![License](https://img.shields.io/npm/l/CLItu.svg)](https://github.com/AsgereDreemurr/CLItu/blob/master/package.json)

<!-- toc -->

- [CLItu](#clitu)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g CLItu
$ itu COMMAND
running command...
$ itu (-v|--version|version)
CLItu/0.0.0-development win32-x64 node-v10.16.3
$ itu --help [COMMAND]
USAGE
  $ itu COMMAND
...
```

<!-- usagestop -->

```sh-session
$ npm install -g CLItu
$ itu COMMAND
running command...
$ itu (-v|--version|version)
CLItu/0.0.0 linux-x64 node-v16.6.2
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

## `itu java FILEPATH [MAINCLASS]`

run the specified Java program.

```
USAGE
  $ itu java FILEPATH [MAINCLASS]

ARGUMENTS
  FILEPATH   The file path of the Java file

  MAINCLASS  Specify the main class.
             Leave blank, if the main class has the same name as the .java file

OPTIONS
  -c, --compile      Compile before running the program
  -h, --help         show CLI help
  -i, --input=input  Input file to redirect
  -t, --time         Measure the time to execute the program

EXAMPLES
  $ itu java MyClass.java
  $ itu java DisjointSets.java -c -t
  $ itu java MyClass.java AnotherClass -i='./input/1.in'
```

_See code: [src/commands/java.ts](https://github.com/AsgereDreemurr/CLItu/blob/v0.0.0/src/commands/java.ts)_

## `itu open PLATFORM`

open an ITU platform

```
USAGE
  $ itu open PLATFORM

ARGUMENTS
  PLATFORM  (learnit|student|timeedit|mystudyactivities|itu) [default: learnit] ITU platform to open

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ itu o

EXAMPLES
  $ itu open learnit
  $ itu open timeedit
```

_See code: [src/commands/open.ts](https://github.com/AsgereDreemurr/CLItu/blob/v0.0.0/src/commands/open.ts)_

## `itu test [FILE]`

test your Java program against a series of sample data files

```
USAGE
  $ itu test [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/test.ts](https://github.com/AsgereDreemurr/CLItu/blob/v0.0.0/src/commands/test.ts)_

<!-- commandsstop -->
