// src/components/landingPage/Header.jsx
import React, { useState, useEffect } from "react";
import Register from "../AuthPage/Register";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Header = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLoginButtonClick = () => {
    navigate("/Register");
  };

  const handleGuestLogin = () => {
    alert("Warden Login - Navigate to login");
    navigate("/login"); // Replace with your desired route
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Home", to: "/#hero-section" },
    { text: "Features", to: "/#features-section" },
    { text: "Team", to: "/#team-section" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={scrolled ? 4 : 0}
        sx={{
          backgroundColor: scrolled ? "transparent" : "#0D0D0D",
          transition: "background-color 0.5s ease",
        }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              letterSpacing: "2px",
              color: "#FFFFFF",
              textDecoration: "none",
              cursor: "pointer",
              "&:hover": {
                color: "#1E90FF",
              },
            }}
          >
            RoomMate{" "}
            <span style={{ color: "#1E90FF", letterSpacing: "0.25px" }}>
              (HMS)
            </span>
          </Typography>
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.text}
                component={HashLink}
                smooth
                to={item.to}
                scroll={(el) =>
                  el.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                sx={{
                  color: "#FFFFFF",
                  marginX: 1,
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "14px",
                  "&:hover": {
                    color: "#1E90FF",
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
            <Box sx={{ display: "flex", alignItems: "center", marginLeft: 2 }}>
              <Button
                variant="contained"
                onClick={handleLoginButtonClick}
                sx={{
                  backgroundColor: "#1E90FF",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  marginX: 1,
                  textTransform: "none",
                  paddingX: 3,
                  paddingY: 1,
                  borderRadius: "8px",
                  transition: "background-color 0.3s, transform 0.3s",
                  fontSize: "13px",
                  "&:hover": {
                    backgroundColor: "#63B3ED",
                    transform: "scale(1.05)",
                    boxShadow: "0px 6px 20px rgba(30, 144, 255, 0.4)",
                  },
                }}
              >
                Register
              </Button>
              <Button
                variant="outlined"
                onClick={handleGuestLogin}
                sx={{
                  color: "#1E90FF",
                  fontWeight: "bold",
                  marginX: 1,
                  textTransform: "none",
                  paddingX: 3,
                  paddingY: 1,
                  borderRadius: "8px",
                  border: "2px solid #1E90FF",
                  transition:
                    "background-color 0.3s, transform 0.3s, color 0.3s",
                  fontSize: "13px",
                  "&:hover": {
                    backgroundColor: "#1E90FF",
                    color: "#FFFFFF",
                    transform: "scale(1.05)",
                    boxShadow: "0px 6px 20px rgba(30, 144, 255, 0.4)",
                  },
                }}
              >
                Login
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            backgroundColor: "#0D0D0D",
            height: "100%",
            color: "#FFFFFF",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text}>
                <ListItemText
                  primary={
                    <HashLink
                      smooth
                      to={item.to}
                      scroll={(el) =>
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        })
                      }
                      style={{
                        color: "#FFFFFF",
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                    >
                      {item.text}
                    </HashLink>
                  }
                />
              </ListItem>
            ))}
            <Box sx={{ borderTop: "1px solid #FFFFFF33", my: 1 }} />
            <ListItem button onClick={handleLoginButtonClick}>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#1E90FF",
                      textAlign: "center",
                    }}
                  >
                    Sign In / Register
                  </Typography>
                }
              />
            </ListItem>
            <ListItem button onClick={handleGuestLogin}>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#1E90FF",
                      textAlign: "center",
                    }}
                  >
                    Warden Login
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
