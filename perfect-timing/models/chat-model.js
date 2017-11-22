const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    content: {
      type: String
    },
    created: {
      type: Date,
      default: Date.now
    }
  }
);

const ChatModel = mongoose.model("Chat", chatSchema);

module.exports = ChatModel;
