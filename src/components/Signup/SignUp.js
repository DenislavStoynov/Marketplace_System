import { useState } from 'react';

const SignUp = ({ userList, setUserList, setDataBase }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const updateUsername = (event) => {
        setUsername(event.target.value.replace(/ /g, ''));
    };

    const updatePassword = (event) => {
        setPassword(event.target.value.replace(/ /g, ''));
    };

    const duplicateUsernameChecker = () => {
        return userList.every(user => {
            if (user.username === username) return false;
            return true;
        })
    };

    const generalFormValidation = () => {
        if (username.trim().length > 5 && password.trim().length > 5) return true;
        return false
    };

    const createUser = async () => {
        if (generalFormValidation()) {
            if (duplicateUsernameChecker()) {
                await fetch('https://market-place-31e77-default-rtdb.firebaseio.com/users.json', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: Math.random(),
                        username: username,
                        password: password,
                        products: false
                    })
                });
                setUsername('');
                setPassword('');
            } else throw new Error("This username is already taken!")
        } else throw new Error("Username and password must contain at least 5 characters!");
    };

    const updateUserListState = async () => {
        const response = await fetch('https://market-place-31e77-default-rtdb.firebaseio.com/users.json');
        const data = await response.json();
        setUserList(Object.values(data));
        setDataBase(data);
    }

    const registerUser = async (event) => {
        event.preventDefault();
        try {
            await createUser();
            await updateUserListState();
        } catch (err) {
            alert(err);
        }
    };

    return (
        <section>
            <h1>Sign Up</h1>
            <form onSubmit={registerUser}>
                <input type='text' value={username} placeholder='Enter username...' onChange={updateUsername} />
                <input type='password' value={password} placeholder='Enter password...' onChange={updatePassword} />
                <button>Sign Up</button>
            </form>
        </section>
    );
}

export default SignUp;