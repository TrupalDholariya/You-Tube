import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {Apiresponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params 
    //TODO: toggle like on video
    if(!videoId){
        throw new ApiError(404 , "Missing videoId")
    }
    const existingVideoLike = await Like.findOne({
        video : videoId,
        LikedBy : req.user._id
    })
    // console.log(existingVideoLike)
    if(existingVideoLike){
        await existingVideoLike.deleteOne()

        return res.status(200).json(
            new Apiresponse(201,0,"Remove Like Successful")
        )
    }
    else{
        const krish = await Like.create({
            video : videoId,
            LikedBy : req.user._id
        })
        return res.status(200).json(
            new Apiresponse(201,1,"Add Like Successful")
        )
    }
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment
    if(!commentId){
        throw new ApiError(401, "Missing CommentId")
    }

    const existingCommentLike = await Like.findOne({
        comment : commentId,
        LikedBy : req.user._id
    })

    if(existingCommentLike){
        await existingCommentLike.deleteOne();

        return res.status(200).json(
            new Apiresponse(200, 0, "Remove Like from comment")
        )
    }
    else {
        await Like.create({
            comment : commentId,
            LikedBy: req.user._id
        })
        return res.status(200).json(
            new Apiresponse(200, 1, "Remove Like from comment")
        )
    }

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    if(!tweetId){
        throw new ApiError(401, "Missing TweetId")
    }

    const existingTweetLike = await Like.findOne({
        tweet : tweetId,
        LikedBy : req.user._id
    })
    console.log(existingTweetLike)

    if(existingTweetLike){
        await existingTweetLike.deleteOne();

        return res.status(200).json(
            new Apiresponse(200, 0, "Remove Like from Tweet")
        )
    }
    else {
        await Like.create({
            tweet : tweetId,
            LikedBy: req.user._id
        })
        return res.status(200).json(
            new Apiresponse(200, 1, "Add Like from Tweet")
        )
    }

}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    console.log("working")
    const likes = await Like.aggregate([
        {
            $lookup: {
                from :'videos',
                localField: 'video',
                foreignField: '_id',
                as: 'videoDetails'
            }
        },
        {
            $unwind :'$videoDetails'
        },
        {
            $lookup: {
                from : 'users',
                localField: 'videoDetails.owner',
                foreignField : '_id',
                as: 'videoDetails.ownerDetails'
            }
        },
        {
            $unwind : '$videoDetails.ownerDetails'
        }
    ])
    // console.log(likes)

    if(!likes){
        throw new ApiError(401 , "something went wrong when trying to collect liked videos")
    }

    return res.status(200).json(
        new Apiresponse(200,likes, "liked video fetch successfully")
    )
})


const getLikedTweet = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
  console.log("working");
  const likes = await Like.aggregate([
    {
      $lookup: {
        from: "tweets",
        localField: "tweet",
        foreignField: "_id",
        as: "tweetDetails",
      },
    },
    {
      $unwind: "$tweetDetails",
    },
    // {
    //   $lookup: {
    //     from: "users",
    //     localField: "videoDetails.owner",
    //     foreignField: "_id",
    //     as: "videoDetails.ownerDetails",
    //   },
    // },
    // {
    //   $unwind: "$videoDetails.ownerDetails",
    // },
  ]);
  // console.log(likes)

  if (!likes) {
    throw new ApiError(
      401,
      "something went wrong when trying to collect liked videos"
    );
  }

  return res
    .status(200)
    .json(new Apiresponse(200, likes, "liked video fetch successfully"));
});

export {
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
  getLikedVideos,
  getLikedTweet,
};