
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

/*what items the player has on them is stored in state*/
let state = {}

/*function for starting the game */
function startGame() {
    document.getElementById("startButton").style.display = "none";
    state = {}
    showTextNode(1)
}

/*displays which option we are on*/
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text

    /*this displays the correct options for each individual room*/
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            /*event listener for clicking*/
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

/*happens every time an option is selected*/
function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

/*rooms and their descripitons are displayed using these text nodes
these nodes also navigate the movement between rooms*/
/*options for what we can do in each room, 
options have parameters - text, nextText and sometimes the state is set*/
const textNodes = [
    {
        id: 1,
        text: 'You wake up in the lounge with the worst hangover ever. Your only mission is to get some painkillers and take a nap in your bedroom. BUT beware the baby is still asleep...',
        options: [
            {
                text: '> North',
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
            },
            
        ]
    },
    {
        id: 2,
        text: 'You are in the bedroom',
        options: [
            {
                text: '> South',
                nextText: 1
            },
            {
                text: '> Go to sleep',
                //required - painkillers
                requiredState: (currentState) => currentState.painkillers,
                //restart
                nextText: 6
            }
        ]
    },
    {
        id: 3,
        text: 'Welcome to the kitchen. You see a full milk bottle on the floor',
        options: [
            {
                text: '> North',
                nextText: 1
            },
            {
                text: '> Pick up the bottle',
                setState: { bottle: true},
                nextText: 7
            }

        ]
    },
    {
        id: 4,
        text: 'Welcome to the bathroom. There are painkillers in the cabinet above the sink.',
        options: [
            {
                text: '> West',
                nextText: 1
            },
            {
                text: '> Take the painkillers',
                //the player picked up the painkillers, the state is changed
                setState: { painkillers: true },
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
        /*WIN*/
        id: 6,
        text: 'You can take a nap. You did it!',
        options: [
            {
                text: '> Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 7,
        text: 'You are in the kitchen. You are holding the milk bottle',
        options: [
            {
                text: '> North',
                nextText: 1
            }
            
        ]
    }
    /*requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },*/

]

/*call function to start the game*/
//startGame()
