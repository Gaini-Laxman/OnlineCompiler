import React from "react";
import Button from "@mui/material/Button";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavigate } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SaveIcon from "@mui/icons-material/Save";
import DownloadIcon from "@mui/icons-material/Download";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const Navbar = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSelect(e) {
    props.selectlang(e.target.value);
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    if (!props.authUser) {
      toast.error("Login to Collab", {
        duration: 2000,
        style: {
          fontFamily: "Source Code Pro",
          fontSize: "12.5px",
        },
      });
      return;
    }
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const [roomid, setRoomid] = useState("");

  const login = async () => {
    const data = { email: email, password: password };
    fetch(`http://localhost:8000/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("uid", data.uid);
        props.setAuthUser(data.uid);
        toast.success("Logged In", {
          duration: 2000,
          style: {
            fontFamily: "Source Code Pro",
            fontSize: "12.5px",
          },
        });
      })
      .catch((error) => {
        toast.error("Error logging in", {
          duration: 2000,
          style: {
            fontFamily: "Source Code Pro",
            fontSize: "12.5px",
          },
        });
        console.error("Error:", error);
      });
    setEmail("");
    setPassword("");
    setOpen(false);
  };
  const signup = async () => {
    const data = { email: email, password: password };
    fetch(`http://localhost:8000/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        props.setAuthUser(data.uid);
        localStorage.setItem("uid", data.uid);
        toast.success("Logged You In", {
          duration: 2000,
          style: {
            fontFamily: "Source Code Pro",
            fontSize: "12.5px",
          },
        });
      })
      .catch((error) => {
        toast.error("Error logging in", {
          duration: 2000,
          style: {
            fontFamily: "Source Code Pro",
            fontSize: "12.5px",
          },
        });
        console.error("Error:", error);
      });
    setOpen(false);
    setEmail("");
    setPassword("");
  };

  const logout = () => {
    props.setAuthUser(null);
    localStorage.removeItem("uid");
    toast.success("Logged Out", {
      duration: 2000,
      style: {
        fontFamily: "Source Code Pro",
        fontSize: "12.5px",
      },
    });
    handleClosemen();
  };

  const saveCode = () => {
    if (!props.authUser) {
      toast.error("Login to Save", {
        duration: 2000,
        style: {
          fontFamily: "Source Code Pro",
          fontSize: "12.5px",
        },
      });
      return;
    }
    props.save();
  };

  const collab = () => {
    if (roomid === "") {
      toast.error("Enter joining id", {
        duration: 2000,
        style: {
          fontFamily: "Source Code Pro",
          fontSize: "12.5px",
        },
      });
      return;
    }
    handleClose2();
    navigate(`/join/${roomid}`);
  };

  const [anchorEl, setAnchorEl] = useState(false);
  const openmen = Boolean(anchorEl);
  function handleClickmen(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClosemen() {
    setAnchorEl(null);
  }
  function redirectSaved() {
    handleClosemen();
    navigate(`/codes/${localStorage.getItem("uid")}`);
  }

  return (
    <nav
      className="navbar navbar-light"
      style={{
        backgroundColor: props.dark ? "rgb(39,39,39)" : "#f9f9f9",
        borderBottom: props.dark
          ? "1px solid #343a40"
          : "1px solid rgb(222,222,222)",
        height: "59px",
      }}
    >
      <div className="container-fluid">
        <Toaster />
        <a
          href="/"
          className="navbar-brand"
          style={{
            color: props.dark ? "white" : "black",
            fontSize: "19.9px",
            paddingLeft: "0.8vw",
            fontWeight: "normal",
          }}
        >
          <span
            style={{
              color: props.dark ? "#616161" : "#a7a0a0",
              fontWeight: "bold",
              marginRight: "7px",
              marginTop: "-3px",
            }}
          >
            &#60;/&#62;
          </span>
          Online Compiler
        </a>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {/* <button onClick={()=>{props.dark()}} style={{backgroundColor:'transparent',outline:'none',border:'none',width:'fit-content',height:'fit-content'}}><img src={dark} style={{width:'30px',height:'30px',marginBottom:'-11px'}} alt="" /></button> */}
          <Button
            onClick={saveCode}
            title="Save"
            style={{
              marginRight: "4px",
              marginTop: "2px",
              height: "35px",
              color: "white",
            }}
          >
            <SaveIcon
              sx={{ fontSize: "19px", color: props.dark ? "white" : "black" }}
            />
          </Button>
          <Button
            title="Download"
            onClick={props.download}
            style={{
              marginRight: "4px",
              marginTop: "2px",
              height: "35px",
              color: "white",
            }}
          >
            <DownloadIcon
              sx={{ fontSize: "19px", color: props.dark ? "white" : "black" }}
            />
          </Button>
          <Button
            onClick={() => {
              props.toggleDark();
            }}
            title="Dark mode toggle"
            style={{
              marginRight: "4px",
              marginTop: "2px",
              height: "35px",
              color: "white",
            }}
          >
            <Brightness4Icon
              sx={{ fontSize: "19px", color: props.dark ? "white" : "black" }}
            />
          </Button>
          <Button
            onClick={handleClickOpen2}
            title="Collab"
            style={{
              marginRight: "4px",
              marginTop: "2px",
              height: "35px",
              color: "white",
            }}
          >
            <GroupsIcon
              sx={{ fontSize: "22.5px", color: props.dark ? "white" : "black" }}
            />
          </Button>
          <Dialog open={open2} onClose={handleClose2}>
            <DialogTitle sx={{ fontFamily: "Source Code Pro" }}>
              Code Collaboration
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                sx={{ fontFamily: "Source Code Pro", fontSize: "14px" }}
              >
                Enter a joining id to start your code collab
              </DialogContentText>
              <TextField
                InputProps={{
                  style: { fontSize: 12.9, fontFamily: "Source Code Pro" },
                }}
                autoFocus
                margin="dense"
                id="name"
                label="Enter joining id"
                type="text"
                fullWidth
                variant="outlined"
                sx={{ marginTop: "18px" }}
                value={roomid}
                onChange={(e) => {
                  setRoomid(e.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                sx={{ fontFamily: "Source Code Pro" }}
                onClick={handleClose2}
              >
                Cancel
              </Button>
              <Button sx={{ fontFamily: "Source Code Pro" }} onClick={collab}>
                Join
              </Button>
            </DialogActions>
          </Dialog>
          {props.authUser ? (
            <Button
              onClick={handleClickmen}
              title="Account"
              size="medium"
              sx={{
                height: "35px",
                marginTop: "2px",
                fontSize: "12.95px",
                color: "white",
                fontFamily: "Source Code Pro",
                textTransform: "lowercase",
                marginRight: "4px",
              }}
            >
              <AccountCircleIcon
                sx={{ fontSize: "21px", color: props.dark ? "white" : "black" }}
              />
            </Button>
          ) : (
            <Button
              title="Login"
              onClick={() => handleClickOpen()}
              size="medium"
              sx={{
                height: "35px",
                marginTop: "2px",
                fontSize: "12.95px",
                color: "white",
                fontFamily: "Source Code Pro",
                textTransform: "lowercase",
                marginRight: "4px",
              }}
            >
              <AccountCircleIcon
                sx={{ fontSize: "21px", color: props.dark ? "white" : "black" }}
              />
            </Button>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openmen}
            onClose={handleClosemen}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              sx={{ fontFamily: "Source Code Pro", fontSize: "13px" }}
              onClick={redirectSaved}
            >
              Saved
            </MenuItem>
            <MenuItem
              sx={{ fontFamily: "Source Code Pro", fontSize: "13px" }}
              onClick={logout}
            >
              Logout
            </MenuItem>
          </Menu>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ fontFamily: "Source Code Pro" }}>
              Login / Signup
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                sx={{
                  fontFamily: "Source Code Pro",
                  fontSize: "14px",
                  marginBottom: "15px",
                }}
              >
                To save codes and share it with your mates login to this
                website.
              </DialogContentText>
              <TextField
                sx={{ marginTop: "12px" }}
                InputProps={{
                  style: { fontSize: 12.9, fontFamily: "Source Code Pro" },
                }}
                autoFocus
                margin="dense"
                id="name"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                sx={{ marginTop: "12px" }}
                InputProps={{
                  style: { fontSize: 12.9, fontFamily: "Source Code Pro" },
                }}
                margin="dense"
                id="name"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button sx={{ fontFamily: "Source Code Pro" }} onClick={signup}>
                Signup
              </Button>
              <Button sx={{ fontFamily: "Source Code Pro" }} onClick={login}>
                Login
              </Button>
            </DialogActions>
          </Dialog>
          <Button
            title="Run Code"
            onClick={() => props.run()}
            size="medium"
            sx={{
              height: "35px",
              marginTop: "2px",
              fontSize: "12.95px",
              color: "white",
              fontFamily: "Source Code Pro",
              textTransform: "lowercase",
            }}
          >
            <PlayArrowIcon
              sx={{ fontSize: "24px", color: props.dark ? "white" : "black" }}
            />
          </Button>
          <select
            className="form-select mx-4"
            style={{
              width: "8vw",
              fontSize: "12px",
              marginTop: "1.9px",
              height: "34px",
            }}
            aria-label="Default select example"
            onChange={(e) => handleSelect(e)}
            value={props.langsel}
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="py">Python</option>
            <option value="c">C</option>
          </select>
        </div>
      </div>
    </nav>
  );
};
