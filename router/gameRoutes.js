const express = require('express');
const router = express.Router();
const gameController = require('../controller/gameController');

router.route('/')
    .get(gameController.getAll)
    .post(gameController.create)

router.route('/:gameId')
    .get(gameController.getOne)
    .delete(gameController.deleteOne)
    .put(gameController.update);

module.exports = router;