import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

export const connectToMongo = async () => {
    try{
        const connString ="mongodb+srv://dpadin:QnmO8JdtY3uZW2r5@cluster0.rksqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        mongoose.connect(connString,{dbName: 'BackEndProducts'})
        //mongoose.connect(process.env.MONGO_KEY,{dbName: 'BackEndProducts'})

            .then(() => console.log('Se conecto a la base de datos'))
    } catch (e) {
        console.log('Error al conectarse a la base de datos')
        console.log(e)
    }
} 