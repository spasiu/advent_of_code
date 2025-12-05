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
        const half = number.length / 2;
        for (let i = 1; i <= half; i++) {
            const chunks = chunk(number, i);
            if (new Set(chunks).size == 1) {
                invalidIds.push(n);
                break;
            }
        }
    }
}

console.log(invalidIds.reduce((a, b) => a + b));

function chunk(list, size) {
    const chunks = [];
    let current = '';
    for (const item of list) {
        current += item;
        if (current.length == size) {
            chunks.push(current);
            current = '';
        }
    }

    if (current.length > 0) chunks.push(current);
    return chunks;
}