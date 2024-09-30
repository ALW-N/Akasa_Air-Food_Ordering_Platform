const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { 
        type: String,
        validate: {
            validator: function(v) {
                return /^data:image\/[a-zA-Z]+;base64,/.test(v); // Validate Base64 format
            },
            message: props => `${props.value} is not a valid Base64 image string!`
        }
    } // Store image as Base64 string
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
