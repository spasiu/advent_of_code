import fs from 'fs';

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

const turnLeft = (dial, clicks) => clicks === 0 ? dial : turnLeft(dial.prev, clicks - 1);
const turnRight = (dial, clicks) => clicks === 0 ? dial : turnRight(dial.next, clicks - 1);

const head = Node(0);
const last = new Array(99).fill(1).map((n, i) => n + i).reduce((tail, n) => tail.add(n), head);

let count = 0;
let dial = last.link(head);
dial = turnLeft(dial, 49);

fs.readFileSync('./2025_12_01_input.txt', 'utf8')
    .split('\n')
    .map(instruction => ({
        direction: instruction[0],
        clicks: parseInt(instruction.slice(1))
    }))
    .forEach(({ direction, clicks }) => {
        if (direction === 'L') dial = turnLeft(dial, clicks);
        else dial = turnRight(dial, clicks);
        if (dial.value === 0) count++;
    });

console.log(count);