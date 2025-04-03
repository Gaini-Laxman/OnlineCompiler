import Editor from '@monaco-editor/react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function View(props) {
  const [get, SetGet] = useState("")
  useEffect(() => {
    async function getCode() {
      const resp = await fetch(`http://localhost:8000/code/${props.codeid}`)
      const code = await resp.json()
      SetGet(code[0])
    }
    getCode()
  }, [props.codeid])
  return (
    <Editor
      fontSize="22px"
      height="94vh"
      width="100%"
      theme={props.dark ? 'vs-dark' : "vs"}
      language={get.language==='py'?"python":get.language}
      value={get.code}
    />
  )
}
