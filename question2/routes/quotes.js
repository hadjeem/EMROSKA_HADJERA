const express = require('express');
const { createOneEvaluation } = require('../models/Quote');
const { authorize } = require('../utils/auths');

const router = express.Router();

router.post('/', authorize, (req, res) => {
  const quoteId = req?.body?.quoteId?.length !== 0 ? req.body.quoteId : undefined;
  const score = req?.body?.score?.length !== 0 ? req.body.score : undefined;
  const username = req?.user?.username;

  if (!quoteId || !score || score < 0 || score > 10) {
    return res.sendStatus(400); // error code '400 Bad request'
  }

  const createdEvaluation = createOneEvaluation(quoteId, score, username);
  if (createdEvaluation === null) {
    return res.sendStatus(409); // error code '409 Conflict'
  }
  if (createdEvaluation === undefined) {
    return res.sendStatus(404); // error code '404 Not found'
  }

  return res.json(createdEvaluation);
});

module.exports = router;
