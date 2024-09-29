const express = require('express');
const Room = require('../models/Rooms');
const User = require('../models/User');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// Create Room
router.post('/create', verifyToken, async (req, res) => {
    const { roomId, username, roomCode } = req.body;

    if (!roomId || !username || !roomCode) {
        return res.status(400).json({ error: 'Room ID, room code, and username are required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let room = await Room.findOne({ roomId });
        if (room) {
            return res.status(400).json({ error: 'Room already exists' });
        }

        room = new Room({ roomId, roomCode, users: [user._id] });
        await room.save();
        return res.status(201).json({ message: 'Room created', roomId });
    } catch (error) {
        console.error('Error creating room:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});

// Join Room
// Join Room
router.post('/join', verifyToken, async (req, res) => {
    const { roomId, username } = req.body;

    if (!roomId || !username) {
        return res.status(400).json({ error: 'Room ID and username are required' });
    }

    try {
        // Check if the room exists
        const room = await Room.findOne({ roomId });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add user to room if they are not already in it
        if (!room.users.includes(user._id)) {
            room.users.push(user._id); // Add the user's ObjectId to the users array
            await room.save(); // Save the updated room with multiple users
        } else {
            return res.status(400).json({ error: 'User already in the room' });
        }

        return res.status(200).json({ message: 'User joined the room successfully', roomId, users: room.users });
    } catch (error) {
        console.error('Error joining room:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
