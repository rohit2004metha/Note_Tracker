import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData ] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData); // Log form data before submitting
        try {
            // Make API call to register user
            const response = await fetch('http://localhost:5001/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log("Response from server:", data); // Log server response
            if (response.ok) {
                // Registration successful, redirect to login page
                navigate('/login');
            } else {
                // Registration failed, set error message
                setError(data.error || 'Failed to register user');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('An error occurred while registering');
        }
    };

    return (
        <div>
            <h3>Sign Up</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                {/* Your form inputs */}
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
