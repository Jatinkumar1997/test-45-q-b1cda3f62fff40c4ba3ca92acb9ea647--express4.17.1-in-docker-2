var express = require('express');
var router = express.Router();
var leadService = require('../services/leads')
var responseHandler = require('../APIResponseHandles/responseHandler')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/api/mark_lead/:lead_id',async (req,res)=>{

  const markleadRes = await new leadService().markLead(req)
  if(markleadRes.status==='success'){
    return new responseHandler().sendUpdated(res,markleadRes.markRes)
  } 
  else{
    return new responseHandler().sendBadRequest(res,markleadRes)
  }
})

module.exports = router;
