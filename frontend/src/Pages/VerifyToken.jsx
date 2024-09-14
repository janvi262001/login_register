import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function VerifyEmail() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/verify/${token}`);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        navigate('/dashboard');
      } catch (err) {
        toast.error(err.response?.data?.message || 'An error occurred', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        setError(err.response?.data?.message || 'An error occurred'); 
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <div className="verify-email">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {error && <p>{error}</p>}
          {!error && !loading && <p>Verification successful! Redirecting to dashboard...</p>}
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
