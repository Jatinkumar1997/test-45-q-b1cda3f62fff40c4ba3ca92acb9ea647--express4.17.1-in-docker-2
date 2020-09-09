var express = require('express');
var router = express.Router();
var Lead = require('../models/lead')

// fetch a lead
router.get('/:lead_id',async (req,res)=>{
    if(!req.params.lead_id){
        res.status(400).send({
            "status":"failure",
            "reason":"explanation"
        })
    }
    try{
        const lead = await Lead.findById(req.params.lead_id)
        res.status(200).send(lead)
    }
    catch(e){
        res.status(404).send({
            "status":"failure",
            "reason":"Lead not found"
        })
    }
    
    
})

router.post('/', async (req,res)=>{
    try{
        const reqLead = req.body
        reqLead.status = 'Created'
        const newLead = new Lead(reqLead)
        await newLead.save()
        console.log('Lead Saved')
        res.status(201).send({newLead})
    }
    catch(e){
        console.error(e)
        res.status(400).send({
            "status":"failure",
            "reason":e.message
        })
    }
})

router.put('/:lead_id', async (req,res)=>{
    if(!req.params.lead_id){
        res.status(400).send({
            "status":"failure",
            "reason":"Lead Not Found"
        })
    }
    try{
        const lead = await Lead.findById(req.params.lead_id)
        if(lead){
            lead.first_name = req.body.first_name
            lead.last_name = req.body.last_name
            lead.mobile = req.body.mobile
            lead.email = req.body.email
            lead.location_type = req.body.location_type
            lead.location_string = req.body.location_string
            await lead.save()
            res.status(202).send({
                "status":"success"
            })
        }
    }
    catch(e){
        console.error(e)
        res.status(400).send({
            "status":"failure",
            "reason":e.message
        })
    }
})

router.delete('/:lead_id', async (req,res)=>{
    if(!req.params.lead_id){
        res.status(400).send({
            "status":"failure",
            "reason":"empty lead id"
        })
    }
    try{
        await Lead.deleteOne({_id:req.params.lead_id})
        res.status(200).send({
            "status":"success"
        })
    }
    catch(e){
        console.error(e)
        res.status(400).send({
            "status":"failure",
            "reason":e.message
        })
    }
})

module.exports = router;