import express from 'express';
import randomWords from 'random-words';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/rand', (req, res) => {
	let word = "";
	while (word.length != 4) {
		word = randomWords({exactly: 1, maxLength: 4, formatter: (word) => word.toUpperCase()})[0];
	}
	res.send([word]);
})

app.listen(process.env.PORT || 3000, () => console.log("server running"));
