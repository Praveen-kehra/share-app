const mongoose = require("mongoose");

const postMessageSchema = mongoose.Schema({
        title:{
            type: String,
            default: "User",
            max: 20
        },
        message:{
            type: String,
            max: 100,
        },
        creator:{
            type: String,
            require: true,
        },
        tags : {
            type: [String],
        },
        selectedFile: {
            type: String,
        },

        likeCount :{
            type: Number,
            default: 0,
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postMessageSchema);