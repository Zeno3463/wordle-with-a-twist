"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const random_words_1 = __importDefault(require("random-words"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get('/rand', (req, res) => {
    let word = "";
    while (word.length != 4) {
        word = (0, random_words_1.default)({ exactly: 1, maxLength: 4, formatter: (word) => word.toUpperCase() })[0];
    }
    res.send([word]);
});
app.listen(process.env.PORT || 3000, () => console.log("server running"));
