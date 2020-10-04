/*Copied from 'Classes' lab to help get started. Creates classes for card/deck */
const suit = [/*'U+2665'*/ 'hearts', /*'U+2660'*/'spades', /*U+2666*/ 'diamonds',/*'U+2663'*/ 'clubs'] /*replace with emojis? would be unicode like the ascii lab */
const rank = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
const score = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

/* Created players  */
let player1 = []
let player2 = []

class Card {
    constructor(suit, rank, score) {
        this.suit = suit
        this.rank = rank
        this.score = score
    }
 }
 
 class Deck {
    constructor() {
        this.card = []
    }
 
    createCards() {
        for (let i = 0; i < suit.length; i++) {
            for (let j = 0; j < rank.length; j++) {
                let newCard = new Card(suit[i], rank[j], score[j])
                this.card.push(newCard)
            }
        }
 
    }
 }

 /* "It could be helpful to have a class to represent the overall Game, 
 particularly when handling ties and other complicated game states." 
 ***Do I put every game action inside of this class???... shuffle, deal, players putting down cards, etc*/

class War {
    constructor() {
        this.currentHand = []
        this.round = 1
    }

    shuffleDeck(deck) {
     for(let i = 0; i < deck.length; i++) {
        const trade = deck[i]
        const j = Math.floor(Math.random() * i)
          deck[i] = deck[j]
          deck[j] = trade
     }
    }

    dealCards(deck) {
	for(let i = 0; i < 52; i++) {
		let j = deck.shift(i)
		if (i % 2 === 0) {
		    player1.push(j)
        } else player2.push(j)
    }
}
    game() {
        while (player1.length > 0 && player2.length > 0 && this.round < 100) {
			console.log(`Round: ${this.round}`)
			let card1 = player1[0]
			console.log(`Player 1's card is ${card1.rank} of ${card1.suit}`)
			let card2 = player2[0]
			console.log(`Player 2's card is ${card2.rank} of ${card2.suit}`)
            this.currentHand.unshift(player1.shift(0), player2.shift(0))
            
            if (card1.score > card2.score) {
				player1.push.apply(player1, this.currentHand)
				console.log("Player 1 is our winner!")
				this.currentHand = []
				console.log(`Player 1 has ${player1.length} cards in their hand.`)
				console.log(`Player 2 has ${player2.length} cards in their hand.`)
			} else if (card1.score < card2.score) {
				player2.push.apply(player2, this.currentHand)
				console.log("Player 2 is the winner!")
				console.log(`Player 1 has ${player1.length} cards in their hand.`)
				console.log(`Player 2 has ${player2.length} cards in their hand.`)
                this.currentHand = []
                
			} else {
				console.log("GET READY TO GO TO WAR!!! May the best ...ehh I guess luckiest... player win!")
				if (player1.length > 3 && player2.length > 3) {
				this.startWar()
				} else if (player1.length > player2.length) {
					player1.push.apply(player1, player2)
					player1.push.apply(player1, this.currentHand)
					player2 = []
					this.currentHand = []
					console.log("Not so fast bucko, Player 2 doesn't have enough cards to fight a War! Maybe they should raise taxes so they can buy more cards! ...Get it?")
				} else if (player2.length > player1.length) {
					player2.push.apply(player2, player1)
					player2.push.apply(player2, this.currentHand)
					player1 = []
					this.currentHand = []
					console.log("Not so fast bucko, Player 1 doesn't have enough cards to fight a War! Maybe they should raise taxes so they can buy more cards! ...Get it?")
				}
            }
            this.round++
        }
    /*Check for a winnner */
    if (player2.length === 0) console.log("Player 1 wins the game, player 2 has no cards left.")
	if (player1.length === 0) console.log("Player 2 wins the game, player 1 has no cards left.")
    console.log("To play another game of War, please refresh your page and ensure your console is open!")
    }
/*To create war, need to get 3 cards from the player's hands and 
add them to 'this.currentHand' and then get one extra card and compare them. Winner takes all. Don't forget an instance of multiple wars back to back. */

    startWar(){
        for (let i = 0; i < 3; i++) {
			this.currentHand.push(player1.shift())
			this.currentHand.push(player2.shift())
		}

		if (player1.length >= 4 && player2.length >= 4) {
			let card1 = player1[0]
			console.log(`Player 1 plays ${card1.rank} of ${card1.suit}`)
			let card2 = player2[0]
			console.log(`Player 2 plays ${card2.rank} of ${card2.suit}`)
			this.currentHand.unshift(player1.shift(0), player2.shift(0))
			 

		if (card1.score > card2.score) {
			player1.push.apply(player1, this.currentHand)
			console.log("Player 1 has won the War!")
			console.log(`Player 1 has ${player1.length} cards in their hand.`)
			console.log(`Player 2 has ${player2.length} cards in their hand.`)
			this.currentHand = []
		} else if (card1.score < card2.score) {
			player2.push.apply(player2, this.currentHand)
			console.log("Player 2 has won the War!")
			console.log(`Player 1 has ${player1.length} cards in their hand.`)
			console.log(`Player 2 has ${player2.length} cards in their hand.`)
			this.currentHand = []
		} else {
			console.log("Well, who would've thought? Don't see this very often, a double War? Best of luck in your continuing battle!")
			if (player1.length >= 4 && player2.length >= 4) {
            
            startWar()
			    } else if (player1.length > player2.length) {
					player1.push.apply(player1, player2)
					player1.push.apply(player1, this.currentHand)
					player2 = []
					this.currentHand = []
					console.log("Not so fast bucko, Player 2 doesn't have enough cards to fight a War! Maybe they should raise taxes so they can buy more cards! ...Get it?")
				} else if (player2.length > player1.length) {
					player2.push.apply(player2, player1)
					player2.push.apply(player2, this.currentHand)
					player1 = []
					this.currentHand = []
					console.log("Not so fast bucko, Player 1 doesn't have enough cards to fight a War! Maybe they should raise taxes so they can buy more cards! ...Get it?")
				}
			}
		}
    }

}

const war = new War()
console.log("They say, War what is it good for? In this case a fun card game. Welcome to War! Best of luck to you both.")
const deck = new Deck()
deck.createCards();
war.shuffleDeck(deck.card)
console.log("Please wait while I shuffle the cards. Ya know I went to school to learn how to do this. My motherboard said it was a waste of hardrive space but what does she know!")
war.dealCards(deck.card)
console.log("Dealing your cards now, I gave all the Aces to Player 1... just kidding. Good Luck!")
war.game()
