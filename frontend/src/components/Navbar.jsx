import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <img
          src="/axa.svg"
          alt="AXA Logo"
          style={{ height: "40px", marginRight: "16px" }}
        />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Tarification IARD
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Accueil
          </Button>
          <Button color="inherit" component={Link} to="/new">
            Nouveau devis
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
