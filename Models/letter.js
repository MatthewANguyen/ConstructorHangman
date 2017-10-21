function Letter(letter) {
	this.letter = letter;
	this.isGuessed = false;
}

Letter.prototype.display = function() {
	if(this.isGuessed) {
		return this.letter;
	} else {
		return "_";
	}
}

Letter.prototype.guess = function(guess) {
	var correctGuess = false;
	if(guess == this.letter && this.display() == "_") {
		this.isGuessed = true;
		correctGuess = true;
	}
	return correctGuess;
}

Letter.prototype.getLetter = function() {
	return this.letter;
}

module.exports = Letter;