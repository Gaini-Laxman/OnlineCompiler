import Editor from '@monaco-editor/react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function FeatureView(props) {
  const [get, SetGet] = useState("")
  const params = useParams()
  useEffect(() => {
    async function getCode() {
      const resp = await fetch(`http://localhost:8000/code/${params.codeid}`)
      const code = await resp.json()
      SetGet(code[0])
    }
    getCode()
  }, [params.codeid])
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