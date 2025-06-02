const Message = require('../Chat/chatSchema');
const mongoose=require('mongoose')
// Send a new message
exports.sendMessage = async (req, res) => {
    // console.log(req.body);

    try {
        const { msg, fromUser, fromRole, toUser, toRole, productId } = req.body;

        const newMessage = new Message({
            msg,
            fromUser,
            fromRole,
            toUser,
            toRole,
            productId
        });

        await newMessage.save();

        res.status(201).json({ success: true, message: 'Message sent successfully', data: newMessage });
    } catch (error) {
        console.error('Send Message Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all messages between 2 users for a specific product
exports.getMessages = async (req, res) => {
    try {
        const { fromUser, toUser, productId } = req.params;

        const messages = await Message.find({
            productId,
            $or: [
                { fromUser, toUser },
                { fromUser: toUser, toUser: fromUser }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        console.error('Get Messages Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.getAllChatsForArtisan = async (req, res) => {
    try {
      const artisanId = new mongoose.Types.ObjectId(req.params.artisanId);
  
      const messages = await Message.aggregate([
        {
          $match: {
            $or: [
              { fromUser: artisanId },
              { toUser: artisanId }
            ]
          }
        },
        {
          $project: {
            msg: 1,
            productId: 1,
            fromUser: 1,
            toUser: 1,
            otherUser: {
              $cond: [
                { $eq: ["$fromUser", artisanId] },
                "$toUser",
                "$fromUser"
              ]
            }
          }
        },
        {
          $sort: { _id: 1 }
        },
        {
          $group: {
            _id: { otherUser: "$otherUser", productId: "$productId" },
            lastMessage: { $last: "$$ROOT" }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "_id.otherUser",
            foreignField: "_id",
            as: "userData"
          }
        },
        {
          $lookup: {
            from: "artworks",
            localField: "_id.productId",
            foreignField: "_id",
            as: "productData"
          }
        },
        {
          $project: {
            _id: 0,
            toUser: "$_id.otherUser",
            productId: "$_id.productId",
            user: { $arrayElemAt: ["$userData", 0] },
            product: { $arrayElemAt: ["$productData", 0] },
            lastMessage: 1
          }
        }
      ]);
  
      res.status(200).json({ success: true, data: messages });
    } catch (err) {
      console.error("Error fetching chats:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };