import mongoose from 'mongoose';


export async function connect(){
    try {
       mongoose.connect(process.env.MONGO_URI!)
       const connection = mongoose.connection

       connection.on('connected',()=>{
            console.log("Db is connected")
       })
       
       connection.on('error',(err)=>{
            console.log('Db error')
            process.exit()
       })

    } catch (error) {
        console.log(error)
    }
}