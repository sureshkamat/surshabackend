const ErrorHandler=require("../utils/errorHandler")

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error"


    //Wrong mongodb ID Cast Error
    if(err.name==="CastError"){
        const message=`Resource not Found Invalid:${err.path}`;
        err=new ErrorHandler(message,404);
    }

//Mongoose duplicate error key
if(err.code===11000){
    const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
    err=new ErrorHandler(message,400);
}

 //Wrong Jwt TokenError
 if(err.name==="JsonwebTokenError"){
    const message=`Json Web ToKen is Invalid Try Again`;
    err=new ErrorHandler(message,404);
}
//JWT Expires Error
if(err.name==="TokenExpiredError"){
    const message=`Json Web ToKen is Expired, Try Again`;
    err=new ErrorHandler(message,404);
}

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}