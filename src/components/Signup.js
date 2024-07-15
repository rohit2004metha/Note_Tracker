import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'; // Import the CSS file

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch('http://localhost:5001/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      navigate('/');
      props.showAlert('Account Created Successfully', 'success');
    } else {
      props.showAlert('Invalid Credentials', 'danger');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="signup-container">
        <div className="image-side">
          <img src="/sign-up.jpg" alt="Signup Illustration" />
        </div>
        <form onSubmit={handleSubmit} className="form-container">
          <h1 className="multi-color-text">Sign Up To Use NoteTaker</h1>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-input"
              id="name"
              name="name"
              value={credentials.name}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-input"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
            <small id="emailHelp" className="form-text">We'll never share your email with anyone else.</small>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-input"
              id="cpassword"
              name="cpassword"
              value={credentials.cpassword}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>

          <button type="submit" className="form-submit">Submit</button>

          <p className="have-account">Already have an account? <Link to="/login">Login</Link></p>
        </form>

      </div>
  
    </>
  );
};

export default Signup;
