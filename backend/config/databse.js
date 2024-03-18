const mongoose=require('mongoose')


const connection=mongoose.connect(process.env.DB_URI)

module.exports={connection}