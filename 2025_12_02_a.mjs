import fs from 'fs';

const ranges = fs.readFileSync('./2025_12_02_input.txt', 'utf8')
    .split(',')
    .map(range => range.split('-'))
    .map(([start, finish]) => ({ start: parseInt(start), finish: parseInt(finish) }))
    .map(({ start, finish }) => new Array(finish - start + 1).fill(start).map((n, i) => n + i));

const invalidIds = [];

for (const range of ranges) {
    for (const n of range) {
        const number = n.toString();
        if (number.length % 2 == 0) {
            const half = number.length / 2;
            const n1 = number.slice(0, half);
            const n2 = number.slice(half);
            if (n1 == n2) invalidIds.push(n);
        }
    }
}

console.log(invalidIds.reduce((a, b) => a + b));
