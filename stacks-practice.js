//private classes
class _Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

class _NodeQ {
  constructor(value) {
    this.value = null;
    this.next = null;
  }
}

//new classes
class Stack {
  constructor() {
    this.top = null;
  }
  push(data) {
    /* If the stack is empty, then the node will be the
           top of the stack */
    if (this.top === null) {
      this.top = new _Node(data, null);
      return this.top;
    }

    /* If the stack already has something, 
           then create a new node,
           add data to the new node, and
           have the pointer point to the top */
    const node = new _Node(data, this.top);
    this.top = node;
  }
  pop() {
    /* In order to remove the top of the stack, you have to point
           the pointer to the next item and that next item becomes the
           top of the stack */
    const node = this.top;
    this.top = node.next;
    return node.data;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }
  enqueue(data) {
    const node = new _NodeQ(data);

    if (this.first === null) {
      this.first = node;
    }

    if (this.last) {
      this.last.next = node;
    }
    //make the new node the last item on the queue
    this.last = node;
  }
  dequeue() {
    //if the queue is empty, there is nothing to return
    if (this.first === null) {
      return;
    }
    const node = this.first;
    this.first = this.first.next;
    //if this is the last item in the queue
    if (node === this.last) {
      this.last = null;
    }
    return node.value;
  }
}

function peek() {
  //if the top of the stack does not have anything
  //then the stack is empty
  //otherwise return what's on the top
  if (s.top === null) {
    return null;
  }

  return s.top.data;
}
function display(newStack) {
  // displays the entire contents of the stack
  let node = newStack.top;
  while (node) {
    console.log(node.data);
    node = node.next;
  }
}
function isEmpty(s) {
  return s.top === null;
}

/*
A palindrome is a word, phrase, or number that is spelled the same forward and backward. 
For example,dad is a palindrome; A man, a plan, a canal: Panama� is a palindrome if 
you take out the spaces and ignore the punctuation; and 1,001 is a numeric palindrome. 
We can use a stack to determine whether or not a given string is a palindrome.
Write a function that takes a string of letters and returns true or false to determine 
whether it is palindromic. For example:
console.log(is_palindrome("dad"));
console.log(is_palindrome("A man, a plan, a canal: Panama"));
console.log(is_palindrome("1001"));
// true, true, true
*/
function isPalindrome(s) {
  s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  const stack = new Stack();

  for (let i = 0; i < s.length; i++) {
    stack.push(s.charAt(i));
  }

  //compare the last half of the string to the first half
  for (let i = 0; i < s.length / 2; i++) {
    if (stack.pop() !== s.charAt(i)) {
      return false;
    }
  }

  return true;
}

// true, true, true
/*console.log(isPalindrome("dad"));
console.log(isPalindrome("A man, a plan, a canal: Panama"));
console.log(isPalindrome("1001"));*/

// *****************

function parenthesesMatch1(s) {
  const stack = new Stack();

  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i);
    if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      const candidate = peek(stack);
      if (!candidate) {
        return false;
      }
      stack.pop();
    }
  }

  if (peek(stack)) {
    return false;
  }
  return true;
}

// Multiple
function parenthesesMatch2(s) {
  const stack = new Stack();

  const brackets = {
    "(": ")",
    "{": "}",
    "[": "]",
  };

  const openBrackets = Object.keys(brackets);
  const closeBrackets = Object.values(brackets);

  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i);
    if (openBrackets.includes(char)) {
      stack.push(char);
    } else if (closeBrackets.includes(char)) {
      const candidate = peek(stack);
      if (brackets[candidate] !== char) {
        return false;
      }
      stack.pop();
    }
  }

  if (peek(stack)) {
    return false;
  }
  return true;
}

// With strings
function parenthesesMatch3(s) {
  const stack = new Stack();

  const brackets = {
    "(": ")",
    "{": "}",
    "[": "]",
  };

  const openBrackets = Object.keys(brackets);
  const closeBrackets = Object.values(brackets);

  const quotes = ['"', "'"];

  let inQuotes = false;

  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i);

    if (quotes.includes(char)) {
      if (inQuotes) {
        const candidate = peek(stack);
        if (candidate === char) {
          stack.pop();
          inQuotes = false;
        }
      } else {
        stack.push(char);
        inQuotes = true;
      }
    } else if (openBrackets.includes(char) && !inQuotes) {
      stack.push(char);
    } else if (closeBrackets.includes(char) && !inQuotes) {
      const candidate = peek(stack);
      if (brackets[candidate] !== char) {
        return false;
      }
      stack.pop();
    }
  }

  if (peek(stack)) {
    return false;
  }
  return true;
}

console.log(parenthesesMatch1("(1 + 2) + 3"));
console.log(parenthesesMatch1("(1 + 2) + 3)"));
console.log(parenthesesMatch2(")1 + 2) + 3"));
console.log(parenthesesMatch2("(1 + 2 + (3)"));
console.log(parenthesesMatch3("([({})])"));
console.log(parenthesesMatch3("([({)}])"));
console.log(parenthesesMatch3("'{(\"'"));
console.log(parenthesesMatch3("[{'('}('')]"));
console.log(parenthesesMatch3("[{'(\"}('')]"));

/***********************/

function sortStack(originalStack) {
  let newStack = new Stack();
  while (!isEmpty(originalStack)) {
    let temp = originalStack.pop();
    while (!isEmpty(newStack) && peek(newStack) > temp) {
      originalStack.push(newStack.pop());
    }
    newStack.push(temp);
  }
  while (!isEmpty(newStack)) {
    originalStack.push(newStack.pop());
  }
}

/**********************/
function squareDance(queue) {
  const spareMen = new Queue();
  const spareWomen = new Queue();

  const pairs = new Queue();

  let personA, personB;
  while ((personA = queue.dequeue())) {
    if (personA.gender === "male") {
      if ((personB = spareWomen.dequeue())) {
        pairs.enqueue([personA, personB]);
      } else {
        spareMen.enqueue(personA);
      }
    } else if (personA.gender === "female") {
      if ((personB = spareMen.dequeue())) {
        pairs.enqueue([personA, personB]);
      } else {
        spareWomen.enqueue(personA);
      }
    }
  }
  return pairs;
}

const queue = new Queue();
queue.enqueue({
  name: "Gwendolyn Wilderman",
  gender: "female",
});
queue.enqueue({
  name: "Wilbur Brakus",
  gender: "male",
});
queue.enqueue({
  name: "Vallie Howell",
  gender: "female",
});
queue.enqueue({
  name: "Nova Doyle",
  gender: "female",
});
queue.enqueue({
  name: "Monica Turcotte",
  gender: "female",
});
queue.enqueue({
  name: "Corine Smith",
  gender: "female",
});
queue.enqueue({
  name: "Jamir Sporer",
  gender: "male",
});

squareDance(queue).display();

/******************************/
function ophidianBank() {
  const queue = new Queue();
  // Assumption: New people join the queue at the same rate they are seen

  for (var i = 0; i < 100; i++) {
    console.log("Person joined line");
    queue.enqueue({
      angriness: 0, // How fed up the person is with doing their paperwork
    });

    const person = queue.dequeue();
    if (Math.random() < 0.25) {
      console.log(`Person with angriness ${person.angriness} sent to the back`);
      person.angriness++;
      queue.enqueue(person);
    } else {
      console.log(`Person with angriness ${person.angriness} processed`);
    }
  }
}

ophidianBank();

/*
Queue Implementation using Stack
A common way to implement a queue is to use a doubly linked list. 
Using the concept of queue in mind, implement a queue using 2 stacks and no other data structure. 
(You are not allowed to use a doubly linked list or array. Use the stack implementation 
with Linked list from your today’s reading material)
*/

class newQueue {
  constructor() {
    //this.top = null;
    this.oldStack = new Stack();
    this.newStack = new Stack();
  }
  eneque(item) {
    this.oldStack.push(item);
  }

  dequeue() {
    this._reverseElement();
    return this.newStack.pop();
  }
  peek() {
    this._reverseElement();
    return this.newStack.peek();
  }
  _reverseElement() {
    if (isEmpty(this.newStack)) {
      while (!isEmpty(this.oldStack)) {
        this.newStack.push(this.oldStack.pop());
      }
    }
  }
}
