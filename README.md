# Collaborative Coding and Compiler Platform

This project is a real-time collaborative coding platform developed using **React.js** for the front end and **Node.js** for the back end. It enables multiple users to collaborate, write, and compile code in multiple programming languages including C++, Java, JavaScript, and Python.

## Features

### 1. User Authentication
- **Login**: Users can log in using their credentials to access the platform.

### 2. Collaborative Workspaces
- **Join Room**: Users can join a collaborative coding room using a unique Room ID.
- **Create Playground**: Users can create new collaborative coding workspaces/playgrounds.

### 3. Code Management
- **Import Code**: Users can upload/import existing code files into the workspace.
- **Export Code**: Users can download/export their code files to their local system.

### 4. Real-time Collaboration
- Collaborate with team members in real time, with updates reflected live across all users in the same room.

### 5. Code Compilation
- Supports compilation and execution for the following programming languages:
  - **C++**
  - **Java**
  - **JavaScript**
  - **Python**

## Technologies Used

### Frontend
- **React.js**
- **CSS** for styling
- **WebSocket** for real-time collaboration

### Backend
- **Node.js**
- **Express.js**
- **Socket.IO** for real-time communication
- **REST APIs** for user authentication and other operations


### Database
- **MongoDB** for storing user data and room details


## Installation and Setup

### Prerequisites
- **Node.js** and **npm** installed
- **MongoDB** instance running

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo-name.git
   cd your-repo-name
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   node server.js
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Run the Project**
   - Run both the frontend and backend servers simultaneously.
   - Access the platform at `http://localhost:3000`.

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Playground
- `POST /api/room/create` - Create a new room
- `POST /api/room/join` - Join a room using Room ID

### Code Compilation
- `POST /api/compiler/execute` - Compile and execute code

## Future Enhancements
- Add more programming languages.
- Improve UI/UX.
- Support for version control in collaborative sessions.
- Integration with third-party APIs (e.g., GitHub).


---
