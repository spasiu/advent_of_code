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

function getOverlap(r1, r2) {
    if (!r2) return [r1];
    const { start: r1start, end: r1end } = r1
    const { start: r2start, end: r2end } = r2;
    if (r2start >= r1start && r2start <= r1end) {
        if (r2end < r1end) return [{ start: r1start, end: r1end }];
        return [{ start: r1start, end: r2end }];
    }

    if (r1start >= r2start && r1start <= r2end) {
        if (r1end < r2end) return [{ start: r2start, end: r2end }];
        return [{ start: r2start, end: r1end }];
    }

    return [{ start: r1start, end: r1end }, { start: r2start, end: r2end }];
}

function getOverlaps(ranges, index = 0) {
    if (index == ranges.length) return ranges.filter(x => x);
    let check = ranges[index];
    if (!check) return getOverlaps(ranges, index + 1);
    const consolidated = ranges.map(range => {
        const [r1, r2] = getOverlap(check, range);
        if (r2) return r2;
        check = r1;
        return null;
    });

    consolidated[index] = check;

    return getOverlaps(consolidated, index + 1);
}

const it1 = getOverlaps(ranges);
const it2 = getOverlaps(it1);

console.log(it2.map(({ start, end }) => end + 1 - start).reduce((a, b) => a + b));
