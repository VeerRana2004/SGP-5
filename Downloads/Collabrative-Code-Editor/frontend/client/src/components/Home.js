import React, { useState, useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid'; // Importing uuidV4 correctly
import toast from 'react-hot-toast'; // Importing toast correctly
import { Link, useNavigate } from 'react-router-dom'; // Importing useNavigate correctly
import Logo from './DNSV.png';
import '../App.css';

const Home = () => {
    const navigate = useNavigate(); // Define navigate using useNavigate
    const [roomId, setRoomId] = useState(''); // Define setRoomId using useState
    const [username, setUsername] = useState(''); // Define setUsername using useState

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    const createNewRoom = async (e) => {
        e.preventDefault();
        const id = uuidV4(); // Generates a unique room ID
        const code = `room-${id.slice(0, 8)}`; // Generate a unique room code based on roomId
    
        setRoomId(id);
        toast.success('Created a new room');
    
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('No authentication token found. Please log in again.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/api/rooms/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ roomId: id, roomCode: code, username }), // Send roomCode
            });
    
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Room creation failed');
            }
    
            navigate(`/editor/${id}`, { state: { username } }); // Navigate with roomId
        } catch (error) {
            console.error("Error creating room:", error);
            toast.error(error.message);
        }
    };
    
    
    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('ROOM ID & username are required');
            return;
        }

        navigate(`/editor/${roomId}`, {
            state: { username },
        });
    };

    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };

    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <img className="homePageLogo" src={Logo} alt="code-sync-logo" />
                <h4 className="mainLabel">Generate new room or paste invitation ROOM ID</h4>
                <div className="inputGroup">
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="ROOM ID"
                        onChange={(e) => setRoomId(e.target.value)} // Correctly set roomId
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="USERNAME"
                        onChange={(e) => setUsername(e.target.value)} // Correctly set username
                        value={username}
                        onKeyUp={handleInputEnter}
                        readOnly
                    />
                    <button className="btn joinBtn" onClick={joinRoom}>
                        Join
                    </button>
                    <span className="createInfo">
                        If you don't have an invite then create &nbsp;
                        <Link
                            onClick={createNewRoom}
                            to="#"
                            className="createNewBtn"
                        >
                            new room
                        </Link>
                    </span>
                </div>
            </div>
            <footer>
                <h4>
                    Build by &nbsp;DNSV
                </h4>
            </footer>
        </div>
    );
};

export default Home;
