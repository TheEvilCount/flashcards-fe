import React, { useState } from 'react';
import "./login.css"

export default function Login()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //const dispatch = useAuthDispatch();
    //const { loading, errorMessage } = useAuthState(); //read the values of loading and errorMessage from context



    const handleLogin = async (e) => 
    {
        e.preventDefault();
        //setError(null);
        //setLoading(true);

        //axios.post.....
        try
        {
            //let response = await loginUser(dispatch, { email, password });//loginUser action makes the request and handles all the neccessary state changes
            //if (!response.user) return;
        }
        catch (error)
        {
            console.log(error);
        }
        //setLoading(false);
        //setUserSession
        //props.history.push('/dashboard') //navigate to dashboard on success
    }

    return (
        <div>
            Login page
            Login<br /><br />
            <form >
                <div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                {/*errorMessage ? <p style={{ color: 'red' }}>{errorMessage}</p> : null*/}
                <button onClick={handleLogin} disabled={false/*loading*/}>login</button>
            </form>
        </div >
    )
}