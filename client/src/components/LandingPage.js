import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  Grid, 
  IconButton,
  Fade,
  Slide,
  Card,
  CardContent,         
  TextField,
  useTheme,
  useMediaQuery,           
} from '@mui/material';
import { Menu, Close, Email, Phone, Facebook, Instagram, LinkedIn } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { alpha } from '@mui/material/styles';

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    { 
      title: 'Document Analysis', 
      content: 'Analyze and extract data from Legal documents', 
      color: '#2A5C7D',
      icon: '📄'
    },
    { 
      title: 'Compliance Interaction', 
      content: 'Real-time regulatory compliance checks', 
      color: '#4CAF50',
      icon: '🛡️'
    },
    { 
      title: 'Smart Expense Tracking', 
      content: 'Helps you track and manage expenses efficiently', 
      color: '#FF5722',
      icon: '📊'
    }
  ];

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Modern Glass Navigation */}
      <AppBar position="fixed" sx={{ 
        bgcolor: 'rgba(255,255,255,0.85)', 
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.3)',
        py: 1,
        transition: '0.3s',
      }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 900,
                background: 'linear-gradient(45deg, #2A5C7D 30%, #4CAF50 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px'
              }}>
                Insightify
              </Typography>
            </motion.div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {['About', 'Feedback', 'Contact'].map((item) => (
                  <motion.div key={item} whileHover={{ y: -2 }}>
                    <Button 
                      component={Link} 
                      to={`/${item.toLowerCase()}`} 
                      sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                        '&:hover': { 
                          background: 'linear-gradient(45deg, #4CAF50 30%, #2A5C7D 90%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }
                      }}
                    >
                      {item}
                    </Button>
                  </motion.div>
                ))}
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    sx={{
                      px: 4,
                      borderWidth: 2,
                      borderColor: '#FF5722',
                      color: '#FF5722',
                      fontWeight: 700,
                      '&:hover': { 
                        borderWidth: 2,
                        backgroundColor: '#FF5722',
                        color: 'white'
                      }
                    }}
                  >
                    Login
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    sx={{
                      px: 4,
                      background: 'linear-gradient(45deg, #FF5722 0%, #FF9100 100%)',
                      fontWeight: 700,
                      boxShadow: '0 8px 24px rgba(255,87,34,0.3)',
                      '&:hover': {
                        boxShadow: '0 12px 30px rgba(255,87,34,0.4)'
                      }
                    }}
                  >
                    Sign Up
                  </Button>
                </motion.div>
              </Box>
            )}

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <IconButton onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <Close /> : <Menu />}
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu */}
      <Slide direction="down" in={menuOpen} mountOnEnter unmountOnExit>
        <Box sx={{ 
          position: 'fixed', 
          top: 64, 
          left: 0, 
          right: 0, 
          bgcolor: 'background.paper',
          zIndex: 999,
          p: 2,
          boxShadow: 3,
          backdropFilter: 'blur(12px)'
        }}>
          {['Features', 'Work', 'Contact', 'Login', 'Sign Up'].map((item) => (
            <motion.div key={item} whileTap={{ scale: 0.95 }}>
              <Button 
                fullWidth 
                component={Link} 
                to={`/${item.toLowerCase().replace(' ', '')}`}
                sx={{ 
                  py: 2,
                  fontWeight: 700,
                  color: item === 'Sign Up' ? 'white' : 'text.primary',
                  background: item === 'Sign Up' ? 
                    'linear-gradient(45deg, #FF5722 0%, #FF9100 100%)' : 'transparent',
                  '&:hover': {
                    background: item !== 'Sign Up' ? 
                      'linear-gradient(45deg, #4CAF50 30%, #2A5C7D 90%)' : 
                      'linear-gradient(45deg, #FF5722 0%, #FF9100 100%)',
                    WebkitBackgroundClip: item !== 'Sign Up' ? 'text' : 'border-box',
                    WebkitTextFillColor: item !== 'Sign Up' ? 'transparent' : 'white'
                  }
                }}
              >
                {item}
              </Button>
            </motion.div>
          ))}
        </Box>
      </Slide>

      {/* Animated Hero Section */}
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(45deg, rgba(42,92,125,0.95) 30%, rgba(76,175,80,0.95)), url(/modern-office-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: 'white',
        pt: 12,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
              <Typography variant="h1" sx={{
                fontWeight: 900,
                fontSize: { xs: '2.5rem', md: '4rem' },
                lineHeight: 1.2,
                mb: 3,
                textShadow: '0 4px 20px rgba(0,0,0,0.2)'
              }}>
                Transform Your{' '}
                <Box component="span" sx={{
                  background: 'linear-gradient(45deg, #4CAF50 30%, #FFD700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Management  Ops
                </Box>
              </Typography>
              <Typography variant="h5" sx={{ 
                mb: 5,
                fontWeight: 300,
                opacity: 0.9
              }}>
                 Efficient Expense Tracking and Document Insights
              </Typography>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/signup"
                  sx={{
                    px: 6,
                    py: 2,
                    borderRadius: 4,
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    background: 'linear-gradient(45deg, #FF5722 30%, #FFD700 100%)',
                    boxShadow: '0 8px 30px rgba(255,87,34,0.3)',
                    '&:hover': {
                      boxShadow: '0 12px 40px rgba(255,87,34,0.4)'
                    }
                  }}
                >
                  Start Free Trial →
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Modern Features Section */}
      <Box id="features" sx={{ py: 12, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" align="center" sx={{ 
              fontWeight: 900,
              mb: 8,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                background: 'linear-gradient(45deg, #4CAF50 30%, #FFD700 100%)',
                borderRadius: 2
              }
            }}>
              Smart Solutions
            </Typography>
            <Grid 
  container 
  spacing={3} 
  sx={{ 
    mt: 4,
    // Add container styles to ensure proper layout
    width: '100%',
    margin: '0 auto',
    flexWrap: 'nowrap', // Prevent wrapping
    '@media (max-width: 900px)': { // Adjust breakpoint as needed
      flexWrap: 'wrap' // Allow wrapping on smaller screens
    }
  }}
>
  {features.map((feature, index) => (
    <Grid 
      item 
      xs={12} 
      sm={6} 
      md={4} 
      lg={4} 
      key={feature.title}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        // Fix width calculation with spacing
        width: `calc(33.3333% - ${theme.spacing(3)})`,
        flex: '0 0 auto',
        [theme.breakpoints.down('md')]: {
          width: `calc(50% - ${theme.spacing(3)})`
        },
        [theme.breakpoints.down('sm')]: {
          width: '100%'
        }
      }}
    >
      <motion.div
        style={{ width: '100%' }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
      >
        <Card sx={{
          p: 4,
          minHeight: 400,
          width: '100%',
          height: '100%', // Ensure equal height
          background: `linear-gradient(45deg, ${feature.color} 30%, ${alpha(feature.color, 0.7)} 100%)`,
          color: 'white',
          borderRadius: 4,
          transition: '0.3s',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: `0 20px 40px ${alpha(feature.color, 0.3)}`
          }
        }}>
          <CardContent sx={{ 
            textAlign: 'center',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <Box sx={{
              width: 80,
              height: 80,
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              mb: 3,
              mx: 'auto'
            }}>
              {feature.icon}
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                {feature.title}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 300 }}>
                {feature.content}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  ))}
</Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Interactive Contact Section */}
      <Box id="contact" sx={{ py: 12, background: 'radial-gradient(circle at center, #f8f9fa 0%, #e9ecef 100%)' }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card sx={{
              p: 6,
              borderRadius: 4,
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 30px 60px rgba(42,92,125,0.15)'
            }}>
              <Typography variant="h2" align="center" sx={{ 
                fontWeight: 900,
                mb: 6,
                background: 'linear-gradient(45deg, #2A5C7D 30%, #4CAF50 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Start Your Journey
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      sx: {
                        borderRadius: 2,
                        '&:focus-within': {
                          boxShadow: '0 0 0 2px rgba(42,92,125,0.3)'
                        }
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      sx: {
                        borderRadius: 2,
                        '&:focus-within': {
                          boxShadow: '0 0 0 2px rgba(76,175,80,0.3)'
                        }
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      sx: {
                        borderRadius: 2,
                        '&:focus-within': {
                          boxShadow: '0 0 0 2px rgba(255,87,34,0.3)'
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Message"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={5}
                    InputProps={{
                      sx: {
                        borderRadius: 2,
                        '&:focus-within': {
                          boxShadow: '0 0 0 2px rgba(42,92,125,0.3)'
                        }
                      }
                    }}
                  />
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Button 
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{
                        mt: 2,
                        py: 2,
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #2A5C7D 30%, #4CAF50 90%)',
                        '&:hover': {
                          boxShadow: '0 8px 24px rgba(42,92,125,0.3)'
                        }
                      }}
                    >
                      Send Message
                    </Button>
                  </motion.div>
                </Grid>
              </Grid>
            </Card>
          </motion.div>
        </Container>
      </Box>

      {/* Modern Footer */}
      <Box sx={{ 
        bgcolor: '#1A2332', 
        color: 'white', 
        py: 8,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -50,
          left: 0,
          right: 0,
          height: 100,
          background: 'linear-gradient(transparent, #1A2332)'
        }
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Transform Your Finance Operations
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Email sx={{ color: '#4CAF50' }} />
                  <Typography>Insightifypvtltd@gmail.com</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Phone sx={{ color: '#4CAF50' }} />
                  <Typography>+1 (555) 123-4567</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Connect With Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {[
                  { icon: <Facebook />, color: '#4267B2' },
                  { icon: <Instagram />, color: '#E1306C' },
                  { icon: <LinkedIn />, color: '#0077b5' }
                ].map((social, index) => (
                  <motion.div key={index} whileHover={{ y: -3 }}>
                    <IconButton 
                      sx={{ 
                        background: social.color,
                        color: 'white',
                        '&:hover': { background: alpha(social.color, 0.9) }
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}