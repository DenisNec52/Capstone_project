const mongoose = require('mongoose');

const { Schema } = mongoose;

const pinSchema = new Schema({
  image: { type: String, required: true },
  description: { type: String, required: false },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  tags: { type: Array, required: false },
  count: { type: Number, required: false },
});

PageSchema.statics.findByTag = function (tag) {
  return this.find({ tags: { $elemMatch: { $eq: tag } } }).exec();
};



const Pin = mongoose.model('pin', pinSchema);

module.exports = Pin;
