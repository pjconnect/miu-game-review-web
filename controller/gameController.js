const mongoose = require("mongoose");
const { defaultResponseHandler } = require("../helperMethods");
const gameModel = mongoose.model("Game");

const getAll = (req, res) => {
    let skip = req.query.skip;
    if (!skip) {
        skip = 0;
    }
    let limit = req.query.limit;
    if (!limit) {
        limit = 12;
    }
    let searchText = req.query.searchText;
    if (!searchText) {
        searchText = '';
    }
    getTotalGameCount()
        .then((totalGameCount) => getPagedGames(skip, limit, searchText, totalGameCount))
        .then((gamesPagedResponse) => defaultResponseHandler(res, gamesPagedResponse))
        .catch((err) => defaultResponseHandler(res, null, err));
}

const getTotalGameCount = () => {
    return gameModel.count();
}

const getPagedGames = (skip, limit, searchText, totalGameCount) => {
    return new Promise((resolve, reject) => {
        gameModel.find(
            { name: { $regex: searchText, $options: 'i' } })
            .skip(skip)
            .limit(limit)
            .select({ name: true, rating: true, pictureURL: true })
            .then((games) => {
                resolve({ games: games, skip: skip, limit: limit, totalGameCount: totalGameCount })
            }).catch((error) => { reject(error) })
    })
}

const create = (req, res) => {
    const newGame = {
        name: req.body.name,
        rating: req.body.rating,
        pictureURL: req.body.pictureURL,
        platform: req.body.platform,
        year: req.body.releasedYear,
        price: req.body.price,
        description: req.body.description,
    }
    gameModel.create(newGame).then((result) => {
        defaultResponseHandler(res, result, null)
    }).catch(error => {
        defaultResponseHandler(res, null, error);
    })
};

const getOne = (req, res) => {
    gameModel.findById(req.params.gameId)
        .then((found) => {
            defaultResponseHandler(res, found)
        }).catch(err => {
            defaultResponseHandler(res, null, err);
        })
};
const deleteOne = (req, res) => {
    gameModel.deleteOne({ _id: req.params.gameId })
        .exec().then((found) => {
            defaultResponseHandler(res, found)
        }).catch(err => {
            defaultResponseHandler(res, null, err);
        })
}
const update = (req, res) => {
    const updateGame = {
        name: req.body.name,
        motionPictureRate: req.body.motionPictureRate,
        details: {
            platform: req.body.details?.platform,
            releasedYear: req.body.details?.releasedYear,
            pictureURL: req.body.details?.pictureURL,
            price: req.body.details?.price,
        }
    }
    gameModel.updateOne({ _id: req.params.gameId }, updateGame).exec((err, found) => {
        defaultResponseHandler(res, found, err)
    })
}

module.exports = {
    create,
    getAll,
    getOne,
    update,
    deleteOne,
}
