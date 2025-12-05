import fs from 'fs';

const [freshness, inventory] = fs.readFileSync('./2025_12_05_input.txt', 'utf8')
    .split('\n\n');

const freshRanges = freshness
    .split('\n')
    .map(range => range.split('-').map(n => parseInt(n)))
    .map(([start, end]) => ({
        start, end
    }));

const inventoryIds = inventory
    .split('\n')
    .map(n => parseInt(n));

let count = 0;

for (const id of inventoryIds) {
    for (const { start, end } of freshRanges) {
        if (id >= start && id <= end) {
            count++;
            break;
        }
    }
}

console.log({ count });