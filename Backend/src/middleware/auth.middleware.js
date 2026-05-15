const jwt=require('jsonwebtoken')


 const authUser=async (req,res,next)=>{
    const token=req.cookies.token
    try{

        if(!token){
            return res.status(401).json({message:'Unauthorized'})
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)

        req.user=decoded

        console.log(decoded)

        next()



    }catch(error){
        console.error('Error in auth middleware:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}


module.exports={
    authUser
}