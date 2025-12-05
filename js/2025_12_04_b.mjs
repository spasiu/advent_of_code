import fs from 'fs';

const rows = fs.readFileSync('./2025_12_04_input.txt', 'utf8')
    .split('\n')
    .map(row => row.split(''));

let count = 1;
let total = 0;

while (count > 0) {
    count = 0;
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            if (rows[i][j] != '@') continue;

            const adjacent = [
                rows[i - 1]?.[j - 1] == '@',
                rows[i - 1]?.[j] == '@',
                rows[i - 1]?.[j + 1] == '@',
                rows[i][j - 1] == '@',
                rows[i][j + 1] == '@',
                rows[i + 1]?.[j - 1] == '@',
                rows[i + 1]?.[j] == '@',
                rows[i + 1]?.[j + 1] == '@'
            ]
                .filter(x => x)
                .length;

            if (adjacent < 4) {
                rows[i][j] = 'x';
                count++;
            }
        }
    }
    total += count;
}

console.log(rows.map(row => row.join('')).join('\n'));
console.log({total});
