const Lead = require('../models/lead')

class LeadService{
    
    async getLead(req){
        try{
            const lead = await Lead.findOne({id:req.params.lead_id})
            if(lead){
                return {
                    'status':"success",
                    lead
                }
            }
            else{
                return {
                    "status":"failure",
                    "reason":"Lead not found"
                }
            } 
        }
        catch(e){
            console.error('Getting issue:'+e.message)
            return {
                "status":"failure",
                "reason":e.message
            }
        }
    }

    async createLead(req){
        try{
            const reqLead = req.body
            reqLead.status = 'Created'
            reqLead.id = Math.floor(Math.random()*100)
            const newLead = new Lead(reqLead)
            await newLead.save()
            return {
                "status":"success",
                newLead
            }
        }
        catch(e){
            console.error("Creation issue:"+e.message)
            return {
                "status":"failure",
                "reason":e.message
            }
        }
    }

    async updateLead(req){
        try{
            const lead = await Lead.findOne({id:req.params.lead_id})
            if(lead){
                lead.first_name = req.body.first_name
                lead.last_name = req.body.last_name
                lead.mobile = req.body.mobile
                lead.email = req.body.email
                lead.location_type = req.body.location_type
                lead.location_string = req.body.location_string
                await lead.save()
                return {
                    "status":"success"
                }
            }
        }
        catch(e){
            console.error("Update issue: "+ e.message)
            return {
                "status":"failure",
                "reason":e.message
            }
        }
    }

    async deleteLead(req){
        try{
            await Lead.deleteOne({id:req.params.lead_id})
            return {
                "status":"success"
            }
        }
        catch(e){
            console.error("Deletion issue:" + e.message)
            return {
                "status":"failure",
                "reason":e.message
            }
        }  
    }

    async markLead(req){
        try{
            const fetchLead = await Lead.findOne({id:req.params.lead_id})
            if(fetchLead){
              fetchLead.status = 'Contacted'
              fetchLead.communication = req.body.communication
              fetchLead.save()
              return{
                  status:"success",
                  markRes: {
                    "status": "Contacted",
                    "communication": req.body.communication 
                }
            }
            }
            else{
              return {
                "status":"failure",
                "reason": "lead id not found in DB"
              }
            }
          }
        catch(e){
            return {
              "status":"failure",
              "reason":e.message
            }
          }
    }
}

module.exports = LeadService