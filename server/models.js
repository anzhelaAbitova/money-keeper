const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = new Schema({
    name: {
      type: String,
      required: true,
      index: { 
        unique: true 
      }
    },
    email: {
      type: String,
      required: true,
      index: { 
        unique: true 
      }
    },
    password: {
      type: String,
      required: true,
    },
    versionKey: false,
  });
  
const interactionScheme = new Schema({
    user: {
       type: Schema.Types.ObjectId,
       ref: 'User',
       required: true,
    },
    number: {
      type: Number,
      default: 1,
      min: 1,
    },
    name: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    regular: {
      type: Boolean,
    },
    versionKey: false,
});

const User = mongoose.model("User", userScheme);
const Interaction = mongoose.model("interaction", interactionScheme);

module.exports = {
    User, Interaction
}
