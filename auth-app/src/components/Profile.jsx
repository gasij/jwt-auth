import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return <div>Загрузка...</div>;

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4">
          Профиль пользователя
        </Typography>
        <Box sx={{ mt: 3, width: '100%' }}>
          <Typography variant="h6">Имя: {user.username}</Typography>
          <Typography variant="h6">Email: {user.email}</Typography>
          <Typography variant="h6">
            Дата регистрации: {new Date(user.created_at).toLocaleDateString()}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: 3 }}
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;