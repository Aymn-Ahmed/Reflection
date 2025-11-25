// components/layout/Navbar.jsx
import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ColorModeContext from "../../context/colorModeContext";

const Navbar = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const colorMode = useContext(ColorModeContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // --- التحسين رقم 1: تعريف الروابط في مكان واحد ---
  // روابط تظهر دائماً
  const publicLinks = [{ name: "الرئيسية", path: "/" }];

  // روابط تظهر فقط للمستخدم المسجل دخوله
  const userLinks = [
    { name: "أضف تدبر", path: "/add" }, // مثال على رابط جديد
    { name: "الملف الشخصي", path: "/profile" },
  ];
  // دمج الروابط بناءً على حالة تسجيل الدخول
  const navLinks = currentUser ? [...publicLinks, ...userLinks] : publicLinks;
  // --- التعامل مع القوائم والإجراءات ---
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const handleLogout = () => {
    handleMenuClose(); // أغلق القائمة المنسدلة إذا كانت مفتوحة
    logout();
    navigate("/");
  };

  // --- التحسين رقم 2: بناء قائمة منسدلة للمستخدم بشكل منظم ---
  const ProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
        الملف الشخصي
      </MenuItem>
      <MenuItem onClick={handleLogout}>تسجيل الخروج</MenuItem>
    </Menu>
  );

  // --- التحسين رقم 3: بناء قائمة الجوال بشكل ديناميكي ونظيف ---
  const DrawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navLinks.map((link) => (
          <ListItem
            key={link.name}
            component={Link}
            to={link.path}
            disablePadding
          >
            <ListItemButton>
              <ListItemText primary={link.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <hr style={{ margin: "8px 0" }} />
        {/* Theme toggle inside drawer for mobile */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => colorMode?.toggleColorMode?.()}>
            <ListItemText
              primary={
                theme.palette.mode === "dark" ? "وضع النهار" : "وضعّ الليل"
              }
            />
          </ListItemButton>
        </ListItem>
        {currentUser ? (
          <ListItem onClick={handleLogout} disablePadding>
            <ListItemButton>
              <ListItemText primary="تسجيل الخروج" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem component={Link} to="/login" disablePadding>
            <ListItemButton>
              <ListItemText primary="تسجيل الدخول" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          🌿 تدبر
        </Typography>

        {isMobile ? (
          // --- عرض نسخة الجوال ---
          <>
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {DrawerContent}
            </Drawer>
          </>
        ) : (
          // --- عرض نسخة سطح المكتب ---
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navLinks.map((link) => (
              <Button
                key={link.name}
                component={Link}
                to={link.path}
                color="inherit"
              >
                {link.name}
              </Button>
            ))}

            {/* theme toggle button */}
            <IconButton
              onClick={() => colorMode?.toggleColorMode?.()}
              color="inherit"
              aria-label="toggle theme"
              sx={{ ml: 0.5, transition: "transform 200ms" }}
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>

            {currentUser ? (
              <>
                <IconButton onClick={handleMenuOpen} color="inherit">
                  <AccountCircle />
                </IconButton>
                {ProfileMenu}
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="success"
              >
                دخول
              </Button>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
