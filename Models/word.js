var inquirer = require("inquirer");
var prompt = require("prompt");

var letterModel = require("./letter.js");

var wordArray = ["airplane", "helicopter", "rainbow", "seagull", 
				"eagle", "hummingbird", "drone", "dragonfly", "kite",
				"rocket", "pelican", "butterfly", "vulture", "sparrow"];

function Word(word) {
	this.word = word;
	this.guessesLeft = 7;
	this.letterArray = [];
	this.guessedLettersArray = [];
	this.correctLetters = 0;
	this.completedWord = false;

	for(var i = 0; i < this.word.length; i++) {
		var newLetter = new letterModel(this.word.charAt(i));
		this.letterArray.push(newLetter);
	}
}

Word.prototype.display = function() {
	var toDisplay = "";
	for(var i = 0; i < this.word.length; i++) {
		toDisplay += this.letterArray[i].display();
	}
	return toDisplay;
}

Word.prototype.takeGuess = function(guess) {
	var correctGuess = false;
	for(var i = 0; i < this.word.length; i++) {
		if(this.letterArray[i].guess(guess)) {
			correctGuess = true;
			this.correctLetters++;
		}
	}
	if(!correctGuess && !this.guessedLettersArray.includes(guess)) {
		this.guessedLettersArray.push(guess);
		this.guessesLeft--;
	} else {
		this.guessedLettersArray.push(guess);
	}
}

Word.prototype.start = function(solved) {
	if(!solved){
		var self = this;
		inquirer.prompt([
		{
			type:"input",
			message:self.display(),
			name:"guess"
		}
		]).then(function(answers) {
			self.takeGuess(answers.guess);
			console.log("guesses left: " + self.guessesLeft);
			// if(self.guessesLeft <= 0) {
			// 	inquirer.prompt([
			// 	{
			// 		type:"confirm",
			// 		message:"would you like to continue?",
			// 		name:"continue"
			// 	}
			// 	]).then(function(answers) {
			// 		if(answers.continue) {
			// 			return;
			// 		} else {
			// 			process.exit();
			// 		}
			// 	})
			// }
			if(self.correctLetters >= self.word.length) {
				console.log(self.display());
				self.start(true);
			} else {
				self.start(false);
			}
		})
	} else {
		var currentWord = new Word(wordArray[Math.floor(Math.random() * wordArray.length)]);
		currentWord.start(false);
	}
}

module.exports = Word;