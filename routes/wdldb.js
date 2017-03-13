var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var user={ name:{type:String},password:{type:String}};
global.db = mongoose.connect("mongodb://localhost:27017/mynode");
mongoose.model('user',new Schema(user))
module.exports = { 
    getModel: function(type){
        return mongoose.model(type);
    }
};
var _getModel = function(type){ 
    return mongoose.model(type);
};