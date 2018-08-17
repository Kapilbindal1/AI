var app = require('express')();
var http = require('http').Server(app);
// const db = require('./config/db');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.get('/', function (req, res) {
  res.send('<h1>Hello world</h1>');
});

const ansKeywords = [
  "/ans:",
  "/ans :",
  "/answer:",
  "/answer : ",
  "replyai: ",
  "replyai : ",
];

const quesKeywords = [
  "/learn:",
  "/learn :",
  "learnai:",
  "learnai",
];

function isAnswerIncluded(string) {
  const lowerString = string.toLowerCase();
  for (const key of ansKeywords) {
    if (lowerString.includes(key)) {
      return key;
    }
  }
  return undefined;
}

function isQuesIncluded(string) {
  const firstWord = string.substr(0, string.indexOf(' '));
  const lowerString = firstWord.toLowerCase();
  for (const key of quesKeywords) {
    if (lowerString === key) {
      return key;
    }
  }
  return undefined;
}

function learnAI(token, res) {
  const quesKeyword = isQuesIncluded(token);
  if (quesKeyword) {
    const ansKeyword = isAnswerIncluded(token);
    if (ansKeyword) {
      const startIndex = token.indexOf(':') + 1;
      const lastIndex = token.indexOf(ansKeyword);
      const question = (token.substr(startIndex, lastIndex - startIndex)).trim();
      const answer = (token.substr(token.indexOf(ansKeyword) + ansKeyword.length)).trim();
      console.log(question);
      console.log(answer);
      res.json({
        success: true,
        question,
        answer,
        message: 'Thank you.'
      });
    } else {
      res.json({
        success: true,
        message: 'answer?'
      });
    }
    return true;
  }
  return false;
}

app.post('/teach', (req, res, next) => {
  const token = req.body.message;
  const quesKeyword = isQuesIncluded(token);
  if (!learnAI(token, res)) {
    res.json({
      message: 'checking for relevent answer...',
    });
  }
  res.end();

});

// db.sync();

http.listen(3000, function () {
  console.log('listening on *:3000');
});
