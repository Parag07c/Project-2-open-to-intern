const collegeModel = require("../models/collegeModel");
const internModel=require("../models/internModel")

const isValid = function (value) {
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === "undefined" || value === null) return false
    return true;
};

const isValidLink=function(link){
    if(/^(http[s]?:\/\/.*\.(?:png|jpeg))$/g.test(link)){
        return true
    }
}
const isValidShortName=function(name){
    if(/^[a-z]{2,20}$/i.test(name)){
        return true
    }
}
const isValidFullName=function(fullname){
    if(/^[a-z ,&-]{2,200}$/i.test(fullname)){
        return true
    }
}


const createCollege= async function(req,res){
    try {
        let data =req.body
        let {name,fullName,logoLink}=data
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Data is required for college Creation" });
        }
        if(!isValid(name)){
            return res.status(400).send({ status: false, msg: "Name is required" });
        }   
        data.name=data.name.toLowerCase()

        if(!isValidShortName(name)){
            return res.status(400).send({ status: false, msg: "Name should be contain alphabets only" });

        }
        let valid =await collegeModel.findOne({name:name, isDeleted:false})
        if(valid){
            return res.status(400).send({status:false,msg:"Name already exist"})
        }
        if(!isValid(fullName)){
            return res.status(400).send({ status: false, msg: "fullName is required" });
        }   
        if(!isValidFullName(fullName)){
            return res.status(400).send({ status: false, msg: "fullName should be contain alphabets only" });

        }
        if(!isValidLink(logoLink)){
            return res.status(400).send({ status: false, msg: "Please enter a valid logoLink" });

        }
        const creatData= await collegeModel.create(data)
       
        return res.status(201).send({status:true,msg:creatData})


    } catch (error) {
        return res.status(500).send({status:false,msg:error.message})
    }
}

const getDetail=async function(req,res){
    try {
        let collegeName = req.query.collegeName
        if (!collegeName) {
            return res.status(400).send({ status: false, message: "Please provide a college Name" })
        }
        if (!isValidShortName(collegeName)) {
            return res.status(400).send({ status: false, message: "collegeName can contain only letters" })
        }
        let collegeDetail = await collegeModel.findOne({ name: collegeName.toLowerCase() , isDeleted:false})
        if (!collegeDetail) {
            return res.status(404).send({ status: false, message: "No college exists with this Name" })
        }
        let ColId = collegeDetail["_id"]
        let Interns = await internModel.find({ collegeId: ColId ,isDeleted:false}).select({name:1,email:1,mobile:1})
       
        let data={name:collegeDetail.name,fullName:collegeDetail.fullName,logoLink:collegeDetail.logoLink,interns:Interns}
        return res.status(200).send({data:data,status:true})
    }
    catch (error) {
        return res.status(500).send({status:false,msg:error.message})
        
    }
}

module.exports={createCollege,getDetail}


