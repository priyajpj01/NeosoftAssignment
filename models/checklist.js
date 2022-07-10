
const mongoose=require('mongoose')

// Creating checklistSchema using mongoose schema
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
    }
  
  });
 
  //Set the schema in mongoose model
  const checklist=mongoose.model('Checklist',checklistSchema)

  //Export model for  further use
  module.exports=checklist


