import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "3B3B61" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ display: "flex" }}>
            Weather Api (5 days)
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
