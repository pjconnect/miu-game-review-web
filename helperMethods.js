function defaultResponseHandler(res, data, err){
    if(err){
        console.error(err);
        res.status(400).send(err);
        return;
    }
    res.status(200).send(data);
}

module.exports ={
    defaultResponseHandler,
}