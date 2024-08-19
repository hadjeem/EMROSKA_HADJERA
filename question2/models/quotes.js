const path = require('node:path');
const escape = require('escape-html');
const { parse, serialize } = require('../utils/json');

const jsonDbPathEvaluation = path.join(__dirname, '/../data/evaluations.json');

function createAnEvaluation(quoteId, score, user) {
  const evaluations = parse(jsonDbPathEvaluation, []);
  if (quoteId < 0 || quoteId > 20) return undefined;
  console.log(evaluations.find((evaluation) => Number(evaluation.quoteId) === quoteId
    && evaluation.user === user));

  if (evaluations.find((evaluation) => Number(evaluation.quoteId) === quoteId
  && evaluation.user === user)) return null;
  const newEvaluation = {
    id: getNextId(),
    quoteId: escape(quoteId),
    score: escape(score),
    user: escape(user),
  };
  evaluations.push(newEvaluation);
  serialize(jsonDbPathEvaluation, evaluations);
  return newEvaluation;
}

function getNextId() {
  const evaluations = parse(jsonDbPathEvaluation, []);
  const lastItemIndex = evaluations?.length !== 0 ? evaluations.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = evaluations[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

module.exports = {
  createAnEvaluation,
};
