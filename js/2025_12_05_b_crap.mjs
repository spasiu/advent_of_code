import fs from 'fs';

let ranges = fs.readFileSync('./2025_12_05_input.txt', 'utf8')
    .split('\n\n')
    .slice(0, 1)
    .pop()
    .split('\n')
    .map(range => range.split('-').map(n => parseInt(n)))
    .map(([start, end]) => ({
        start, end
    }));

while (true) {
    const length = ranges.length;
    const consolidated = [];
    while (ranges.length > 0) {
        let { start, end } = ranges[0];
        let j = 0;
        while (j < ranges.length) {
            if (ranges[j].start >= start && ranges[j].start <= end) {
                if (ranges[j].end > end) end = ranges[j].end;
                ranges = ranges.slice(0, j).concat(ranges.slice(j + 1));
            } else {
                j++;
            }
        }
        consolidated.push({ start, end });
    }
    if (length == consolidated.length) {
        ranges = consolidated;
        break;
    }
    ranges = consolidated;
}

let count = 0;

for (const { start, end } of ranges) {
    count += end + 1 - start;
}

console.log({ count });

for (const { start, end} of ranges) {
    console.log(`${start} - ${end}: ${end + 1 - start}`);
}
