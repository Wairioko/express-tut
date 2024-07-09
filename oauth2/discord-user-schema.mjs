import mongoose from "mongoose";

const discordSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    discordId:{
        type: String,
        unique: true,
        required: true
    }
})


export const discordUser = mongoose.model("discordUser", discordSchema);

