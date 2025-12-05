import assert from 'assert';

// define linked list functionality
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

// declare the head of the list
var head = Node(0);

// create the tail of the list
var last = new Array(99).fill(1).map((n, i) => n + i).reduce((tail, n) => tail.add(n), head);

// link the last item to the head of the lsit to make it circular
var dial = last.link(head);

// define dial turning functionality
var turnLeft = (dial, clicks) => clicks === 0 ? dial : turnLeft(dial.prev, clicks - 1);
var turnRight = (dial, clicks) => clicks === 0 ? dial : turnRight(dial.next, clicks - 1);

// turn the dial to the starting position, 50
dial = turnLeft(dial, 49);

// dial turning tests
dial = turnLeft(dial, 68); assert(dial.value === 82);
dial = turnLeft(dial, 30); assert(dial.value === 52);
dial = turnRight(dial, 48); assert(dial.value === 0);
dial = turnLeft(dial, 5); assert(dial.value === 95);
dial = turnRight(dial, 60); assert(dial.value === 55);
dial = turnLeft(dial, 55); assert(dial.value === 0);
dial = turnLeft(dial, 1); assert(dial.value === 99);
dial = turnLeft(dial, 99); assert(dial.value === 0);
dial = turnRight(dial, 14); assert(dial.value === 14);
dial = turnLeft(dial, 82); assert(dial.value === 32);
