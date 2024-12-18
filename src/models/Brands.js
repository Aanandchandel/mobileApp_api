const mongoose =require("mongoose");


const BrandSchema = new mongooseSchema({

	Name : {
		type : String,
		required: true,
		index: true,
	},
	FilePath : {
		type : String,
		required: true,
	}
} , {timestamps : true})

 const MobileBrand = mongoose.model("MobileBrand" , BrandSchema);
 module.exports=MobileBrand;