var express = require('express');
var router = express.Router();
var leadService = require('../services/leads')
var responseHandler = require('../APIResponseHandles/responseHandler')

// fetch a lead
router.get('/:lead_id',async (req,res)=>{
    const fetchRes = new leadService().getLead(req)
    if(fetchRes.status === 'success'){
        return new responseHandler().sendSuccess(res,fetchRes.lead)
    }
    else{
        if(fetchRes.reason.contains('not found')){
            return new responseHandler().sendNotFound(res,fetchRes)
        }
        else{
            return new responseHandler().sendBadRequest(res,fetchRes)
        }
    }
})

router.post('/', async (req,res)=>{

    const createRes = await new leadService().createLead(req)
    if(createRes.status === 'success'){
        return new responseHandler().sendCreated(res,createRes.newLead)
    }
    else{
        return new responseHandler().sendBadRequest(res,createRes)
    }
})

router.put('/:lead_id', async (req,res)=>{

    const updateRes = await new leadService().updateLead(req)
    if(updateRes.status==='success'){
        return new responseHandler().sendUpdated(res,updateRes)
    }
    else{
        return new responseHandler().sendBadRequest(res,updateRes)
    }
})

router.delete('/:lead_id', async (req,res)=>{
    
    const deleteRes = await new leadService().deleteLead(req)
    if(deleteRes.status === 'success'){
        return new responseHandler().sendSuccess(res,deleteRes)
    }
    else{
        return new responseHandler().sendBadRequest(res,deleteRes)
    }
})

module.exports = router;