var mongoose = require('mongoose');

var WineSchema = new mongoose.Schema({
	name:{type:String, required: true},
	origin:{type:String},
	vintage:{type: Number, max:2016, min: 1565},
	abv:{type:Number, min:0, max:100},
	price:{type:Number, min: 0},
	colour:{type: String,}

});

module.exports=mongoose.model("Wine", WineSchema);