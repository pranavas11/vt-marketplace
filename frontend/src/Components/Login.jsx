import React, { useState } from "react";
// import { Button } from 'react-bootstrap-buttons';
import { Button } from 'react-bootstrap';
//import { NotificationContainer, NotificationManager } from 'react-notifications';
//import 'react-notifications/lib/notifications.css';

const Login = ({ signIn, closeLogin }) => {
    return (
        <div>
            <p>Login</p>
        </div>
    )

    /* const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        if (username === 'admin' && password === '123456') {
            NotificationManager.success('You Are Successfully Logged In!', '', 3000);
            signIn(true);           // update the signedIn state to true
            closeLogin(false);      // close the login popup
        } else {
            NotificationManager.error('Incorrect Username or Password!', '', 3000);
            alert('Please Enter the Correct Username and Password!');
        }
    };

    return (
        <div className="login_container" >
            <div className="login_page">
                <div className="cancel_button">
                    <Button onClick={() => closeLogin(false)}>X</Button>
                </div>
                
                <form>
                    <h2 htmlFor="username">Username</h2>

                    <input type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        username="username" id="username" name="username" />

                    <h2 htmlFor="password">Password</h2>
                    <input type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        password="password" id="password" name="password" />
                </form>

                <Button className="submit_button" onClick={handleSubmit}>
                    Submit
                </Button>
                <NotificationContainer />
            </div>
        </div>
    ); */
};

export default Login;