const path = require('node:path');
const escape = require('escape-html');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/evaluations.json');
const jsonDbPathQuotes = path.join(__dirname, '/../data/quotes.json');

function createOneEvaluation(quoteId, score, username) {
  const evaluations = parse(jsonDbPath, []);

  const quotes = parse(jsonDbPathQuotes, []);
  const foundQuote = quotes.find((quote) => quote.id === parseInt(quoteId, 10));
  console.log(foundQuote);
  if (foundQuote === undefined) return undefined;
  const existingEvaluation = evaluations.find((evaluation) => evaluation.quoteId === quoteId
   && evaluation.username === username);
  if (existingEvaluation) return null;

  const createdEvaluation = {
    id: getNextId(),
    quoteId: escape(quoteId),
    score: escape(score),
    username: escape(username),
  };

  evaluations.push(createdEvaluation);
  serialize(jsonDbPath, evaluations);

  return createdEvaluation;
}

function getNextId() {
  const evaluations = parse(jsonDbPath, []);
  const lastEvaluation = evaluations[evaluations.length - 1];

  return lastEvaluation ? lastEvaluation.id + 1 : 1;
}

module.exports = {
  createOneEvaluation,
};
