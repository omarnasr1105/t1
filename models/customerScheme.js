const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// define the Schema (the structure of the article)
const customerScheme = new Schema({
  id : String,
  firstName:String,
  lastName : String,
  email : String,
  phoneNumber :String,
  age : Number,
  country : String,
  gender : String
},
{ timestamps: true ,
  
}
);




// Create a model based on that schema
const User = mongoose.model("customer", customerScheme);




// export the model
module.exports = User











