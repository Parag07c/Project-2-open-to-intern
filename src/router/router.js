const express=require("express")
const router=express.Router()
const collegeController=require("../controller/collegeController")
const internController= require("../controller/internController")


router.post('/functionup/colleges',collegeController.createCollege)
router.post('/functionup/interns',internController.createIntern)
router.get('/functionup/collegeDetails',collegeController.getDetail)

router.all("/*",function(req,res){
    res.status(400).send({uparDekho:"Endpoint galath dala hai tune"
}
)
}
)


module.exports=router;