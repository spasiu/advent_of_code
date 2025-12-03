import fs from 'fs';

const head = Node(0);
const last = new Array(99).fill(1).map((n, i) => n + i).reduce((tail, n) => tail.add(n), head);
let dial = last.link(head);
let count = 0;
turn('L', 49);

fs.readFileSync('./2025_12_01_input.txt', 'utf8')
    .split('\n')
    .map(instruction => ({
        direction: instruction[0],
        clicks: parseInt(instruction.slice(1))
    }))
    .forEach(({ direction, clicks }) => turn(direction, clicks));

console.log(count);

function Node(value, prev=null, next=null) {
    const node = {
        prev, next, value,
        add: value => {
            node.next = Node(value, node);
            return node.next;
        },
        link: head => {
            node.next = head;
            head.prev = node;
            return node;
        }
    };
    
    return node
}

function turn(direction, clicks) {
    if (clicks === 0) return;
    if (direction === 'L') dial = dial.prev;
    if (direction === 'R') dial = dial.next;
    if (dial.value === 0) count++;
    return turn(direction, clicks - 1);
}
