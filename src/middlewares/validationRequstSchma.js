const {validationResult}=require("express-validator");
const { NextFunction,Request,Responce}=require("express");

const validationRequestSchma=(req,res,next)=>{
const error=validationResult(req);
if(!error.isEmpty()){
    res.status(400).json({errors:error.array()})
}

}
module.exports=validationRequestSchma;