import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import MenuList from "../MenuList/MenuList";
import "./HeaderComponent.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  height: "50px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingTop: theme.spacing(1.7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

interface HeaderComponentProps {
  className?: string;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ className }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Login/Sign Up</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

const [isLoggedIn, setIsLoggedIn] = useState(false);

const logout = async () => {
    const navigate = useNavigate();
    localStorage.removeItem("jwtToken");
    navigate("/login")
    setIsLoggedIn(false);
}

useEffect(() => {
  const token = localStorage.getItem("jwtToken");

  if (token && !isTokenExpired(token)) {
    setIsLoggedIn(true);
  } else {
    logout(); // Ensure user is logged out if token is missing/expired
  }
}, []); // Runs only on mount



const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp <= now; // Token is expired if exp is less than or equal to current time
  } catch {
    return true; // Treat invalid token as expired
  }
};


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#008B8B", height: "80px" }}
      >
        <Toolbar sx={{ height: "100%" }}>
          <Typography
            variant="h6"
            fontSize={30}
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link to="/"  className="link-reset">
              Party-Call
            </Link>
          </Typography>
          <Search sx={{ display: "none" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Events....."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex" } }}
            className="drop-down"
          >
            <IconButton
              size="medium"
              aria-label="Find Events"
              color="inherit"
              sx={{ mr: 5, fontSize: 15 , '&:hover': {
              backgroundColor: 'transparent', // Removes hover background
            },}}
            >
              <Link to="find-events" className="link-reset">
                <p className="find-events">Find Events</p>
              </Link>
            </IconButton>
            <IconButton
              size="medium"
              aria-label="Create Events"
              color="inherit"
              sx={{ mr: 5, fontSize: 15, '&:hover': {
              backgroundColor: 'transparent', // Removes hover background
            }, }}
            >
              <Link to="create-event" className="link-reset">
                <p className="find-events">Create Events</p>
              </Link>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="Help Center"
              color="inherit"
              sx={{ mr: 5, fontSize: 15, '&:hover': {
              backgroundColor: 'transparent', // Removes hover background
            }, }}
            >
              <p className="find-events">Help Center</p>
            </IconButton>
            {!isLoggedIn && (
              <IconButton
                size="large"
                edge="end"
                aria-label="Login/Sign Up"
                color="inherit"
                sx={{ mr: 10, fontSize: 15, '&:hover': {
              backgroundColor: 'transparent', // Removes hover background
            }, }}
              >
                <Link to="login" className="link-reset">
                  <p className="find-events">Login/Sign Up</p>
                </Link>
              </IconButton>
            )}

            {isLoggedIn &&  <MenuList></MenuList>}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default HeaderComponent;
