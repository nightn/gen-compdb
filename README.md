# gen-compdb
A command line tool for generating compilation database (compile_commands.json)

## Install

```sh
npm i -g gen-compdb
```

## Usage

```sh
Usage: gen-compdb [options]

Generate compile_commands.json

Example:
> gen-compdb -d /my/project/dir -o "-I. -Ih -I/xxlib/include -c --save-temps" foo.c bar.c
# This command will generate compile_commands.json containing the following lines:
[
  {
    "directory": "/my/project/dir",
    "command": "gcc -I. -Ih -I/xxlib/include -c --save-temps foo.c",
    "file": "foo.c"
  },
  {
    "directory": "/my/project/dir",
    "command": "gcc -I. -Ih -I/xxlib/include -c --save-temps bar.c",
    "file": "bar.c"
  }
]

Options:
  -V, --version              output the version number
  -d, --dir <dir>            specify build dir
  -o, --opt <options>        specify compilation options
  -c, --compiler <compiler>  pecify compiler, default: gcc
  --debug                    print debug log
  -h, --help                 display help for command
```

