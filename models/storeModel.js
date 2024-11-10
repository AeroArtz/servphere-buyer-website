import mongoose from "mongoose";

const storeSchema = mongoose.Schema({
    ownerEmail : { type: String },
    img: { type: String, default:'' },
    bio: { type: String, default:'' },
    link: { type: String, default:'' },
    location: { type: String, default:'' },
    username: { type: String, default:'' },
    themeColor: { type: String, default:'' },
    socialLinks : {
        insta: { type: String },
        tiktok: { type: String },
        youtube: { type: String },
    },
    
    services: [


    ]
},
{
    timestamps: true
})

export const Store = mongoose.models?.Store || mongoose.model("Store",storeSchema)


