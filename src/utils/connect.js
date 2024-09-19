import mongoose from "mongoose"

export async function connectDB(){
    try {
        if (mongoose.connections && mongoose.connections[0].readyState) return;

        const { connection } = await mongoose.connect(
            process.env.MONGO_URI,
            {
                dbName: "servphere",
            }
        );

        console.log(`Connecting to database: ${connection.host}`)
    } catch (error){
        console.log(error.message);
    }
}