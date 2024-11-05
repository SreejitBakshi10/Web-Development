class Node 
{
    constructor(value) 
    {
        this.value = value;
        this.next = null;
    }
}
  
class LinkedList 
{
    constructor() 
    {
        this.head = null;
        this.current = null;
    }

    isEmpty() 
    {
        return this.head === null;
    }

    addNode(value) 
    {
        const newNode = new Node(value);
        if (this.isEmpty()) 
        {
            this.head = newNode;
            this.current = newNode;
        } 
        else 
        {
            let temp = this.head;
            while (temp.next) 
            {
                temp = temp.next;
            }
            temp.next = newNode;
        }
        this.displayNodes();
    }

    deleteCurrentNode() 
    {
        if (this.isEmpty()) 
        {
            showNoNodesMessage();
            return;
        }
        
        if (this.current === this.head) 
        {
            this.head = this.head.next;
            this.current = this.head;
        } 
        else 
        {
            let temp = this.head;
            while (temp.next && temp.next !== this.current) 
            {
                temp = temp.next;
            }
            if (temp.next) 
            {
                temp.next = this.current.next;
                this.current = temp.next ? temp.next : this.head;
            }
        }
        this.displayNodes();
    }

    nextNode() 
    {
        if (this.isEmpty()) 
        {
            showNoNodesMessage();
            return;
        }
        if (this.current && this.current.next) 
        {
            this.current = this.current.next;
        } 
        else 
        {
            Swal.fire({
                icon: 'info',
                title: 'End of List',
                text: 'No more nodes to traverse!'
            });
        }
        this.displayNodes();
    }

    previousNode() 
    {
        if (this.isEmpty()) 
        {
            showNoNodesMessage();
            return;
        }
        if (this.current === this.head) 
        {
            Swal.fire({
                icon: 'info',
                title: 'Start of List',
                text: 'You are at the first node!'
            });
            return;
        }

        let temp = this.head;
        while (temp.next && temp.next !== this.current) 
        {
            temp = temp.next;
        }
        this.current = temp;
        this.displayNodes();
    }

    displayNodes() 
    {
        const linkedListContainer = document.getElementById("linked-list");
        linkedListContainer.innerHTML = "";
    
        let temp = this.head;
        while (temp) 
        {
            const nodeBlock = document.createElement("div");
            nodeBlock.className = "node-block" + (temp === this.current ? " current" : "");
            nodeBlock.textContent = temp.value;
            linkedListContainer.appendChild(nodeBlock);
            
            if (temp.next) 
            {
                const arrow = document.createElement("span");
                arrow.className = "fas fa-arrow-right mx-2 align-self-center";
                linkedListContainer.appendChild(arrow);
            }
            temp = temp.next;
        }
      }
}

let list = new LinkedList();
let nodeCounter = 1;
let treasureNode = null;
let lives = 3;

function displayLives() 
{
    const livesContainer = document.getElementById("lives-container");
    livesContainer.innerHTML = "";

    for (let i = 0; i < 3; i++) 
    {
        const heart = document.createElement("i");
        heart.classList.add("fas", i < lives ? "fa-heart" : "fa-heart-broken", "text-danger", "mx-1");
        livesContainer.appendChild(heart);
    }
}

function addNode() 
{
    const nodeValue = "Node " + nodeCounter++;
    list.addNode(nodeValue);

    if (treasureNode === null && Math.random() < 0.5) 
    {
        treasureNode = nodeCounter - 1;
    }

    displayLives();
}

function deleteNode() 
{
    list.deleteCurrentNode();
    displayLives();
}

function nextNode() 
{
    list.nextNode();
    displayLives();
}

function previousNode() 
{
    list.previousNode();
    displayLives();
}

function checkTreasure() 
{
    if (list.isEmpty()) 
    {
        showNoNodesMessage();
        return;
    }

    if (lives > 0) {
        if (list.current && list.current.value === "Node " + treasureNode) 
        {
            Swal.fire({
                icon: 'success',
                title: 'Congratulations!',
                text: 'You found the treasure!',
            }).then(() => startOver());
        } 
        else 
        {
            lives--;
            displayLives();
            
            if (lives === 0) 
            {
                Swal.fire({
                icon: 'error',
                title: 'Game Over!',
                text: 'You have exhausted all attempts. Better luck next time!',
                }).then(() => startOver());
            }
        }
    }
}

function showNoNodesMessage() 
{
    Swal.fire({
        icon: 'info',
        title: 'No Nodes',
        text: 'There are no nodes to navigate or delete!'
    });
}

function startOver() 
{
    list.head = null;
    list.current = null;
    nodeCounter = 1;
    treasureNode = null;
    lives = 3;
    displayLives();
    list.displayNodes();
}

displayLives();
