import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AuthBtn from "./UI/AuthBtn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const navItems = [
  { name: "Recommendation", route: "/" },
  { name: "Skill", route: "/skill" },
];

export function Header({ drawerWidth, ...props }) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const a = useSelector((s) => s.auth);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            nothingToDo
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {a.email &&
              navItems.map((item) => (
                <Link to={item.route}>
                  <Button key={item.name} sx={{ color: "#fff" }}>
                    {item.name}
                  </Button>
                </Link>
              ))}
            <AuthBtn />
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              padding: 1,
            },
          }}
        >
          {
            <Box
              onClick={handleDrawerToggle}
              sx={{ textAlign: "center" }}
            >
              <CssBaseline></CssBaseline>
              <Typography variant="h6" sx={{ my: 2 }}>
                beBetter
              </Typography>
              <Divider />
              {a.email && (
                <List>
                  {navItems.map((item) => {
                    return (
                      <ListItem key={item.name} disablePadding>
                        <Link to={item.route}>
                          <Button
                            key={item.name}
                            sx={{ color: "#000" }}
                          >
                            {item.name}
                          </Button>
                        </Link>
                      </ListItem>
                    );
                  })}
                </List>
              )}

              <AuthBtn sx={{ color: "#fff" }} />
            </Box>
          }
        </Drawer>
      </nav>
    </Box>
  );
}
