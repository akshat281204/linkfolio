const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../auth.middleware');
const router = express.Router();

//GET ALL LINKS FOR THE USER
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('links');
        res.json(user.links);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

//ADD A NEW LINK
router.post('/', authMiddleware, async (req, res) => {
    const { title, url } = req.body;
    if (!title || !url) {
        return res.status(400).json({ message: 'Title and URL are required.' });
    }
    try {
        const user = await User.findById(req.userId);
        user.links.push({ title, url });
        await user.save();
        res.status(201).json(user.links);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

//UPDATING THE ALREADY EXISTING LINK
router.put('/:linkId', authMiddleware, async (req, res) => {
    const { title, url } = req.body;
    try {
        const user = await User.findById(req.userId);
        const link = user.links.id(req.params.linkId);
        if (!link) {
            return res.status(404).json({ message: 'Link not found' });
        }
        link.title = title || link.title;
        link.url = url || link.url;
        await user.save();
        res.json(user.links);
    } catch(err) {
         res.status(500).send('Server Error');
    }
});


//DELETE A LINK
router.delete('/:linkId', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        user.links.pull({ _id: req.params.linkId });
        await user.save();
        res.json({ message: 'Link deleted successfully' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;