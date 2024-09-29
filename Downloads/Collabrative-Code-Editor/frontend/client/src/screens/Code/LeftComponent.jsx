// import React, { useContext } from 'react'
// import styled from 'styled-components'
// import logo from '../../assets/logo.png'
// import { ModalContext } from '../../context/ModalContext'

// const StyledLeftComponent = styled.div`
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 40%;
//     height: 100vh;
//     background-color: #1e1e1e;

//     display: flex;
//     justify-content: center;
//     align-items: center;

//     @media (max-width: 768px){
//         position: relative;
//         width: 100%;
//     }
// `
// const ContentContainer = styled.div`
//     text-align: center;
// `

// const Logo = styled.img`
//     width: 165px;
//     margin-bottom: 1rem;
// `

// const MainHeading = styled.h1`
//     font-size: 2.5rem;
//     font-weight: 400;
//     color: #fff;
//     margin-bottom: 0.75rem;

//     span{
//         font-weight: 700;
//     }
// `
// const SubHeading = styled.div`
//     font-size: 1.5rem;
//     color: #fff;
//     opacity: 0.7;
//     margin-bottom: 1.5rem;
// `

// const AddNewButton = styled.button`
//     padding: 0.25rem 1.5rem;
//     font-size: 1rem;
//     border: none;
//     border-radius: 30px;
//     box-shadow: 0px 0px 4px 2px #8b8b8b;
//     display: flex;
//     align-items: center;
//     gap: 0.25rem;
//     transition: all 0.2s ease-in-out;
//     span{
//         font-size: 2rem;
//         font-weight: 700;
//     }

//     &:hover{
//         cursor: pointer;
//         scale: 1.05;
//         box-shadow: 0px 0px 6px 2px #8b8b8b;
//     }
// `
// const LeftComponent = () => {
//     const { openModal } = useContext(ModalContext);
//     return (
//         <StyledLeftComponent>
//             <ContentContainer>
//                 <Logo src={logo} alt="" />
//                 <MainHeading> <span>Code</span> Deck</MainHeading>
//                 <SubHeading>Code. Compile. Debug.</SubHeading>
//                 <AddNewButton onClick={() => openModal({
//                     show: true,
//                     modalType: 3,
//                     identifiers: {
//                         folderId: "",
//                         cardId: "",
//                     }
//                 })} ><span>+</span> Create New Playground</AddNewButton>
//             </ContentContainer>
//         </StyledLeftComponent>
//     )
// }

// export default LeftComponent





//Must include


// import React, { useState, useRef, useEffect } from 'react'
// import styled from 'styled-components'
// //import logo from '../../assets/logo.png'
// //import { ModalContext } from '../../context/ModalContext'


// //import React, { useState, useRef, useEffect } from 'react';
// import toast from 'react-hot-toast';
// import Client from '../../components/Client';  
// //import Editor from '../../components/Editor';
// import { language, cmtheme } from '../../atoms';  // Corrected import path
// import { useRecoilState } from 'recoil';
// import ACTIONS from '../../actions/Actions';
// import { initSocket } from '../../socket';
// import Logo from '../../components/DNSV.png';
// import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';

// const StyledLeftComponent = styled.div`
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 40%;
//     height: 100vh;
//     background-color: #1e1e1e;

//     display: flex;
//     justify-content: center;
//     align-items: center;

//     @media (max-width: 768px){
//         position: relative;
//         width: 100%;
//     }
// `
// const ContentContainer = styled.div`
//     text-align: center;

//  `
 
 
 
 //

// const Logo = styled.img`
//     width: 165px;
//     margin-bottom: 1rem;
// `

// const MainHeading = styled.h1`
//     font-size: 2.5rem;
//     font-weight: 400;
//     color: #fff;
//     margin-bottom: 0.75rem;

//     span{
//         font-weight: 700;
//     }
// `
// const SubHeading = styled.div`
//     font-size: 1.5rem;
//     color: #fff;
//     opacity: 0.7;
//     margin-bottom: 1.5rem;
// `

// const AddNewButton = styled.button`
//     padding: 0.25rem 1.5rem;
//     font-size: 1rem;
//     border: none;
//     border-radius: 30px;
//     box-shadow: 0px 0px 4px 2px #8b8b8b;
//     display: flex;
//     align-items: center;
//     gap: 0.25rem;
//     transition: all 0.2s ease-in-out;
//     span{
//         font-size: 2rem;
//         font-weight: 700;
//     }

//     &:hover{
//         cursor: pointer;
//         scale: 1.05;
//         box-shadow: 0px 0px 6px 2px #8b8b8b;
//     }
// `



//end must include


// const LeftComponent = () => {
    
//     const [lang, setLang] = useRecoilState(language);
//     const [them, setThem] = useRecoilState(cmtheme);

//     const [clients, setClients] = useState([]);

//     const socketRef = useRef(null);
//     const codeRef = useRef(null);
//     const location = useLocation();
//     const {roomId} = useParams();
//     const reactNavigator = useNavigate();

//     useEffect(() => {
//         const init = async () => {
//             socketRef.current = await initSocket();
//             socketRef.current.on('connect_error', (err) => handleErrors(err));
//             socketRef.current.on('connect_failed', (err) => handleErrors(err));

//             function handleErrors(e) {
//                 console.log('socket error', e);
//                 toast.error('Socket connection failed, try again later.');
//                 //reactNavigator('/');
//             }

//             socketRef.current.emit(ACTIONS.JOIN, {
//                 roomId,
//                 username: location.state?.username,
//             });

//             // Listening for joined event
//             socketRef.current.on(
//                 ACTIONS.JOINED,
//                 ({clients, username, socketId}) => {
//                     if (username !== location.state?.username) {
//                         toast.success(`${username} joined the room.`);
//                         console.log(`${username} joined`);
//                     }
//                     setClients(clients);
//                     socketRef.current.emit(ACTIONS.SYNC_CODE, {
//                         code: codeRef.current,
//                         socketId,
//                     });
//                 }
//             );

//             // Listening for disconnected
//             socketRef.current.on(
//                 ACTIONS.DISCONNECTED,
//                 ({socketId, username}) => {
//                     toast.success(`${username} left the room.`);
//                     setClients((prev) => {
//                         return prev.filter(
//                             (client) => client.socketId !== socketId
//                         );
//                     });
//                 }
//             );
//         };
//         init();
//         return () => {
//             socketRef.current.off(ACTIONS.JOINED);
//             socketRef.current.off(ACTIONS.DISCONNECTED);
//             socketRef.current.disconnect();
//         };
//     }, [location.state?.username, reactNavigator, roomId]);

//     async function copyRoomId() {
//         try {
//             await navigator.clipboard.writeText(roomId);
//             toast.success('Room ID has been copied to clipboard');
//         } catch (err) {
//             toast.error('Could not copy the Room ID');
//             console.error(err);
//         }
//     }

//     function leaveRoom() {
//         reactNavigator('/');
//     }

//     if (!location.state) {
//         return <Navigate to="/" />;
//     }
//     //const { openModal } = useContext(ModalContext);
//     return (
//         <StyledLeftComponent>
//             <ContentContainer>
//                 {/* <Logo src={logo} alt="" />
//                 <MainHeading> <span>Code</span> Deck</MainHeading>
//                 <SubHeading>Code. Compile. Debug.</SubHeading>
//                 <AddNewButton onClick={() => openModal({
//                     show: true,
//                     modalType: 3,
//                     identifiers: {
//                         folderId: "",
//                         cardId: "",
//                     }
//                 })} ><span>+</span> Create New Playground</AddNewButton> */}
//                 <div className="mainWrap">
//             <div className="aside">
//                 <div className="asideInner">
//                     <div className="logo">
//                         <img
//                             className="logoImage"
//                             src={Logo}
//                             alt="logo"
//                         />
//                     </div>
//                     <h3>Connected</h3>
//                     <div className="clientsList">
//                         {clients.map((client) => (
//                             <Client
//                                 key={client.socketId}
//                                 username={client.username}
//                             />
//                         ))}
//                     </div>
//                 </div>

//                 <label>
//                     Select Language:
//                     <select value={lang} onChange={(e) => {setLang(e.target.value); window.location.reload();}} className="seLang">
//                         <option value="clike">C / C++ / C# / Java</option>
//                         <option value="css">CSS</option>
//                         <option value="dart">Dart</option>
//                         <option value="django">Django</option>
//                         <option value="dockerfile">Dockerfile</option>
//                         <option value="go">Go</option>
//                         <option value="htmlmixed">HTML-mixed</option>
//                         <option value="javascript">JavaScript</option>
//                         <option value="jsx">JSX</option>
//                         <option value="markdown">Markdown</option>
//                         <option value="php">PHP</option>
//                         <option value="python">Python</option>
//                         <option value="r">R</option>
//                         <option value="rust">Rust</option>
//                         <option value="ruby">Ruby</option>
//                         <option value="sass">Sass</option>
//                         <option value="shell">Shell</option>
//                         <option value="sql">SQL</option>
//                         <option value="swift">Swift</option>
//                         <option value="xml">XML</option>
//                         <option value="yaml">yaml</option>
//                     </select>
//                 </label>

//                 <label>
//                     Select Theme:
//                     <select value={them} onChange={(e) => {setThem(e.target.value); window.location.reload();}} className="seLang">
//                         <option value="default">default</option>
//                         <option value="3024-day">3024-day</option>
//                         <option value="3024-night">3024-night</option>
//                         <option value="abbott">abbott</option>
//                         <option value="abcdef">abcdef</option>
//                         <option value="ambiance">ambiance</option>
//                         <option value="ayu-dark">ayu-dark</option>
//                         <option value="ayu-mirage">ayu-mirage</option>
//                         <option value="base16-dark">base16-dark</option>
//                         <option value="base16-light">base16-light</option>
//                         <option value="bespin">bespin</option>
//                         <option value="blackboard">blackboard</option>
//                         <option value="cobalt">cobalt</option>
//                         <option value="colorforth">colorforth</option>
//                         <option value="darcula">darcula</option>
//                         <option value="duotone-dark">duotone-dark</option>
//                         <option value="duotone-light">duotone-light</option>
//                         <option value="eclipse">eclipse</option>
//                         <option value="elegant">elegant</option>
//                         <option value="erlang-dark">erlang-dark</option>
//                         <option value="gruvbox-dark">gruvbox-dark</option>
//                         <option value="hopscotch">hopscotch</option>
//                         <option value="icecoder">icecoder</option>
//                         <option value="idea">idea</option>
//                         <option value="isotope">isotope</option>
//                         <option value="juejin">juejin</option>
//                         <option value="lesser-dark">lesser-dark</option>
//                         <option value="liquibyte">liquibyte</option>
//                         <option value="lucario">lucario</option>
//                         <option value="material">material</option>
//                         <option value="material-darker">material-darker</option>
//                         <option value="material-palenight">material-palenight</option>
//                         <option value="material-ocean">material-ocean</option>
//                         <option value="mbo">mbo</option>
//                         <option value="mdn-like">mdn-like</option>
//                         <option value="midnight">midnight</option>
//                         <option value="monokai">monokai</option>
//                         <option value="moxer">moxer</option>
//                         <option value="neat">neat</option>
//                         <option value="neo">neo</option>
//                         <option value="night">night</option>
//                         <option value="nord">nord</option>
//                         <option value="oceanic-next">oceanic-next</option>
//                         <option value="panda-syntax">panda-syntax</option>
//                         <option value="paraiso-dark">paraiso-dark</option>
//                         <option value="paraiso-light">paraiso-light</option>
//                         <option value="pastel-on-dark">pastel-on-dark</option>
//                         <option value="railscasts">railscasts</option>
//                         <option value="rubyblue">rubyblue</option>
//                         <option value="seti">seti</option>
//                         <option value="shadowfox">shadowfox</option>
//                         <option value="solarized">solarized</option>
//                         <option value="the-matrix">the-matrix</option>
//                         <option value="tomorrow-night-bright">tomorrow-night-bright</option>
//                         <option value="tomorrow-night-eighties">tomorrow-night-eighties</option>
//                         <option value="ttcn">ttcn</option>
//                         <option value="twilight">twilight</option>
//                         <option value="vibrant-ink">vibrant-ink</option>
//                         <option value="xq-dark">xq-dark</option>
//                         <option value="xq-light">xq-light</option>
//                         <option value="yeti">yeti</option>
//                         <option value="yonce">yonce</option>
//                         <option value="zenburn">zenburn</option>
//                     </select>
//                 </label>

//                 <button className="btn copyBtn" onClick={copyRoomId}>
//                     Copy ROOM ID
//                 </button>
//                 <button className="btn leaveBtn" onClick={leaveRoom}>
//                     Leave
//                 </button>
//             </div>

//             {/* <div className="editorWrap">
//                 <Editor
//                     socketRef={socketRef}
//                     roomId={roomId}
//                     onCodeChange={(code) => {
//                         codeRef.current = code;
//                     }}
//                 />
//             </div> */}
//         </div>
//             </ContentContainer>
//         </StyledLeftComponent>
//     )
// }

// export default LeftComponent

import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import toast from 'react-hot-toast';
import Client from '../../components/Client';
import { language, cmtheme } from '../../atoms';
import { useRecoilState } from 'recoil';
import ACTIONS from '../../actions/Actions';
import { initSocket } from '../../socket';
import Logo from '../../components/DNSV.png';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';

const StyledLeftComponent = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 20%;
    height: 100vh;
    background-color: #1e1e1e;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px){
        position: relative;
        width: 100%;
    }
`;

const ContentContainer = styled.div`
    text-align: center;
`;

const LeftComponent = () => {
    const [lang, setLang] = useRecoilState(language);
    const [them, setThem] = useRecoilState(cmtheme);
    const [clients, setClients] = useState([]);

    const socketRef = useRef(null);
    const codeRef = useRef(null);
    const location = useLocation();
    const { roomId } = useParams();
    const reactNavigator = useNavigate();

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('Socket error', e);
                toast.error('Socket connection failed, try again later.');
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            // Listening for joined event
            socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
                if (username !== location.state?.username) {
                    toast.success(`${username} joined the room.`);
                    console.log(`${username} joined`);
                }
                setClients(clients);
                socketRef.current.emit(ACTIONS.SYNC_CODE, {
                    code: codeRef.current,
                    socketId,
                });
            });

            // Listening for disconnected event
            socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
                toast.success(`${username} left the room.`);
                setClients((prev) => prev.filter((client) => client.socketId !== socketId));
            });
        };

        init();

        return () => {
            // Ensure socketRef.current exists before trying to call off()
            if (socketRef.current) {
                socketRef.current.off(ACTIONS.JOINED);
                socketRef.current.off(ACTIONS.DISCONNECTED);
                socketRef.current.disconnect();
            }
        };
    }, [location.state?.username, reactNavigator, roomId]);

    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }

    function leaveRoom() {
        reactNavigator('/');
    }

    if (!location.state) {
        return <Navigate to="/" />;
    }

    return (
        <StyledLeftComponent>
            <ContentContainer>
                <div className="mainWrap">
                    <div className="aside">
                        <div className="asideInner">
                            <div className="logo">
                                <img className="logoImage" src={Logo} alt="logo" />
                            </div>
                            <h3>Connected</h3>
                            <div className="clientsList">
                                {clients.map((client) => (
                                    <Client key={client.socketId} username={client.username} />
                                ))}
                            </div>
                        </div>

                        <label>
                            Select Language:
                            <select
                                value={lang}
                                onChange={(e) => { setLang(e.target.value); window.location.reload(); }}
                                className="seLang">
                             <option value="clike">C / C++ / C# / Java</option>
                        <option value="css">CSS</option>
                        <option value="dart">Dart</option>
                        <option value="django">Django</option>
                        <option value="dockerfile">Dockerfile</option>
                        <option value="go">Go</option>
                        <option value="htmlmixed">HTML-mixed</option>
                        <option value="javascript">JavaScript</option>
                        <option value="jsx">JSX</option>
                        <option value="markdown">Markdown</option>
                        <option value="php">PHP</option>
                        <option value="python">Python</option>
                        <option value="r">R</option>
                        <option value="rust">Rust</option>
                        <option value="ruby">Ruby</option>
                        <option value="sass">Sass</option>
                        <option value="shell">Shell</option>
                        <option value="sql">SQL</option>
                        <option value="swift">Swift</option>
                        <option value="xml">XML</option>
                        <option value="yaml">yaml</option>
                                {/* Options here */}
                            </select>
                        </label>

                        <label>
                            Select Theme:
                            <select
                                value={them}
                                onChange={(e) => { setThem(e.target.value); window.location.reload(); }}
                                className="seLang"
                            >
                            <option value="default">default</option>
                        <option value="3024-day">3024-day</option>
                        <option value="3024-night">3024-night</option>
                        <option value="abbott">abbott</option>
                        <option value="abcdef">abcdef</option>
                        <option value="ambiance">ambiance</option>
                        <option value="ayu-dark">ayu-dark</option>
                        <option value="ayu-mirage">ayu-mirage</option>
                        <option value="base16-dark">base16-dark</option>
                        <option value="base16-light">base16-light</option>
                        <option value="bespin">bespin</option>
                        <option value="blackboard">blackboard</option>
                        <option value="cobalt">cobalt</option>
                        <option value="colorforth">colorforth</option>
                        <option value="darcula">darcula</option>
                        <option value="duotone-dark">duotone-dark</option>
                        <option value="duotone-light">duotone-light</option>
                        <option value="eclipse">eclipse</option>
                        <option value="elegant">elegant</option>
                        <option value="erlang-dark">erlang-dark</option>
                        <option value="gruvbox-dark">gruvbox-dark</option>
                        <option value="hopscotch">hopscotch</option>
                        <option value="icecoder">icecoder</option>
                        <option value="idea">idea</option>
                        <option value="isotope">isotope</option>
                        <option value="juejin">juejin</option>
                        <option value="lesser-dark">lesser-dark</option>
                        <option value="liquibyte">liquibyte</option>
                        <option value="lucario">lucario</option>
                        <option value="material">material</option>
                        <option value="material-darker">material-darker</option>
                        <option value="material-palenight">material-palenight</option>
                        <option value="material-ocean">material-ocean</option>
                        <option value="mbo">mbo</option>
                        <option value="mdn-like">mdn-like</option>
                        <option value="midnight">midnight</option>
                        <option value="monokai">monokai</option>
                        <option value="moxer">moxer</option>
                        <option value="neat">neat</option>
                        <option value="neo">neo</option>
                        <option value="night">night</option>
                        <option value="nord">nord</option>
                        <option value="oceanic-next">oceanic-next</option>
                        <option value="panda-syntax">panda-syntax</option>
                        <option value="paraiso-dark">paraiso-dark</option>
                        <option value="paraiso-light">paraiso-light</option>
                        <option value="pastel-on-dark">pastel-on-dark</option>
                        <option value="railscasts">railscasts</option>
                        <option value="rubyblue">rubyblue</option>
                        <option value="seti">seti</option>
                        <option value="shadowfox">shadowfox</option>
                        <option value="solarized">solarized</option>
                        <option value="the-matrix">the-matrix</option>
                        <option value="tomorrow-night-bright">tomorrow-night-bright</option>
                        <option value="tomorrow-night-eighties">tomorrow-night-eighties</option>
                        <option value="ttcn">ttcn</option>
                        <option value="twilight">twilight</option>
                        <option value="vibrant-ink">vibrant-ink</option>
                        <option value="xq-dark">xq-dark</option>
                        <option value="xq-light">xq-light</option>
                        <option value="yeti">yeti</option>
                        <option value="yonce">yonce</option>
                        <option value="zenburn">zenburn</option>
                                {/* Options here */}
                            </select>
                        </label>

                        <button className="btn copyBtn" onClick={copyRoomId}>
                            Copy ROOM ID
                        </button>
                        <button className="btn leaveBtn" onClick={leaveRoom}>
                            Leave
                        </button>
                    </div>
                </div>
            </ContentContainer>
        </StyledLeftComponent>
    );
};

export default LeftComponent;
