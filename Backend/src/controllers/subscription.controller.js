import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import {Subscription} from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import { Apiresponse } from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    const userId = req.user._id;

    if (!channelId) {
        throw new ApiError(400, "Channel ID is required");
    }
    if(!isValidObjectId(userId)){
        throw new ApiError(400, "Invalid object ID");
    }

    if(userId.toString()==channelId){
        throw new ApiError(400, "You are not allowed to subscribe");  
    }

    const existingSubscription = await Subscription.findOne({
        subscriber: userId,
        channel: channelId
    });

    if(existingSubscription){
        await existingSubscription.deleteOne();

        return res.status(200).json(
            new Apiresponse(201, 0, "Unsubscribed Successfully" )
        )
    }
    else{
        await Subscription.create   ({
            subscriber: userId,
            channel:channelId
        })

        return res.status(200).json(
            new Apiresponse(201, 1, "Subscribed Successfully" )
        )
    }
   
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {subscriptionId} = req.params
    // console.log(subscriptionId)
    if(!subscriptionId) {
        throw new ApiError(404, "Invalid subscriptionId");
    }

    const userSubscribers = await Subscription.find({
        channel : subscriptionId
    }).populate("subscriber")

    return res.status(200).json(
         new Apiresponse(200, userSubscribers, "users's subscribers fetch successfully")
    )
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!channelId) {
    throw new ApiError(404, "Invalid channelId");
  }

  const subscribedChannel = await Subscription.aggregate([
    {
      $match: {
        subscriber: new mongoose.Types.ObjectId(channelId),
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'channel',
        foreignField: '_id',
        as: 'channelDetails',
      },
    },
    {
      $unwind: '$channelDetails', // Unwind the channelDetails array to modify it
    },
    {
      $lookup: {
        from: 'subscriptions', // Assuming subscriptions collection contains subscribers info
        localField: 'channel',
        foreignField: 'channel',
        as: 'subscribersList',
      },
    },
    {
      $addFields: {
        'channelDetails.subscribersList': '$subscribersList', // Add the subscribers list directly into channelDetails
        'channelDetails.subscribersCount': {
          $size: '$subscribersList', // Count the subscribers and add to channelDetails
        },
      },
    },
    {
      $group: {
        _id: '$_id',
        channelDetails: { $push: '$channelDetails' }, // Rebuild the channelDetails array
      },
    },
  ]);

  if (!subscribedChannel) {
    throw new ApiError(404, "No subscribed channels found");
  }

  return res
    .status(200)
    .json(
      new Apiresponse(200, subscribedChannel, "Fetched subscribed channels successfully")
    );
});


export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}