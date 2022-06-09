var mongoose = require('mongoose')
var waypointSchema = new mongoose.Schema({
    waypointType : {
        type: String,
        //required: true,
    },
    waypointTitle : {
        type: String,
    },
    waypointAttributesList : {
        type: Array,
    },
    waypointDangerouseRadius : {
        type: Number,
    },
    waypointDescription : {
        type: String,
    },
    position:{
        lng : {
            type: Number,
        },
        lat : {
            type: Number,
        },   
    }
})

//waypointSchema.index( {nume: 1}, {unique: true})

module.exports = mongoose.model("Waypoint", waypointSchema)