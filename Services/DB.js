const mongoose = require('mongoose')
class DB{
    static createConnection=async()=>{
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
    
        console.log(`MongoDB Connected : ${con.connection.host}`);
    }
}
module.exports=DB;