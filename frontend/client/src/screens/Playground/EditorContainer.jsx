import React, { useContext, useState } from 'react';
import CodeEditor from './CodeEditor';
import styled from 'styled-components';
import { BiEditAlt, BiImport, BiExport, BiFullscreen } from 'react-icons/bi';
import { ModalContext } from '../../context/ModalContext';
import Select from 'react-select';
import { languageMap } from '../../context/PlaygroundContext';

const StyledEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: ${({ isFullScreen }) => (isFullScreen ? '100vh' : 'calc(100vh - 4.5rem)')};
  overflow: hidden;
  box-sizing: border-box;
`;

const UpperToolBar = styled.div`
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 540px) {
    height: 8rem;
    flex-wrap: wrap;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.3rem;
`;

const SelectBars = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & > div {
    width: 8rem;
  }

  & > div:last-child {
    width: 10rem;
  }
`;

const Button = styled.button`
  padding: 0.6rem 1rem;
  background: #0097d7;
  border: none;
  border-radius: 32px;
  font-weight: 700;
  cursor: pointer;
`;

const CodeEditorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const EditorArea = styled.div`
  flex: 1;
  overflow: auto;
  padding: 0;
  margin: 0;
  margin-left: 110px;
  background: #1e1e1e;
  color: #f0f0f0;
  width: 100%;
  box-sizing: border-box;
`;

const LowerToolBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  margin-left :  100px;
  background-color: ${({ isFullScreen }) => (isFullScreen ? '#f0f0f0' : 'transparent')};
  width: 100%;
  box-sizing: border-box;

  label, a, button {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: black;
  }
`;

const SaveAndRunButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: #0097d7;
  border: none;
  border-radius: 32px;
  font-weight: 700;
  cursor: pointer;
  margin-right : 100px;
`;

const EditorContainer = ({
  title,
  currentLanguage,
  setCurrentLanguage,
  currentCode,
  setCurrentCode,
  folderId,
  playgroundId,
  saveCode,
  runCode,
  getFile,
  isFullScreen,
  setIsFullScreen
}) => {
  const { openModal } = useContext(ModalContext);

  const themeOptions = [
    { value: 'githubDark', label: 'githubDark' },
    { value: 'githubLight', label: 'githubLight' },
    { value: 'bespin', label: 'bespin' },
    { value: 'duotoneDark', label: 'duotoneDark' },
    { value: 'duotoneLight', label: 'duotoneLight' },
    { value: 'dracula', label: 'dracula' },
    { value: 'xcodeDark', label: 'xcodeDark' },
    { value: 'xcodeLight', label: 'xcodeLight' },
    { value: 'vscodeDark', label: 'vscodeDark' },
    { value: 'vscodeLight', label: 'vscodeLight' },
    { value: 'okaidia', label: 'okaidia' },
  ];

  const languageOptions = [
    { value: 'cpp', label: 'cpp' },
    { value: 'javascript', label: 'javascript' },
    { value: 'java', label: 'java' },
    { value: 'python', label: 'python' },
  ];

  const handleThemeChange = (selectedOption) => {
    setCurrentTheme(selectedOption);
  };

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption);
    setCurrentLanguage(selectedOption.value);
    setCurrentCode(languageMap[selectedOption.value].defaultCode);
  };

  const [currentTheme, setCurrentTheme] = useState({ value: 'githubDark', label: 'githubDark' });
  const [language, setLanguage] = useState(() => {
    for (let i = 0; i < languageOptions.length; i++) {
      if (languageOptions[i].value === currentLanguage) {
        return languageOptions[i];
      }
    }
    return languageOptions[0];
  });

  return (
    <StyledEditorContainer isFullScreen={isFullScreen}>
      {!isFullScreen && (
        <UpperToolBar>
          <Header>
            <Title>
              <h3>{title}</h3>
              <BiEditAlt
                onClick={() =>
                  openModal({
                    show: true,
                    modalType: 5,
                    identifiers: {
                      folderId: folderId,
                      cardId: playgroundId,
                    },
                  })
                }
              />
            </Title>
            <Button onClick={saveCode}>Save code</Button>
          </Header>
          <SelectBars>
            <Select
              options={languageOptions}
              value={language}
              onChange={handleLanguageChange}
            />
            <Select
              options={themeOptions}
              value={currentTheme}
              onChange={handleThemeChange}
            />
          </SelectBars>
        </UpperToolBar>
      )}
      <CodeEditorContainer>
        <EditorArea>
          <CodeEditor
            currentLanguage={currentLanguage}
            currentTheme={currentTheme.value}
            currentCode={currentCode}
            setCurrentCode={setCurrentCode}
          />
        </EditorArea>
      </CodeEditorContainer>
      <LowerToolBar isFullScreen={isFullScreen}>
        <button onClick={() => setIsFullScreen((prev) => !prev)}>
          <BiFullscreen /> {isFullScreen ? 'Minimize Screen' : 'Full Screen'}
        </button>

        <label htmlFor="codefile">
          <input
            type="file"
            accept="."
            id="codefile"
            onChange={(e) => getFile(e, setCurrentCode)}
          />
          <BiImport /> Import Code
        </label>

        <a
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(currentCode)}`}
          download="code.txt"
        >
          <BiExport /> Export Code
        </a>
        <SaveAndRunButton onClick={runCode}>Run Code</SaveAndRunButton>
      </LowerToolBar>
    </StyledEditorContainer>
  );
};

export default EditorContainer;
