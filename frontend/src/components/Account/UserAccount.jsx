import React, { useState } from 'react';
import { 
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  TextField,
  Stack,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const DashboardButton = styled(Button)(({ theme }) => ({
  margin: '10px',
  padding: '15px 30px',
  borderRadius: '8px',
  width: '200px',
  fontSize: '1.1rem',
  background: `linear-gradient(#579040, #487C3E)`,
  color: 'white',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 8px rgba(0,0,0,0.2)',
  },
}));

const AdCard = styled(Card)(({ theme }) => ({
  margin: '10px',
  transition: 'transform 0.2s',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const UserAccount = () => {
  const [activeTab, setActiveTab] = useState('myAds');

  const myAds = [
    {
      id: 1,
      title: 'iPhone 12',
      price: '৳62,999',
      image: 'https://via.placeholder.com/300x200',
      description: 'Excellent condition, 1 year old'
    },
    {
      id: 2,
      title: 'Samsung Galaxy S21',
      price: '৳52,999',
      image: 'https://via.placeholder.com/300x200',
      description: 'Like new, complete box'
    }
  ];

  const favoriteAds = [
    {
      id: 1,
      title: 'Gaming Laptop',
      price: '৳85,000',
      image: 'https://via.placeholder.com/300x200',
      description: 'High-performance gaming laptop with NVIDIA graphics and 16GB RAM'
    },
    {
      id: 2,
      title: '27-inch Monitor',
      price: '৳12,000',
      image: 'https://via.placeholder.com/300x200',
      description: 'Crystal clear display with 144Hz refresh rate'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'myAds':
        return (
          <Grid container spacing={3}>
            {myAds.map((ad) => (
              <Grid item xs={12} sm={6} md={4} key={ad.id}>
                <AdCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={ad.image}
                    alt={ad.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {ad.title}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                      {ad.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {ad.description}
                    </Typography>
                  </CardContent>
                </AdCard>
              </Grid>
            ))}
          </Grid>
        );
      case 'favorites':
        return (
          <Grid container spacing={3}>
            {favoriteAds.map((ad) => (
              <Grid item xs={12} sm={6} md={4} key={ad.id}>
                <AdCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={ad.image}
                    alt={ad.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {ad.title}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                      {ad.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {ad.description}
                    </Typography>
                  </CardContent>
                </AdCard>
              </Grid>
            ))}
          </Grid>
        );
      case 'settings':
        return (
          <Box sx={{ maxWidth: 600, mx: 'auto', p: 3, backgroundColor: '#d9fdd3', borderRadius: '10px' }}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h6" gutterBottom>Change Details</Typography>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Email"
                    defaultValue="zx45cv90@gmail.com"
                    disabled
                  />
                  <TextField
                    fullWidth
                    label="Name"
                    defaultValue="ZX CV"
                  />
                  <TextField
                    fullWidth
                    label="Location"
                  />
                  <TextField
                    fullWidth
                    label="Sub Location"
                  />
                  <Button 
                    variant="contained" 
                    color="primary"
                    sx={{
                      whiteSpace: 'nowrap',
                      minWidth: 'fit-content',
                      alignSelf: 'flex-start'
                    }}
                  >
                    Update Details
                  </Button>
                </Stack>
              </Box>

              <Divider />

              <Box>
                <Typography variant="h6" gutterBottom>Change Password</Typography>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    type="password"
                    label="New Password"
                  />
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm New Password"
                  />
                  <Button 
                    variant="contained" 
                    color="primary"
                    sx={{
                      whiteSpace: 'nowrap',
                      minWidth: 'fit-content',
                      alignSelf: 'flex-start'
                    }}
                  >
                    Change Password
                  </Button>
                </Stack>
              </Box>

              <Divider />

              <Stack direction="row" spacing={2} justifyContent="space-between">
              <Button 
                  variant="outlined" 
                  color="error"
                  sx={{
                    whiteSpace: 'nowrap',
                    minWidth: 'fit-content'
                  }}
                >
                  Delete Account
                </Button>
                <Button 
                  variant="outlined"
                  sx={{
                    whiteSpace: 'nowrap',
                    minWidth: 'fit-content'
                  }}
                >
                  Log Out
                </Button>
              </Stack>
            </Stack>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mb: 5,
          textAlign: 'center',
          background: 'linear-gradient(#579040, #487C3E)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
        }}
      >
        My Account
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        justifyContent: 'center', 
        mb: 6,
        gap: 2
      }}>
        <DashboardButton
          variant={activeTab === 'myAds' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('myAds')}
        >
          My Ads
        </DashboardButton>
        <DashboardButton
          variant={activeTab === 'favorites' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('favorites')}
        >
          Favorites
        </DashboardButton>
        <DashboardButton
          variant={activeTab === 'settings' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </DashboardButton>
      </Box>

      <Box sx={{ mt: 4 }}>
        {renderContent()}
      </Box>
    </Container>
  );
};

export default UserAccount;
