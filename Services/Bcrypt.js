const bcrypt=require('bcryptjs');

class Bcrypt{
    static encodePassword= async(password, size=33)=>{
        const salt=await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    static comparePassword= async(password1, password2)=>{
        var match = await bcrypt.compare(password1, password2);
        return match;
    }
}

module.exports=Bcrypt;