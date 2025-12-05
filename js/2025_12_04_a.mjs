import fs from 'fs';

const rows = fs.readFileSync('./2025_12_04_input.txt', 'utf8').split('\n');
let count = 0;

for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
        const stored = rows[i][j];
        if (stored != '@') continue;

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
        
        if (adjacent < 4) count++;
    }
}

console.log({count});
