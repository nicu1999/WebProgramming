var mongoose = require('mongoose')

var ObjectId = mongoose.Schema.ObjectId


var commentSchema = new mongoose.Schema({
    idWaypoint: {
        type: ObjectId,
    },

    comment: {
        type: String,
    }
    
})


module.exports = mongoose.model("Comment", commentSchema)