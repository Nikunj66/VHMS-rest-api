const jwt=require('jsonwebtoken');

class JWT{
    static generateToken=async(data)=>{
        return await jwt.sign(data, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
    };
}
module.exports=JWT