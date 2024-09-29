import React from 'react';

const RoomDetails = ({ roomId, users }) => {
    return (
        <div>
            <h2>Room ID: {roomId}</h2>
            <h3>Users in Room:</h3>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>{user.username}</li>
                    ))}
                </ul>
            ) : (
                <p>No users in this room.</p>
            )}
        </div>
    );
};

export default RoomDetails;
