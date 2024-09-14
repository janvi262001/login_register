import React from 'react';
import AuthForm from '../Components/AuthForm';

function AdminLogin() {
  return <AuthForm role="admin" action="login" />;
}

export default AdminLogin;
