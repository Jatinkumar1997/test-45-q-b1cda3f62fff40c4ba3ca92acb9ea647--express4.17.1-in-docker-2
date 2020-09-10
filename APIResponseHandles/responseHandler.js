
class responseHandler{
    sendSuccess(res,obj){
        return res.status(200).send(obj)
    }

    sendCreated(res,obj){
        return res.status(201).send(obj)
    }

    sendUpdated(res,obj){
        return res.status(202).send(obj)
    }

    sendNotFound(res,obj){
        return res.status(404).send(obj)
    }

    sendBadRequest(res,obj){
        return res.status(400).send(obj)
    }
}

module.exports = responseHandler