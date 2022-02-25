////// VARIABLES //////
let word = "";
let answer = "";
let listOfAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

////// FUNCTIONS //////
const updateWord = () => {
	// reduce the word to four characters long
	if (word.length > 4) word = word.slice(0, 4);

	// display the word
	$('.tile').each((i, obj) => {
		$(obj).text(word[i]);
		if (i >= word.length) $(obj).text("");
	})
}

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
			word = "";
		}
	});
}

const removeWord = () => {
	// remove the last character from the word
	word = word.slice(0, -1);
	updateWord();
}

const handleInput = (e) => {
	switch (e.toUpperCase()) {
		case "ENTER":
			submitWord();
			break;
	
		case "BACKSPACE":
			removeWord();
			break;
	
		default:
			if (listOfAlphabets.includes(e.toUpperCase())) {
				word += e.toUpperCase();
				updateWord();
			}
			break;
	}
}

const newGame = async () => {
	await fetch("http://localhost:3000/rand").then(res => res.json()).then(res => {
		console.log(res)
		answer = res[0];
	})
}

$('body').keyup((e) => handleInput(e.key));

$('.key').each((_, obj) => $(obj).click(() => handleInput($(obj).text())))

// start a new game on load
$(() => newGame());
