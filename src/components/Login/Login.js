import React, { useState, useRef, useContext } from 'react';
import { NavLink, Route, useHistory } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import { LoggedContext } from '../../ctx/LoggedContext';



const Login = ({ userList, database }) => {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoggedContext);
    const [user, setUser] = useState('');
    const username = useRef();
    const password = useRef();
    const history = useHistory();

    const updateUsr = (event) => {
        setUser(event.target.value);
    };

    const validateCredentials = () => {
        return userList
            .find(user => user.username === username.current.value && user.password === password.current.value);
    };

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    const loginUser = (event) => {
        event.preventDefault();
        try {
            if (validateCredentials()) {
                setIsLoggedIn(true)
                localStorage.setItem(getKeyByValue(database, validateCredentials()), JSON.stringify(validateCredentials()));
                history.push('/dashboard');
            } else {
                setIsLoggedIn(false);
                throw new Error("Invalid credentials!")
            };
        } catch (err) {
            alert(err);
        }
    };

    return isLoggedIn || localStorage.length > 0 ? (
        <div>
            <Dashboard />
        </div>
    ) : (
        <div>
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <input type='text' placeholder="Enter username..." ref={username} onChange={updateUsr} />
                <input type='password' placeholder="Enter password..." ref={password} />
                <button>Login</button>
            </form>
        </div>
    )
};

export default Login;