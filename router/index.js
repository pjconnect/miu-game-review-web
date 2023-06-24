const express = require('express');
const gameRouter = require('./gameRoutes');
const authRouter = require('./authRouter');

const router = express.Router();
router.use('/auth', authRouter);
router.use('/games', gameRouter)

module.exports = router;