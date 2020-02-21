function ageInDays() {
    var birthYear = prompt("enter birth year");
    var ageDays = (2019 - birthYear) * 365;
    console.log(ageDays);
    var h1 = document.createElement('h1');
    var toSendText = document.createTextNode('you are ' + ageDays + ' days old ');
    //var toSendText = 'you are '+ageDays+' days old ';
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(toSendText);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageInDays').remove();
}

function generator() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-gen');
    image.src = "https://picsum.photos/200/200?random=1";
    div.appendChild(image);
}

function rpsgame(yourChoice) {
    // console.log(yourChoice);
    //console.log(yourChoice.src);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    console.log(humanChoice);
    console.log(botChoice);

    results = decideWinner(humanChoice, botChoice);
    console.log('results>>' + results);
    message = finalMessage(results);
    console.log(message);
    console.log('message>>' + JSON.stringify(message));

    rpsFrontEnd(yourChoice.id, botChoice, message);

}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {

    return ['rock', 'paper', 'scissor'][number];
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': { 'scissor': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'rock': 1, 'paper': 0.5, 'scissor': 0 },
        'scissor': { 'paper': 1, 'scissor': 0.5, 'rock': 0 }
    }
    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];
    return yourScore;

}

function finalMessage(yourScore) {
    if (yourScore === 0) {
        return { 'message': 'you lost', 'color': 'red' };
    } else if (yourScore === 0.5) {
        return { 'message': 'you tied', 'color': 'yellow' };
    } else {
        return { 'message': 'you won', 'color': 'green' };
    }

}

function rpsFrontEnd(humanImg, botImg, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src= '" + imagesDatabase[humanImg] + "' height = 150 width = 150 style = 'box-shadow: 0px 10px 50px rgba(37,50,233,1)'>";
    messageDiv.innerHTML = "<h1 style='color:" + finalMessage['color'] + "; font-size:60px; padding:20px;'> " + finalMessage['message'] + " </h1>";
    botDiv.innerHTML = "<img src= '" + imagesDatabase[botImg] + "' height = 150 width = 150 style = 'box-shadow: 0px 10px 50px rgba(243,38,24,1)'>";
    console.log(typeof(messageDiv));

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);


}

function resetGame() {
    location.reload();
}

// change the color of buttons
var all_buttons = document.getElementsByTagName('button');
var copyOfAllButton = [];
for (var i = 0; i < all_buttons.length; i++) {

    copyOfAllButton.push(all_buttons[i].classList[1]);
    //console.log('copy>>>'+'\n'+all_buttons[i]);
}

function buttonColorChange(buttonThingy) {
    console.log(buttonThingy.value);
    if (buttonThingy.value === 'red') {
        buttonsRed();
    } else if (buttonThingy.value === 'green') {
        buttonsGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonsColorReset();
    } else if (buttonThingy.value === 'random') {
        randomColors();
    }

}

function buttonsRed() {

    for (let i = 0; i < all_buttons.length; i++) {
        //console.log('list1 >>' + '\n' + all_buttons[i].classList);
        //console.log('list2 >>' + '\n' + all_buttons[i].classList[1]);

        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        //console.log('list3 >>' + '\n' + all_buttons[i].classList);
        all_buttons[i].classList.add('btn-danger');
        //console.log('list4 >>' + '\n' + all_buttons[i].classList);
    }
}

function buttonsGreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');

    }
}

function buttonsColorReset() {
    for (var i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyOfAllButton[i]);

    }

}

function randomColors() {
    var chioces = ['btn-primary', 'btn-success', 'btn-dange', 'btn-warning'];
    for (let i = 0; i < all_buttons.length; i++) {
        var randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyOfAllButton[randomNumber]);

    }

}

/// challenge bj

let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] },
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('blackjack_assets/sounds/swish.m4a');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackJackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackJackHit() {
    let card = randomCard();
    console.log(card);
    showCard(card, YOU);
    //    showCard(card, DEALER);\
    updateScore(card, YOU);
    showScore(YOU);
    console.log('score>>' + YOU['score']);
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    let cardImage = document.createElement('img');
    cardImage.src = `blackjack_assets/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}

function blackjackDeal() {

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for (i = 0; i < yourImages.length; i++) {
        yourImages[i].remove();

    }

    for (i = 0; i < dealerImages.length; i++) {
        dealerImages[i].remove();

    }
}

function updateScore(card, activePlayer) {
    activePlayer['score'] += blackjackGame['cardsMap'][card];

}

function showScore(activePlayer) {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
}