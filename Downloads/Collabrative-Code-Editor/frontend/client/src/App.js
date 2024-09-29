// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './screens/Home';
// import Playground from './screens/Playground';
// import Error404 from './screens/Error404';
// import { GlobalStyle } from './style/global';
// import ModalProvider from './context/ModalContext';
// import PlaygroundProvider from './context/PlaygroundContext';

// function App() {
//   return (
//     <PlaygroundProvider>
//       <ModalProvider>
//         <BrowserRouter>
//           <GlobalStyle />
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/playground/:folderId/:playgroundId" element={<Playground />} />
//             <Route path="*" element={<Error404 />} />
//           </Routes>
//         </BrowserRouter>
//       </ModalProvider>
//     </PlaygroundProvider>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

import Code from './screens/Code';
import Home from './components/Home.js'
import Playground from './screens/Playground';
import Error404 from './screens/Error404';
//import EditorPage from './components/EditorPage';
import { GlobalStyle } from './style/global';

import ModalProvider from './context/ModalContext';
import PlaygroundProvider from './context/PlaygroundContext';
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/Navbar';
  
function App() {
  return (
    <RecoilRoot> {/* RecoilRoot wraps the app */}
      <PlaygroundProvider> {/* Wrap Playground context */}
        <ModalProvider> {/* Wrap Modal context */}
          <BrowserRouter> {/* BrowserRouter for routing */}
            <GlobalStyle /> {/* Global styling */}
            <div>
              <Toaster
                position="top-center"
                toastOptions={{
                  success: {
                    theme: {
                      primary: '#4aed88',
                    },
                  },
                }}
              />
            </div>
            <Routes>
            {/* <Route path="/" element={<Navbar />} /> */}
            <Route path="/" element={<Navigate to="/Navbar" />} />
            <Route path="/Navbar" element={<Navbar />} />
            <Route path="/login" element={<Login />} />
               {/* Signup route */}
              <Route path="/signup" element= { < Signup/>} />
              <Route path="/home" element={<Home />} />
              <Route path="/editor/:roomId" element={<Code />} />
              <Route path="/playground/:folderId/:playgroundId" element={<Playground />} />
              {/* <Route path="/editor/:roomId" element={<EditorPage />} /> */}
              <Route path="*" element={<Error404 />} /> {/* Handle unknown routes */}
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </PlaygroundProvider>
    </RecoilRoot>
  );
}

export default App;
