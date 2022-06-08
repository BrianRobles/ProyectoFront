import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ToLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login');
  }, [navigate]);
};

export default ToLogin;
