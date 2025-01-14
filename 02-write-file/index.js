const fs = require('fs');
const path = require('path');
const stdin = process.stdin;
const stdout = process.stdout;
const exit = process.exit;

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'), { encoding: 'utf-8' });

stdout.write('Welcome! Enter your text. If you want to go out, enter exit or press Ctrl+C\n');

stdin.on('data', (data) => {
    const input = data.toString().trim();
    if (input === 'exit') return farewell();
    output.write(input + '\n');
});

process.on('SIGINT', farewell);
process.on('exit', () => stdout.write('Goodbye, have a nice day!\n'));

function farewell() {
  stdout.write('> Completed <\n');
  output.end();
  exit();
}