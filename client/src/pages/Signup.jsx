import React, { useImperativeHandle, useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import '../App.css'
// import { useAuth } from '../utils/authContext';
function Signup() {
    const [formData, setFormData] = useState({ username: "", email: "", password: "", phone: "" });
    // const { loggedIn, setLoggedIn } = useAuth()

    const [addUser, { error }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value})
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("submit button clicked", formData);

        try {
            const { data } = await addUser({
                variables: {username: formData.username, email: formData.email, password: formData.password, phone: formData.phone}
            });
            console.log("Form Data:", data); // Optional: Handle the response data as needed
            Auth.login(data.addUser.token);
            // Reset form data after successful submission
            setFormData({ username: "", email: "", password: "", phone: "" });
            window.location.assign('/Store')
            // Optional: Redirect or perform further actions upon success
            // Auth.login(data.addUser.token); // Assuming your mutation returns a token for authentication
        } catch (e) {
            console.error("Issue adding user info to database", e);
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    {/* <label  htmlFor="username">First Name:</label> */}
                    <input
                        className="input-field"
                        placeholder='Create a User Name'
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div>
                    {/* <label className="label" htmlFor="email">Email:</label> */}
                    <input
                        className="input-field"
                        placeholder='Enter Your Email'
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    {/* <label className="label" htmlFor="phone">Phone:</label> */}
                    <input
                        className="input-field"
                        placeholder='Phone Number'
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    {/* <label className="label" htmlFor="password">Password:</label> */}
                    <input
                        className="input-field"
                        placeholder='Create a Password'
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
                {error && <p>Error submitting form</p>}
            </form>
        </div>
    );
}

export default Signup;
