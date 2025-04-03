import React from 'react'
import TerminalIcon from '@mui/icons-material/Terminal';
import { TextField } from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';
export const Output = (props) => {
    return (
        //232121
        <div className="output" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', paddingLeft: '0.8vw', backgroundColor: props.dark ? '#232121' : '#f9f9f9', marginTop: '0px', paddingTop: '16px', overflowY: 'scroll', position: 'relative', height: '95vh', fontSize: '0.98em', width: '30.5vw', borderLeft: props.dark ? '1px solid #343a40' : '1px solid rgb(222,222,222)', marginLeft: '-6px' }}>
            <div className="headlogos" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <TerminalIcon style={{ width: '21px', height: '26px', marginLeft: '6px', color: props.dark ? 'white' : 'black' }} />
                <p style={{ fontSize: '13.25px', marginBottom: '-1.58px', marginLeft: '3px', color: props.dark ? 'white' : 'black' }}>Console </p>
            </div>
            <div className="textarea">
                <TextField
                     style={{ width: '96%', marginTop: '20px', fontFamily: 'Source Code Pro',backgroundColor:'transparent' }}
                    InputProps={{ style: { fontSize: 12.9, fontFamily: 'Source Code Pro' } }}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Input"
                    multiline
                    rows={4}
                    fullWidth
                    value={props.input}
                    onChange={e => props.setInput(e.target.value)}
                    variant="outlined"
                />
            </div>
            <div className="headlogos" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: "25px" }}>
                <TaskIcon style={{ width: '21px', height: '26px', marginLeft: '6px', color: props.dark ? 'white' : 'black' }} />
                <p style={{ fontSize: '13.25px', marginBottom: '-1.58px', marginLeft: '3px', color: props.dark ? 'white' : 'black' }}>Output </p>
            </div>
            <div className="output" style={{ color: props.dark ? 'white' : 'black', display: 'flex', flexDirection: 'column', marginTop: '15px', marginLeft: '3px' }}>
                {(props.op[0]) ?
                    <span style={{ color: '#34ce34', fontSize: '12.95px' }}> Build success: <span style={{ color: props.dark ? 'gray' : 'black' }}> {props.op[2]}ms execution time</span></span> : <></>}
                <p style={{ color: props.dark ? 'white' : 'black', fontSize: '13px' }}>{props.op[0] ? props.op[0] : "Run code to show output"}</p>
                {(props.op[1]) ?
                    <span style={{ color: 'red', marginTop: '-15px', fontSize: '12.75px' }}> Build failed: </span> : <></>}
                <p style={{ color: props.dark ? 'white' : 'black', fontSize: '13px' }}>{props.op[1]}</p>
            </div>
        </div>
    )
}
