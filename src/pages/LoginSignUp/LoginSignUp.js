import React, { useState } from 'react';

const LoginSignUp = () => {
    const [isNewUser, setIsNewUser] = useState(false);
    const [isEmployer, setIsEmployer] = useState(false);
    return (
        <div className="page auth-page">
            <form>                
                {
                    isNewUser &&
                    <div className="input-container">
                        <label htmlFor="name" >
                        Enter Your Full Name
                        </label>
                        <input id="name" type="text" name="name" placeholder="Your Full Name" />
                    </div>
                }
                <div className="input-container">
                    <label htmlFor="email" >
                        Enter Your Email
                    </label>
                    <input id="email" type="email" name="email" placeholder="Email" />
                </div>
                <div className="input-container">
                    <label htmlFor="password" >
                        Enter Your password
                    </label>
                    <input id="password" type="password" name="password" placeholder="Password" />
                </div>
                {
                    isNewUser &&
                    // <div className="input-container">
                        <label style={{marginBottom: "5px", display: "block"}}><input type="checkbox" onChange={(e) => {
                            setIsEmployer(e.target.checked);
                        }} /> I'm a Employer</label>
                        
                    // </div>
                }
                {
                    isNewUser && isEmployer &&
                    <div className="input-container">
                        <label htmlFor="package" >
                        Select A Package
                        </label>
                        <select name="package" id="package">
                            <option value="0">Basic Account</option>
                            <option value="1">Standard Account</option>
                            <option value="2">Premium Account</option>
                        </select>
                    </div>
                }
                {
                    isEmployer && <p>Payment</p>
                }
                <button type="submit">{isNewUser ? "Sign Up" : "Login" }</button>
                {
                     
                    <p>{isNewUser ? "Already" : "Don't"}  have an account? <span onClick={() => setIsNewUser(!isNewUser)}>{isNewUser ? "Login" : "Sign Up"}</span></p>
                }
            </form>
        </div>
    );
};

export default LoginSignUp;