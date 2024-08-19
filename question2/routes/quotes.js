const express = require('express');
const { createAnEvaluation } = require('../models/quotes');
const { authorize } = require('../utils/auths');

const router = express.Router();

router.post('/', authorize, (req, res) => {
  const quoteId = req?.body?.quoteId?.length !== 0 ? req.body.quoteId : undefined;
  const score = req?.body?.quoteId?.length !== 0 ? req.body.score : undefined;
  const user = req?.user?.username !== 0 ? req.user.username : undefined;

  if (!quoteId || !score || !user) return res.sendStatus(400); // error code '400 Bad request'

  if (score < 0 || score > 10) return res.sendStatus(400);

  const createdEvaluation = createAnEvaluation(quoteId, score, user);

  if (createdEvaluation === undefined) return res.sendStatus(404); // error code '404 Not found'

  if (createdEvaluation === null) return res.sendStatus(409); // error code '409 Conflict'
  return res.json(createAnEvaluation);
});

module.exports = router;
