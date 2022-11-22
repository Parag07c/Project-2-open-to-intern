const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel')

const isValid = function (value) {
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === "undefined" || value === null) return false
    return true;
};

const isValidName = function (name) {
    return /^[A-Za-z\s]{1,15}$/
        .test(name)
}
const validateEmail = function (email) {
    return (/^[a-z0-9_]{3,}@[a-z]{3,}[.]{1}[a-z]{3,6}$/).test(email)

}
const isValidMobile = function (mobile) {
    if (/^[0-9]\d{9}$/.test(mobile)) {
        return true
    }
}


const createIntern = async function (req, res) {
    try {
        const data = req.body
        if (Object.keys(data).length == 0) return res.status(404).send({ status: false, msg: "Please provide Intern Details." })
        let { name, email, mobile, collegeName } = data
        //edge cases
        if (!isValid(name)) return res.status(400).send({ status: false, msg: "Intern name must be required." })
        if (!isValidName(name)) return res.status(400).send({ status: false, msg: "Intern name must consist of only leters." })

        if (!isValid(mobile)) return res.status(400).send({ status: false, msg: "mobile must be required." })
        mobile=data.mobile.trim()
        if (!isValidMobile(mobile)) return res.status(400).send({ status: false, msg: "Please enter valid mobile." })

        let doc = await internModel.findOne({ mobile: mobile, isDeleted: false })
        if (doc) return res.status(400).send({ status: false, msg: "mobile is already registered." })

        if (!isValid(email)) return res.status(400).send({ status: false, msg: "email must be required." })
        email=data.email.trim()
        if (!validateEmail(email)) return res.status(400).send({ status: false, msg: "Please enter valid email." })
        
        let emaildoc = await internModel.findOne({ email: email, isDeleted: false })
        if (emaildoc) return res.status(400).send({ status: false, msg: "email is already registered." })

        if (!isValid(collegeName)) return res.status(400).send({ status: false, msg: "collegeName must be required." })
        if (!isValidName(collegeName)) return res.status(400).send({ status: false, message: "collegeName can contain only letters" })
        
        let collegeDetails = await collegeModel.findOne({ name: collegeName.toLowerCase(), isDeleted: false })
        if (!collegeDetails) return res.status(400).send({ status: false, msg: "college not found..Please try with another college Name." })
        data["collegeId"] = collegeDetails["_id"]

        let result = await internModel.create(data)
        return res.status(201).send({ status: true, data: result })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}

module.exports = { createIntern }