import fs from 'fs';

const output = fs.readFileSync('./2025_12_03_input.txt', 'utf8')
    .split('\n')
    .map(bank => bank.split(''))
    .map(chars => chars.map(char => parseInt(char)))
    .map(digits => parseInt(find(digits)))
    .reduce((a, b) => a + b);

console.log(output);


function find(ns, stem=[]) {
    while (stem.length < 12) {
        const space = ns.slice(0, getIndexOfLimit(stem, ns));
        const index = getIndexOfGreatest(space);
        stem.push(ns[index])
        ns = ns.slice(index + 1);
    }
    return stem.join('');
}

function getIndexOfLimit(stem, ns) {
    return ns.length - (11 - stem.length);
}

function getIndexOfGreatest(ns){
    let greatest = ns[0];
    let index = 0;
    for (let i = 1; i < ns.length; i++) {
        if (ns[i] > greatest) {
            greatest = ns[i];
            index = i;
        }
    }
    return index;
}
