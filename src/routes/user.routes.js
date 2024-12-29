import { Router} from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
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
