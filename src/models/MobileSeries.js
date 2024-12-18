const   mongoose= require("mongoose")


const SeriesSchema = new mongoose.Schema({

	Name : {
		type : String,
		required: true,
		index: true,
	}
} , {timestamps : true})

 const MobileSeries = mongoose.model("MobileSeries" , SeriesSchema);
 module.exports=MobileSeries;