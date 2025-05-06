import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider } from '@mui/material';
import sidebarConfig from '../config/sidebarConfig';

const Sidebar = () => {
  return (
    <Drawer
      variant='permanent'
      sx={{
        width: '240px',
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: '240px',
          boxSizing: 'border-box',
        },
      }}>
      <Toolbar />
      <Divider />

      <List>
        {sidebarConfig.map((item) => (
          <ListItemButton key={item.name} component={Link} to={item.route}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
