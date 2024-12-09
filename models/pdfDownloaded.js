const mongoose = require("mongoose")

const TopicsPdfDownloadedSchema = new mongoose.Schema({
    name : {  type : String,  required : true  },
    email : {  type :String ,  required : true },
    pdfName : { type : String , required : true },
    date: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Pdf",TopicsPdfDownloadedSchema)