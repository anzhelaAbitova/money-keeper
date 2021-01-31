const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = new Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
  image: String,
  createdAt: Date,
  versionKey: false,
});

const interactionScheme = new Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  },
  number: {
    type: Number,
    default: 1,
    min: 1,
  },
  work: {
    type: String,
    required: true,
  },
  contractor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contractor',
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

const contractorScheme = new Schema ({
  name: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  works: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interaction',
    required: true,
  },
  regular: {
    type: Boolean,
  },
  versionKey: false,
});

const User = mongoose.model("User", userScheme);
const Interaction = mongoose.model("Interaction", interactionScheme);
const Contractor = mongoose.model("Contractor", contractorScheme);

module.exports = {
    User, Interaction, Contractor
}
