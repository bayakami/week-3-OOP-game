/*class Room setup*/
/*class Room {

    get name() {
        return this._name
    }
    get description() {
        return this._description
    }

    set name(value) {
        if (value === "") {
            console.log("Error, name too short")
            return;
        }
        this._name = value;
    }

    describe() {
        return this.name + "-----------" + this.description
    }

    constructor(name, description) {

        this._name = name
        this._description = description
        this._linkedRooms = {}
    }

    get linkedRooms()
    {
        return this._linkedRooms
    }

    linkRoom(direction,room)
    {
        this._linkedRooms[direction] = room
    }

    move(direction){
        if(direction in this._linkedRooms ){
            return this._linkedRooms[direction];
        } else {
            alert("You can't go that way")
            return this;
        }
    }
}*/

/*list of the rooms*/
/*const Kitchen = new Room("Kitchen", "This is a kitchen")
const Bedroom = new Room("Bedroom", "This is the dining room")
const Bathroom = new Room("Bathroom", "This is the dining room")
const Lounge = new Room("Lounge", "This is the dining room")
const BabyRoom = new Room("Baby Room", "This is the dining room")

/*movement between rooms
Kitchen.linkRoom("north",Bedroom)
Kitchen.linkRoom("south",Lounge)
Kitchen.linkRoom("east",Bathroom)
Kitchen.linkRoom("west",BabyRoom)
Bedroom.linkRoom("south",Kitchen)
Bathroom.linkRoom("west",Kitchen)
Lounge.linkRoom("north",Kitchen)



let currentRoom = Kitchen*/




const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

/*what items the player has on them is stored in state*/
let state = {}

/*function for starting the game */
function startGame() {
  state = {}
  showTextNode(1)
}

/*displays which option we are on*/
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  /*happens every time an option is selected*/
  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up in the kitchen with the worst hangover ever. Your only mission is to get some painkillers and take a nap in your bedroom. BUT beware the baby is still asleep...',
    options: [
      {
        text: '> North',
        //setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: '> South',
        nextText: 3
      },
      {
        text: '> East',
        nextText: 4
      },
      {
        text: '> West',
        nextText: 5
      }
    ]
  },
  {
    id: 2,
    text: 'You are in the bedroom',
    options: [
      {
        text: '> South',
        // requiredState: (currentState) => currentState.blueGoo,
        // setState: { blueGoo: false, sword: true },
        nextText: 1
      },
      {
        text: '> Go to sleep',
        //required - painkillers
        requiredState: (currentState) => currentState.painkillers,
        // setState: { blueGoo: false, shield: true },
        //restart
        nextText: 6
      }
    ]
  },
  {
    id: 3,
    text: 'Welcome to the lounge. Nothing to see here.',
    options: [
      {
        text: '> North',
        nextText: 1
      },
      
    ]
  },
  {
    id: 4,
    text: 'Welcome to the bathroom. There are painkillers in the cabinet above the sink',
    options: [
      {
        text: '> West',
        nextText: 1
      },
      {
        text: '> Take the painkillers',
        //requiredState: (currentState) => currentState.painkillers,
        setState: { painkillers: true},
        nextText: 4,
      }
      
    ]
  },
  {
    id: 5,
    text: 'You entered the baby room and woke up the baby. GAME OVER',
    options: [
      {
        text: '> Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You can take a nap. You did it!',
    options: [
      {
        text: '> Restart',
        nextText: -1
      }
    ]
  },
  
]

/*call function to start the game*/
startGame()
