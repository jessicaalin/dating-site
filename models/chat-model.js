const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    fullName: {
    type: String
    },
    content: {
      type: String
    },
    created: {
      type: Date,
      default: Date.now
    },
    owner: {
      type: Schema.Types.ObjectId
    }
  },
  {
    timestamps: true
  }
);

const ChatModel = mongoose.model("Chat", chatSchema);

module.exports = ChatModel;
