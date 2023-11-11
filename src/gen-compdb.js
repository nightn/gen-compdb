#!/usr/bin/env node

const fs = require('fs');
const { Command } = require('commander');
const { exit } = require('process');
const program = new Command();
const jsonFormat = require('json-format');
const jsonConfig = {
  type: 'space',
  size: 2
}

const name = 'gen-compdb';
const version = '1.0.0';
const examples = [
  `> ${name} -d /my/project/dir -o "-I. -Ih -I/xxlib/include -c --save-temps" foo.c bar.c`,
  `# This command will generate compile_commands.json containing the following lines:`,
  `[`,
  `  {`,
  `    "directory": "/my/project/dir",`,
  `    "command": "gcc -I. -Ih -I/xxlib/include -c --save-temps foo.c",`,
  `    "file": "foo.c"`,
  `  },`,
  `  {`,
  `    "directory": "/my/project/dir",`,
  `    "command": "gcc -I. -Ih -I/xxlib/include -c --save-temps bar.c",`,
  `    "file": "bar.c"`,
  `  }`,
  `]`,

];

const output = 'compile_commands.json';
const defaultCompiler = 'gcc';
let dbg = false;

function error(msg) {
  console.log(`[error] ${msg}`);
  exit(1);
}

function debug(msg) {
  if (!dbg) {
    return;
  }
  console.log(msg);
}

function main() {
  program.name(name).version(version);
  program.description(`Generate ${output}\n\nExample:\n${examples.join('\n')}`);
  program.requiredOption('-d, --dir <dir>', 'specify build dir');
  program.requiredOption('-o, --opt <options>', 'specify compilation options');
  program.option('-c, --compiler <compiler>', `pecify compiler, default: ${defaultCompiler}`);
  program.option('--debug', 'print debug log');

  program.parse();
  const opts = program.opts();
  dbg = opts.debug || false;
  const files = program.args;
  const compiler = opts.compiler || defaultCompiler;
  const inputOptions = opts.opt;
  if (files.length === 0) {
    error('no input files');
  }
  debug(opts);
  const arr = [];
  for (const file of files) {
    const cmd = `${compiler} ${inputOptions} ${file}`;
    const item = {
      directory: opts.dir,
      command: cmd,
      file: file,
    };
    arr.push(item);
  }
  fs.writeFileSync(output, jsonFormat(arr, jsonConfig));
  console.log(`${output} generated!`);
}

main();

