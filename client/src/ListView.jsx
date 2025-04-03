import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import { useState } from 'react';
import { Box } from '@mui/system';
import ReactTimeAgo from 'react-time-ago'
import { Button, Typography } from '@mui/material';
import View from './View';

export const ListView = (props) => {
  const params = useParams()
  const [list, setList] = useState([])
  const [codeidt, setCodeId] = useState('')
  useEffect(() => {
    async function getCode() {
      const resp = await fetch(`http://localhost:8000/codes/${params.uid}`)
      const code = await resp.json()
      setList(code)
    }
    getCode()
  }, [params.uid])
  const toggleCode = (e) => {
    setCodeId(e.target.innerHTML);
  }

  return (
    <>
      <Box style={{ display: 'flex', flexDirection: 'column', height: '91vh', overflowY: 'scroll', paddingRight: '2vw', width: '30%'}}>
        <Typography sx={{ textAlign: 'left', paddingLeft: '2.5vw', fontFamily: 'Source Code Pro', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>Saved Codes</Typography>
        {
          list.map((item) => {
            return <Button key={item._id} id={item.codeid} onClick={(e) => { toggleCode(e) }} sx={{ marginLeft: '1.8vw', cursor: 'pointer' }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CodeIcon />
                  </Avatar>
                </ListItemAvatar>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ fontSize: '14px', fontFamily: 'Source Code Pro' }}>{item.codeid}</Typography>
                  <Typography sx={{ fontSize: '12px', fontFamily: 'Source Code Pro' }}>{<ReactTimeAgo date={Date.parse(item.createdAt)} locale="en-US" />}</Typography>
                </div>
              </ListItem>
            </Button>
          })
        }
      </Box>
      <View codeid={codeidt} dark={props.dark} />
    </>
  )
}