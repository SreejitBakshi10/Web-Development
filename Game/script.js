class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
class LinkedList {
constructor() {
    this.head = null;
    this.current = null;
}

isEmpty() {
    return this.head === null;
}

addNode(value) {
    const newNode = new Node(value);
    if (this.isEmpty()) {
    this.head = newNode;
    this.current = newNode;
    } else {
    let temp = this.head;
    while (temp.next) {
        temp = temp.next;
    }
    temp.next = newNode;
    }
    this.displayNodes();
}

deleteCurrentNode() {
    if (this.isEmpty()) {
    showNoNodesMessage();
    return;
    }
    
    if (this.current === this.head) {
    this.head = this.head.next;
    this.current = this.head;
    } else {
    let temp = this.head;
    while (temp.next && temp.next !== this.current) {
        temp = temp.next;
    }
    if (temp.next) {
        temp.next = this.current.next;
        this.current = temp.next ? temp.next : this.head;
    }
    }
    this.displayNodes();
}

nextNode() {
    if (this.isEmpty()) {
    showNoNodesMessage();
    return;
    }
    if (this.current && this.current.next) {
    this.current = this.current.next;
    } else {
    Swal.fire({
        icon: 'info',
        title: 'End of List',
        text: 'No more nodes to traverse!'
    });
    }
    this.displayNodes();
}

previousNode() {
    if (this.isEmpty()) {
    showNoNodesMessage();
    return;
    }
    if (this.current === this.head) {
    Swal.fire({
        icon: 'info',
        title: 'Start of List',
        text: 'You are at the first node!'
    });
    return;
    }

    let temp = this.head;
    while (temp.next && temp.next !== this.current) {
    temp = temp.next;
    }
    this.current = temp;
    this.displayNodes();
}

displayNodes() {
    const linkedListContainer = document.getElementById("linked-list");
    linkedListContainer.innerHTML = ""; // Clear existing nodes

    let temp = this.head;
    while (temp) {
    const nodeBlock = document.createElement("div");
    nodeBlock.className = "node-block" + (temp === this.current ? " current" : "");
    nodeBlock.textContent = temp.value;
    linkedListContainer.appendChild(nodeBlock);
    temp = temp.next;
    }
}
}

let list = new LinkedList();
let nodeCounter = 1;
let treasureNode = null;
let lives = 3;

// Function to display lives
function displayLives() {
const livesContainer = document.getElementById("lives-container");
livesContainer.innerHTML = ""; // Clear previous lives

for (let i = 0; i < 3; i++) { // Always show 3 slots for hearts
    const heart = document.createElement("i");
    heart.classList.add("fas", i < lives ? "fa-heart" : "fa-heart-broken", "text-danger", "mx-1");
    livesContainer.appendChild(heart);
}
}

function addNode() {
const nodeValue = "Node " + nodeCounter++;
list.addNode(nodeValue);

// Randomly assign treasure to a node
if (Math.random() < 0.5) { // 50% chance to place treasure
    treasureNode = nodeCounter - 1; // Assign the index of the new node
}

displayLives(); // Update lives display
}

function deleteNode() {
list.deleteCurrentNode();
displayLives(); // Update lives display
}

function nextNode() {
list.nextNode();
displayLives(); // Update lives display
}

function previousNode() {
list.previousNode();
displayLives(); // Update lives display
}

function checkTreasure() {
if (list.isEmpty()) {
    showNoNodesMessage();
    return;
}

if (lives > 0) {
    if (list.current && list.current.value === "Node " + treasureNode) {
    Swal.fire({
        icon: 'success',
        title: 'Congratulations!',
        text: 'You found the treasure!',
    }).then(() => startOver());
    } else {
    // Remove a life without popup
    lives--;
    displayLives(); // Update lives display
    
    if (lives === 0) {
        Swal.fire({
        icon: 'error',
        title: 'Game Over!',
        text: 'You have exhausted all attempts. Better luck next time!',
        }).then(() => startOver());
    }
    }
}
}

function showNoNodesMessage() {
Swal.fire({
    icon: 'info',
    title: 'No Nodes',
    text: 'There are no nodes to navigate or delete!'
});
}

function startOver() {
list.head = null;
list.current = null;
nodeCounter = 1;
treasureNode = null;
lives = 3;
displayLives(); // Initialize lives display
list.displayNodes();
}

// Call displayLives when the game starts
displayLives();