const express=require('express')
const app=express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const router=express.Router()
const checklist = require('../models/checklist');
var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage }); 
router.post('/createChecklist', upload.single('image'), (req, res, next) => {
  
    var obj = {
        isExist: req.body.isExist,
        category: req.body.category,
        driveNumber:req.body.driverDetails,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            // res.redirect('/');
        }
    });
});




module.exports = router