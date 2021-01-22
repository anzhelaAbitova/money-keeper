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
  
const incomeScheme = new Schema({
    user: {
       type: Schema.Types.ObjectId,
       ref: 'User',
       required: true,
    },
    number: {
      type: Number,
      required: true,
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

const expenseScheme = new Schema({
    user: {
       type: Schema.Types.ObjectId,
       ref: 'User',
       required: true,
    },
    number: {
      type: Number,
      required: true,
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
const Income = mongoose.model("Income", incomeScheme);
const Expense = mongoose.model("Expense", expenseScheme);
/*
module.exports = User;
module.exports = Income;
module.exports = Expense*/

module.exports = {
    User, Income, Expense
}
