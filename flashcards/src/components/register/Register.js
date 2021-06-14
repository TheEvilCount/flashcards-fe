import React from 'react';

export default function Register()
{
    const handleRegister = async (e) => 
    {
        e.preventDefault();
        alert("handling register");
    };

    return (
        <div>
            register page
            <form>
                <button type="submit" onClick={handleRegister}>Register</button>
            </form>
        </div>
    )
}