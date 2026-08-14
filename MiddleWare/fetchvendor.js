const jwt=require("jsonwebtoken");
const JWT_Secret = process.env.JWT_SECRET;
const fetchvendor=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).json({error:"please authenticate using valid token"});
    }
    try{
    const data=jwt.verify(token, process.env.JWT_SECRET);
    req.vendor=data.vendor;
    next();
    }
    catch(error){
        res.status(401).json({error:"please authenticate using valid token"});
    }

}
module.exports=fetchvendor;