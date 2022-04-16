import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {ListItemButton} from "@mui/material";
import mainNavItem from "./const";
import {useNavigate} from "react-router-dom";

const drawerWidth = 240;
type Props = {};

const Navbar = (props: Props) => {
    const navigate = useNavigate();

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: "#101f33",
                    color: 'rgba(255,255,255,0.7)',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar/>
            <Divider/>
            <List>
                {mainNavItem.map((item, index) => (
                    <ListItemButton key={item.id}
                                    onClick={() => navigate(item.route)}
                    >
                        <ListItemIcon sx={{color: 'rgba(255,255,255,0.7)',}}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.label}/>
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
};

export default Navbar;