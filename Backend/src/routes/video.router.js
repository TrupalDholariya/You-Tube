import { Router } from "express";
import {  deleteVideo, getAllVideos, getVideoById, publishAVideo, publishVideoWithUrls, getUploadSignature, updateVideo,togglePublishStatus, viewUpdate } from "../controllers/video.controller.js";
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router =  Router();
router.use(verifyJWT);

// New route for client-side upload (no file upload middleware)
router.route("/upload-signature").get(getUploadSignature);
router.route("/publish-with-urls").post(publishVideoWithUrls);

// Original route for server-side upload (backward compatibility)
router.route("/").post( upload.fields([
                        {
                            name:"videoFile",
                            maxCount: 1,
                        },
                        {
                            name: "thumbnail",
                            maxCount: 1,
                        }
                    ]),
                    publishAVideo
                )

router.route("/").get(getAllVideos)
router.route("/v/:videoId").get(getVideoById).patch(viewUpdate)
router.route("/uv/:videoId").patch(upload.single("thumbnail"),updateVideo);
router.route("/uv/:videoId").delete(deleteVideo)
router.route("/uv/:videoId/toggle-publish").patch(togglePublishStatus);

export default router;
