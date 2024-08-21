import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { auth } from '../../firebase.config'; // Import the initialized auth
import { Menu, MenuItem, IconButton, Modal, Box, Button, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setOpen(true);
    handleMenuClose();
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login'); // Redirect to the login page
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <header className="flex justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center space-x-2">
        <IconButton onClick={handleMenuOpen} color="inherit">
          <AccountCircleIcon style={{ fontSize: 30 }} />
        </IconButton>
        <span>{userEmail || 'Loading...'}</span>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="logout-confirmation"
          aria-describedby="logout-confirmation-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 300,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="logout-confirmation" variant="h6" component="h2">
              Logout Confirmation
            </Typography>
            <Typography id="logout-confirmation-description" sx={{ mt: 2 }}>
              Are you sure you want to logout?
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleLogout} color="primary" variant="contained">
                Confirm
              </Button>
              <Button onClick={handleCloseModal} color="secondary" variant="outlined" sx={{ ml: 2 }}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </header>
  );
};

export default Header;
