const e = require("express");
const User = require("../models/userModel");

const router = e.Router();

router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (user) {
            res.status(200).json({
                success: true,
                message: "Profile fetched successfully",
                user: user,
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;