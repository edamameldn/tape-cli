# tape-cli

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/tape-cli.svg)](https://npmjs.org/package/tape-cli)
[![Downloads/week](https://img.shields.io/npm/dw/tape-cli.svg)](https://npmjs.org/package/tape-cli)
[![License](https://img.shields.io/npm/l/rec.svg)](https://github.com/edamameldn/tape-cli/blob/master/package.json)

<!-- toc -->

- [tape-cli](#tape-cli)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g tape-cli
$ tape COMMAND
running command...
$ tape (-v|--version|version)
tape-cli/0.1.2 darwin-x64 node-v14.0.0
$ tape --help [COMMAND]
USAGE
  $ tape COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`tape config [NAME]`](#tape-config-name)
- [`tape devices`](#tape-devices)
- [`tape help [COMMAND]`](#tape-help-command)
- [`tape image`](#tape-image)
- [`tape video`](#tape-video)

## `tape config [NAME]`

Configuration

```
USAGE
  $ tape config [NAME]

OPTIONS
  -h, --help   show CLI help
  -s, --setup

EXAMPLE
  $ tape config
```

_See code: [src/commands/config.ts](https://github.com/edamameldn/tape-cli/blob/v0.1.2/src/commands/config.ts)_

## `tape devices`

List devices

```
USAGE
  $ tape devices

OPTIONS
  -c, --clear
  -h, --help   show CLI help

EXAMPLE
  $ tape devices
```

_See code: [src/commands/devices.ts](https://github.com/edamameldn/tape-cli/blob/v0.1.2/src/commands/devices.ts)_

## `tape help [COMMAND]`

display help for tape

```
USAGE
  $ tape help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `tape image`

Take screenshots of iOS/Android devices/simulators

```
USAGE
  $ tape image

OPTIONS
  -d, --debug
  -h, --help   show CLI help
  -l, --local

EXAMPLE
  $ tape image
  🎉 Screenshot uploaded. Copied URL to clipboard 🔖 ! ->
    https://example.com/image.png
```

_See code: [src/commands/image.ts](https://github.com/edamameldn/tape-cli/blob/v0.1.2/src/commands/image.ts)_

## `tape video`

Record iOS/Android devices/simulators

```
USAGE
  $ tape video

OPTIONS
  -d, --debug
  -g, --gif
  -h, --help   show CLI help
  -l, --local
  -v, --video
  --hq

EXAMPLE
  $ tape video [--hq | --gif | --local $OUTPUTPATH]
  🎬 Recording started. Press SPACE to save or ESC to abort.
```

_See code: [src/commands/video.ts](https://github.com/edamameldn/tape-cli/blob/v0.1.2/src/commands/video.ts)_

<!-- commandsstop -->
