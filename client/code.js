/* 
Welcome to the source code of Wordle With A Twist!
Wordle With A Twist is a wordle clone with a twist in game play.

Date of Creation: 19th February 2022
Author: Zeno
Version: 1.0.1
*/

////// VARIABLES //////
let word = "";
let answer = "";
let listOfAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

////// FUNCTIONS //////

// called when the user enters a new letter
const updateWord = () => {
	
	// reduce the word to four characters long
	if (word.length > 4) word = word.slice(0, 4);

	// render the word on the screen
	$('.tile').each((i, obj) => {
		$(obj).text(word[i]);
		if (i >= word.length) $(obj).text("");
	})
}

// called when the user hits enter
const submitWord = () => {
	$.getJSON("dictionary.json", (dictionary) => {
		
		// if the dictionary does not contain the submitted word
		if (!dictionary.includes(word)) {
			
			// show the 'that is not a word' pop up for 1 second
			$(".that-is-not-a-word").html("<h1>That is not a word!</h1>");
			setTimeout(() => $('.that-is-not-a-word').html(''), 1000);
		}

		else {
			
			// loop through each letter in the word
			for (let i = 0; i < word.length; i++) {
				
				// if the letter matches the answer, shade it green
				if (word[i] === answer[i]) $(`.tile:eq(0)`).addClass('tile-correct');
				
				// if the letter is lower than the letter in the answer alphabetically, shade it yellow
				else if (listOfAlphabets.indexOf(word[i]) < listOfAlphabets.indexOf(answer[i])) $(`.tile:eq(0)`).addClass('tile-yellow');
				
				// if the letter is higher than the letter in the answer alphabetically, shade it red
				else $(`.tile:eq(0)`).addClass('tile-red');
				
				$(`.tile:eq(0)`).removeClass('tile');
			}

			// if the user ran out of tries, show the user the answer
			if ($('.tile').length <= 0 && word !== answer) {
				$(".that-is-not-a-word").html(`<h1>You lost. The word is ${answer}.</h1>`);
				setTimeout(() => $('.that-is-not-a-word').html(''), 3000);
			}

			// reset the word
			word = "";
		}
	});
}

// called when the user hits backspace
const removeWord = () => {
	
	// remove the last character from the word
	word = word.slice(0, -1);
	updateWord();
}

// called when the user triggers an input event (typing a letter on the keyboard || clicking the on screen keyboard)
const handleInput = (e) => {
	switch (e.toUpperCase()) {

		// if the user hits enter, run submitWord()
		case "ENTER":
			submitWord();
			break;
	
		// if the user hits backspace, run removeWord()
		case "BACKSPACE":
			removeWord();
			break;
	
		// if the user hits any other key, add the key to the word
		default:
			if (listOfAlphabets.includes(e.toUpperCase())) {
				word += e.toUpperCase();
				updateWord();
			}
			break;
	}
}

// join the handleInput() function with keyup events
$('body').keyup((e) => handleInput(e.key));

// join the handleInput() function with on screen keyboard events
$('.key').each((_, obj) => $(obj).click(() => handleInput($(obj).text())))

// if the user clicks the close-tutorial button, close the tutorial
$('.close-tutorial').click(() => $('.tutorial').hide());

// if the user clicks the tutorial button, show the tutorial
$('.show-tutorial').click(() => $('.tutorial').show());

// if the user clicks the new game button, reload the page
$('.new-game').click(() => window.location.reload());

$(async () => {
	
	// get a new answer on load
	$.getJSON("dictionary.json", (dictionary) => {
		answer = dictionary[Math.round(Math.random() * dictionary.length)];
	})

	// if this is the first time the user is playing, show the tutorial
	if (localStorage.getItem('first-time') === null) localStorage.setItem('first-time', 'false');
	else $('.tutorial').hide();
});
