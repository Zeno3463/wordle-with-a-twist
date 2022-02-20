////// VARIABLES //////
let word = "";
let answer = "CRANE";
let listOfAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

////// FUNCTIONS //////
const updateWord = () => {
	// reduce the word to five characters long
	if (word.length > 5) word = word.slice(0, 5);

	// display the word
	$('.tile').each((i, obj) => {
		$(obj).text(word[i]);
		if (i >= word.length) $(obj).text("");
	})
}

const submitWord = () => {

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

$('body').keyup((e) => handleInput(e.key));

$('.key').each((_, obj) => $(obj).click(() => handleInput($(obj).text())))