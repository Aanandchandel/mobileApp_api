const mongoose=require("mongoose") 


const ModelSchema = new mongooseSchema({

	image : {
		type : String,
		required: true,
		index: true,
	},
	Name : {
		type : String,
		required: true,
	}
} , {timestamps : true})

const MobileModel = mongoose.model("MobileModel" , ModelSchema);
module.exports=MobileModel