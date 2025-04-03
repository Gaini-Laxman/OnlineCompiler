import React from 'react'
import Editor from "@monaco-editor/react";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const TextEditor = (props) => {
    const { roomid } = useParams()

    useEffect(() => {
        props.setroom(roomid)
    }, [props, roomid])
    function handleEditorChange(value, event) {
        props.code(value)
        props.setSendCode(value)
    }
    //#212529
    return (
        <div className="textarea" style={{ height: '95vh', overflowY: 'scroll', backgroundColor: '#080808', width: '70vw' }}>
            <Editor
                fontSize="22px"
                height="94vh"
                width="100%"
                theme={props.dark ? 'vs-dark' : "vs"}
                language={props.lang === "py" ? "python" : props.lang}
                value={props.c}
                onChange={handleEditorChange}
            />
        </div>

    )
}
