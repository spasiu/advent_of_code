import fs from 'fs';

const n = fs.readFileSync('./2025_12_03_input.txt', 'utf8')
    .split('\n')
    .map(bank => bank.split(''))
    .map(digits => {
        const combos = [];
        for (let i = 0; i < digits.length; i++) {
            for (let j = i + 1; j < digits.length; j++) {
                combos.push(parseInt(digits[i] + digits[j]))
            }
        }

        return Math.max(...combos);
    })
    .reduce((a, b) => a + b);

    console.log(n);