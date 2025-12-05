import fs from 'fs';
import assert from 'assert';

let ranges = fs.readFileSync('./2025_12_05_test.txt', 'utf8')
    .split('\n\n')
    .slice(0, 1)
    .pop()
    .split('\n')
    .map(range => range.split('-').map(n => parseInt(n)))
    .map(([start, end]) => ({
        start, end
    }));


function getOverlap([range1, range2]) {
    if (!range2) return [range1];
    const { start: r1start, end: r1end } = range1;
    const { start: r2start, end: r2end } = range2;
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

function pair(input) {
    const list = [...input];
    const pairs = [];
    let buffer = [];
    while (list.length > 0) {
        buffer.push(list.shift());
        if (buffer.length == 2 || list.length == 0) {
            pairs.push(buffer);
            buffer = [];
        }
    }
    return pairs;
}

function getOverlaps(ranges) {
    const consolidated = pair(ranges).map(getOverlap).flat();
    console.log({ ranges, consolidated })
    if (JSON.stringify(ranges) == JSON.stringify(consolidated)) return consolidated;
    return getOverlaps(consolidated);
}

console.log(getOverlaps(ranges));

// TESTS
assert(JSON.stringify(getOverlap([{ start: 12, end: 20 }])) === '[{"start":12,"end":20}]');
// assert(JSON.stringify(getOverlap({ start: 12, end: 18 }, { start: 12, end: 20 })) === '[{"start":12,"end":20}]');
// assert(JSON.stringify(getOverlap({ start: 14, end: 20 }, { start: 12, end: 20 })) === '[{"start":12,"end":20}]');
// assert(JSON.stringify(getOverlap({ start: 12, end: 20 }, { start: 12, end: 20 })) === '[{"start":12,"end":20}]');
// assert(JSON.stringify(getOverlap({ start: 12, end: 20 }, { start: 10, end: 18 })) === '[{"start":10,"end":20}]');
// assert(JSON.stringify(getOverlap({ start: 4, end: 8 }, { start: 12, end: 20 })) === '[{"start":4,"end":8},{"start":12,"end":20}]');
// assert(JSON.stringify(getOverlap({ start: 12, end: 20 }, { start: 4, end: 8 })) === '[{"start":12,"end":20},{"start":4,"end":8}]');
