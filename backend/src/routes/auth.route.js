import express from "express";
import { signup, login, logout, onboard } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

//why not get since not doing anything?
//post method is for operation that changes server state. logging out changes state
router.post("/logout", logout);
router.post("/onboarding", protectRoute ,onboard); 

//check if user is login or not
router.get("/me",protectRoute,(req, res)=>{
    res.status(200).json({success: true, user: req.user});
})

export default router;
