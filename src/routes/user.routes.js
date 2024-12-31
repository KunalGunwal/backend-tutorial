import { Router} from "express";
import { changeCurrentPassword, getCurrentUser, getUserChannelProfile, getWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateCoverImage, updateUserAvatar } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()


router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifyJWT , logoutUser)
router.route("/refersh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-account").patch(verifyJWT,updateAccountDetails)

router.route("/avatar").patch(verifyJWT,upload.single("avatar"), updateUserAvatar)
router.route("cover-image").patch(verifyJWT,upload.single("coverImage"), updateCoverImage)

router.route("/c/:username").get(verifyJWT,getUserChannelProfile)
router.route(".history").get(verifyJWT, getWatchHistory) 

export default router


// import { Router } from "express";
// import { registerUser } from "../controllers/user.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";

// const router = Router();

// // Route to handle user registration with file uploads
// router.post(
//     "/register",
//     upload.fields([
//         { name: "avatar", maxCount: 1 }, // Expecting one avatar file
//         { name: "coverImage", maxCount: 1 }, // Expecting one cover image file
//     ]),
//     (req, res, next) => {
//         try {
//             // Debugging: Log files and body to ensure correctness
//             console.log("Uploaded Files:", req.files);
//             console.log("Request Body:", req.body);
//             next();
//         } catch (error) {
//             next(error);
//         }
//     },
//     registerUser
// );

// export default router;
