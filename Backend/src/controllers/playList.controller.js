import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {Apiresponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body

    if(!name || !description){
        throw new ApiError(400, "Missing name or description")
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user._id
    })
    if(!playlist){
        throw new ApiError(404, "something went wrong while creating playlist ")
    }

    return res.status(200).json(
        new Apiresponse(201 , playlist, "playlist created successfully")
    )
    //TODO: create playlist
})


const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params

    if(!userId){
        throw new ApiError(404, "Missing userId")
    }

    const userPlaylist = await Playlist.aggregate([
        {
            $match :{
                owner: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField : "videos",
                foreignField : "_id",
                as: "videoData"
            }
        },
        {
            $addFields:{
                totalViews :{
                    $sum: "$videoData.views" 
                }
            }
        }
    ])

    if(!userPlaylist){
        throw new ApiError("something went wrong while generating userplaylist");
    }

    return res.status(200).json(
        new Apiresponse(201,userPlaylist, "User playlist fetch successfully")
    )
    //TODO: get user playlists
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    if (!playlistId) {
        throw new ApiError(404, "Missing playlistId");
    }

    // Find the playlist by ID and populate both videos and their owner
    const playlist = await Playlist.findById(playlistId)
        .populate({
            path: "videos",
            populate: {
                path: "owner",  // Populates the owner of each video
                select: "userName avatar",  // Customize to include only necessary fields (optional)
            }
        })
        .populate("owner");  // Populate the owner of the playlist itself

    if (!playlist) {
        throw new ApiError(404, "Something went wrong while fetching the playlist");
    }

    // Calculate total views
    const totalViews = playlist.videos.reduce((sum, video) => sum + (video.views || 0), 0);

    // Convert playlist to a plain object and add totalViews
    const playlistWithViews = { ...playlist.toObject(), totalViews };

    return res.status(200).json(
        new Apiresponse(201, playlistWithViews, "Playlist fetched successfully")
    );
});


const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {videoId,playlistId } = req.params
    // console.log(req.params);
    

    if(!playlistId || !videoId){
        throw new ApiError(400, "playlistId and videoId not found")
    }
    
        const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $push: {
                videos :videoId
            }
        },
        {
            $lookup: {
                from: "Video",
                localField : "videoId",
                foreignField : "_id",
                as: "videoData"
            }
        },
        {new: true}
    ).populate("videos")

    if(!playlist){
        throw new ApiError(400, "Something went wrong while add video to playlist") 
    }

    return res.status(200).json(
        new Apiresponse(200,playlist,"add video Successfully")
    )
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { videoId,playlistId} = req.params
    // TODO: remove video from playlist

    if(!playlistId || !videoId){
        throw new ApiError(400, "Missing playlist and videoid")
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pull: { videos: videoId } // Removes the videoId from the videos array
        },
        { new: true } // Returns the updated document
    );

    return res.status(200).json((
        new Apiresponse(200, updatedPlaylist,"remove video Successfully")
    ))

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist
    if(!playlistId){
        throw new ApiError(400 , "Missing playlist");
    }
    const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);

    return res.status(200).json(
        new Apiresponse(200, deletedPlaylist, "Delete playlist successfully")
    )
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body

    if(!playlistId || !name || !description){
        throw new ApiError(400, "Missing playlist or name or description"); 
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set: {
                name: name,
                description: description
            }
        },
        { new: true }
    )

    if(!updatedPlaylist){
        throw new ApiError(404, "Playlist not found");
    }

    return res.status(200).json(
        new Apiresponse(200, updatedPlaylist, "Update playlist successfully")
    )
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}