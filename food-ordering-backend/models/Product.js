const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { 
        type: Number, 
        required: true,
        min: 0 // Ensure price is not negative
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    quantity: { type: Number, default: 0, min: 0 }, // Ensure quantity is not negative
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

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
