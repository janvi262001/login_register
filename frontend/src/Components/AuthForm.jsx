import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function AuthForm({ role, action }) {
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = action === 'register' ? '/register' : '/login-admin';
      const data = action === 'register' ? { ...formData, role } : formData;
      const response = await axios.post(`http://localhost:5000${endpoint}`, data);
      
      toast.success(response.data.message);

      if (action === 'register') {
        navigate('/login-admin');
      } else if (action === 'login') {
        navigate('/admin-dashboard');
      }
    } catch (error) {
      toast.error(error.response.data.message || 'An error occurred', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
            <h2 className="text-center mb-4">{action === 'register' ? `Register as ${role}` : 'Login as Admin'}</h2>
            {action === 'register' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </>
            )}
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {action === 'register' ? `Register as ${role}` : 'Login as Admin'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AuthForm;
