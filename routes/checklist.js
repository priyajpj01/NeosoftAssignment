const express=require('express')
const app=express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const router=express.Router()
const checklist = require('../models/checklist');
const validateChecklist = require("../src/validate");
var multer = require('multer');
var fs=require('fs')
var path=require('path') 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'routes/uploads')
    },
    filename: (req, file, cb) => {
        console.log("ddd..."+file.fieldname )
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage }); 
// upload.single('image')
router.post('/createChecklist',upload.single('image'), async(req, res, next) => {


const response= validateChecklist.checklistValidation(req.body);
//check Validation
if(response.error)
{

    return res.status(400).json(response.error.details[0]['message'])

}
    var obj = {
        isExist: req.body.isExist,
        category: req.body.category,
        driverDetails:req.body.driverDetails,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
   const checklists= await new checklist(obj)
   await checklists.save()
   res.status(200).send({checklists})
});




module.exports = router