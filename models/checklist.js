
const { optional } = require('@hapi/joi/lib/base');
const mongoose=require('mongoose')

// create checklistSchema using mongoose schema
const checklistSchema = new mongoose.Schema({
    isExist:
    {
        type: Boolean,
        required:true
    },
    category:
    {
        type:String,
        required:true
    },
    driverDetails:
    {
        type: String,
        required:true  
    },
    img:
    {
        data: Buffer,
        contentType: String
    },
    summary:
    {
        type:String
    }
  
  });
 
  //set the schema in mongoose model
  const checklist=mongoose.model('Checklist',checklistSchema)

  //export model for  further use
  module.exports=checklist


