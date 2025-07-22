const express = require('express');
const User = require('../models/User');
const router = express.Router();

//FETCHING THE USERS PUBLIC PROFILE
router.get('/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username.toLowerCase() })
                              .select('username links');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;