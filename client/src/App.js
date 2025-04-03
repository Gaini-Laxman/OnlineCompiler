import { useState, useEffect, useLayoutEffect } from 'react';
import './App.css';
import { Navbar } from './Navbar';
import { Output } from './Output';
import { TextEditor } from './TextEditor';
import cppraw from './cpp.txt'
import javaraw from './java.txt'
import craw from './c.txt'
import pyraw from './py.txt'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import io from "socket.io-client";
import toast, { Toaster } from 'react-hot-toast';
import { ListView } from './ListView'
import View from './View'
import CustomNavbar from './CustomNavbar';
import { CssBaseline } from '@mui/material';
import FeatureView from './FeatureView';


const socket = io(`localhost:8000`)


function App() {
  const [dark, setDark] = useState(false)
  const darkTheme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
    },typography: {
      fontFamily:'Souce Code Pro',
    }
  });
  const [code, setCode] = useState('')
  const [code1, setSendCode] = useState('')
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'java')
  const [output, setOutput] = useState([])
  const [input, setInput] = useState('')
  const [room, setroom] = useState('')
  const [authUser, setAuthUser] = useState(null)
  // const [filename, setFilename] = useState('')


  async function sendCode() {
    // in development mode this will be localhost:8000
    const resp = await fetch('http://localhost:8000/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: new URLSearchParams({
        'language': language,
        'code': code,
        'input': input
      })
    })
    const data = await resp.json()
    console.debug(data);
    setOutput(data);
  }
  function setProplang(e) {
    setLanguage(e)
  }

  useLayoutEffect(() => {
    socket.on(`sendcode${room}`, code => {
      setCode(code.code)
      setLanguage(code.lang)
    })
  })
  useEffect(() => {
    if (!localStorage.getItem('dark')) return
    if (localStorage.getItem('dark') === 'dark') {
      setDark(true)
    } else if (localStorage.getItem('dark') === 'light') {
      setDark(false)
    }
    if (!localStorage.getItem('uid')) return
    setAuthUser(localStorage.getItem('uid'))
  }, [])

  useEffect(() => {
    localStorage.setItem('lang', language)
    if (language === 'cpp') {
      fetch(cppraw)
        .then(function (response) {
          return response.text();
        }).then(function (data) {
          setCode(data);
          setSendCode(data)
        })
    }

    if (language === 'java') {
      fetch(javaraw)
        .then(function (response) {
          return response.text();
        }).then(function (data) {
          setCode(data);
          setSendCode(data)
        })
    }

    if (language === 'c') {
      fetch(craw)
        .then(function (response) {
          return response.text();
        }).then(function (data) {
          setCode(data);
          setSendCode(data)
        })
    }

    if (language === 'py') {
      fetch(pyraw)
        .then(function (response) {
          return response.text();
        }).then(function (data) {
          setCode(data);
          setSendCode(data)
        })
    }

  }, [language])
  useEffect(() => {
    socket.emit('getcode', {
      code: code1,
      roomid: room,
      lang: language
    })
  }, [code1, language, room])

  const toggleDark = () => {
    if (dark) {
      localStorage.setItem('dark', 'light')
      toast.success('Light Mode', {
        duration: 2000,
        style: {
          fontFamily: 'Source Code Pro',
          fontSize: '12.5px'
        },
      });
    }
    else {
      localStorage.setItem('dark', 'dark')
      toast.success('Dark Mode', {
        duration: 2000,
        style: {
          fontFamily: 'Source Code Pro',
          fontSize: '12.5px'
        },
      });
    }
    setDark((prev) => !prev)
  }
  const download = async () => {
    const got = await fetch('http://localhost:8000/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: new URLSearchParams({
        'language': language,
        'code': code
      })
    })
    const blob = await got.blob();
    console.log(blob);
    //text/x-c
    //text/x-java-source
    //application/octet-stream


    // if(blob.type==='text/x-c'){
    //   setFilename("main.c")
    // }if(blob.type==='application/octet-stream'){
    //   setFilename("main.py")
    // } if(blob.type==='text/x-java-source'){
    //   setFilename(`main.java`)
    // }
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'code.txt');
    document.body.appendChild(link);
    link.click();
  }
  const save = async () => {
    const got = await fetch('http://localhost:8000/savecode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: new URLSearchParams({
        'uid': authUser,
        'language': language,
        'code': code,
        'filename': 'main',
      })
    })
    const pos = await got.json()
    if (pos.success) {
      toast.success('Saved', {
        duration: 2000,
        style: {
          fontFamily: 'Source Code Pro',
          fontSize: '12.5px'
        },
      });
    } else {
      toast.error('Error Saving', {
        duration: 2000,
        style: {
          fontFamily: 'Source Code Pro',
          fontSize: '12.5px'
        },
      });
    }
  }
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline >
          <Toaster />
          <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>

            <Routes>
              <Route path="/join/:roomid" element={
                <>
                  <Navbar save={save} download={download} authUser={authUser} setAuthUser={setAuthUser} toggleDark={toggleDark} dark={dark} run={sendCode} selectlang={setProplang} langsel={language}></Navbar>
                  <div className="codeditor" style={{ display: 'flex', flexDirection: 'row' }}>
                    <TextEditor dark={dark} setroom={setroom} code={setCode} setSendCode={setSendCode} c={code} lang={language}></TextEditor>
                    <Output dark={dark} input={input} setInput={setInput} op={output}></Output>
                  </div></>
              } />
              <Route path="/" element={
                <>
                  <Navbar save={save} download={download} authUser={authUser} setAuthUser={setAuthUser} toggleDark={toggleDark} dark={dark} run={sendCode} selectlang={setProplang} langsel={language}></Navbar>
                  <div className="codeditor" style={{ display: 'flex', flexDirection: 'row' }}>
                    <TextEditor dark={dark} setroom={setroom} code={setCode} setSendCode={setSendCode} c={code} lang={language}></TextEditor>
                    <Output dark={dark} input={input} setInput={setInput} op={output}></Output>
                  </div>
                </>
              } />
              <Route path="/code/:codeid" element={
                <>
                  <CustomNavbar dark={dark} run={sendCode} />
                  <div className="codeditor" style={{ display: 'flex', flexDirection: 'row' }}>
                    <FeatureView code={setCode} dark={dark}></FeatureView>
                  </div>
                </>
              } />
              <Route path="/codes/:uid" element={
                <>
                  <CustomNavbar dark={dark} run={sendCode} />
                  <div className="codeditor" style={{ display: 'flex', flexDirection: 'row' }}>
                    <ListView dark={dark}></ListView>
                  </div>
                </>
              } />
            </Routes>

          </div>
        </CssBaseline >
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
