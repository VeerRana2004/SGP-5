import React, { useContext, useState } from 'react'
import EditorContainer from './EditorContainer'
import InputConsole from './InputConsole'
import OutputConsole from './OutputConsole'
import Navbar from './Navbar'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { languageMap, PlaygroundContext } from '../../context/PlaygroundContext'
import { ModalContext } from '../../context/ModalContext'
import Modal from '../../components/Modal'
import { Buffer } from 'buffer'
import axios from 'axios'

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: ${({ isFullScreen }) => isFullScreen ? '1fr' : '2fr 1fr'};
  min-height: ${({ isFullScreen }) => isFullScreen ? '100vh' : 'calc(100vh - 4.5rem)'};
  @media (max-width: 768px){
    grid-template-columns: 1fr;
  }
`

const Consoles = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
`

const Playground = () => {
  const { folderId, playgroundId } = useParams()
  const { folders, savePlayground } = useContext(PlaygroundContext)
  const { isOpenModal, openModal, closeModal } = useContext(ModalContext)
  const { title, language, code } = folders[folderId].playgrounds[playgroundId]

  const [currentLanguage, setCurrentLanguage] = useState(language)
  const [currentCode, setCurrentCode] = useState(code)
  const [currentInput, setCurrentInput] = useState('')
  const [currentOutput, setCurrentOutput] = useState('')
  const [isFullScreen, setIsFullScreen] = useState(false)

  const saveCode = () => {
    savePlayground(folderId, playgroundId, currentCode, currentLanguage)
  }

  const encode = (str) => Buffer.from(str, "binary").toString("base64")
  const decode = (str) => Buffer.from(str, 'base64').toString()

  const postSubmission = async (language_id, source_code, stdin) => {
    try {
      const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: { base64_encoded: 'true', fields: '*' },
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'b4e5c5a05fmsh9adf6ec091523f8p165338jsncc58f31c26e1',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: JSON.stringify({
          language_id,
          source_code,
          stdin
        })
      };
      const res = await axios.request(options);
      return res.data.token;
    } catch (error) {
      console.error("Error creating submission:", error);
      throw new Error("Failed to create submission.");
    }
  }

  const getOutput = async (token) => {
    try {
      const options = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        params: { base64_encoded: 'true', fields: '*' },
        headers: {
          'X-RapidAPI-Key': 'b4e5c5a05fmsh9adf6ec091523f8p165338jsncc58f31c26e1',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      };
      const res = await axios.request(options);
      
      if (res.data && res.data.status_id <= 2) {
        // Wait and retry if the code is still in queue or processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        return await getOutput(token); // Recursive call
      }
      
      return res.data;
    } catch (error) {
      console.error("Error fetching output:", error);
      return { status: { description: "Error fetching output" }, stdout: "", compile_output: "", stderr: "" };
    }
  }

  const runCode = async () => {
    openModal({
      show: true,
      modalType: 6,
      identifiers: { folderId: "", cardId: "" }
    });

    try {
      const language_id = languageMap[currentLanguage].id;
      const source_code = encode(currentCode);
      const stdin = encode(currentInput);

      const token = await postSubmission(language_id, source_code, stdin);
      const res = await getOutput(token);

      const status_name = res.status.description;
      const decoded_output = decode(res.stdout || '');
      const decoded_compile_output = decode(res.compile_output || '');
      const decoded_error = decode(res.stderr || '');

      let final_output = '';
      if (res.status_id !== 3) {
        // Error in code
        final_output = decoded_compile_output || decoded_error;
      } else {
        final_output = decoded_output;
      }
      setCurrentOutput(status_name + "\n\n" + final_output);
    } catch (error) {
      console.error("Error running code:", error);
      setCurrentOutput("Error running code. Please try again.");
    } finally {
      closeModal();
    }
  }

  const getFile = (e, setState) => {
    const input = e.target;
    if ("files" in input && input.files.length > 0) {
      placeFileContent(input.files[0], setState);
    }
  };

  const placeFileContent = (file, setState) => {
    readFileContent(file)
      .then(content => setState(content))
      .catch(error => console.log(error));
  };

  function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result);
      reader.onerror = error => reject(error);
      reader.readAsText(file);
    });
  }

  return (
    <div>
      <Navbar isFullScreen={isFullScreen} />
      <MainContainer isFullScreen={isFullScreen}>
        <EditorContainer
          title={title}
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
          currentCode={currentCode}
          setCurrentCode={setCurrentCode}
          folderId={folderId}
          playgroundId={playgroundId}
          saveCode={saveCode}
          runCode={runCode}
          getFile={getFile}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
        <Consoles>
          <InputConsole
            currentInput={currentInput}
            setCurrentInput={setCurrentInput}
            getFile={getFile}
          />
          <OutputConsole
            currentOutput={currentOutput}
          />
        </Consoles>
      </MainContainer>
      {isOpenModal.show && <Modal />}
    </div>
  )
}

export default Playground
