import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { UserContext } from '../../App';

const LoginSignUp = () => {
    // eslint-disable-next-line
    const [userInfo, setUserInfo] = useContext(UserContext);
    const [isNewUser, setIsNewUser] = useState(false);
    const [isEmployer, setIsEmployer] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        pack: 0
    });
    const { addToast } = useToasts();
    const history = useHistory();

    function handleSubmit(e){
        e.preventDefault();
        const {name, email, password, pack} = formData;
        // sign up part
        if(isNewUser){
            if(name && email && password){
                // creating new account
                fetch("https://find-job-server.herokuapp.com/sign-up", {
                    method: "POST",
                    body: JSON.stringify({name, email, password, accountBalance: pack, accountType: isEmployer ? "1" : "0"}),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(res => res.json())
                .then(result => {
                    // account creat successful
                    if(result.status === "success"){
                        setIsNewUser(false);
                        addToast("Your account Created Successfully. Please Login with Your Email and Password.", {
                            appearance: result.status,
                            autoDismiss: true,
                          });
                    }
                    // account creation failed
                    else{
                        console.log(result);
                        addToast("Failed to create new account. Please try again.", {
                            appearance: result.status,
                            autoDismiss: true,
                          });
                    }
                })
            }else{
                addToast("Please Fill Up the form Properly.", {
                    appearance: 'error',
                    autoDismiss: true,
                  });
            }
        }
        // login part
        else{
            if(email && password){
                fetch("https://find-job-server.herokuapp.com/log-in", {
                    method: "POST",
                    body: JSON.stringify({email, password}),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(res => res.json())
                .then(result => {
                    if(result.userID){
                        setUserInfo(result);
                        history.push("/");
                    }
                })
            }else{
                addToast("Please Fill Up the form Properly.", {
                    appearance: 'error',
                    autoDismiss: true,
                  });
            }
        }
    }

    function handleInput(e){
        const {name, value} = e.target;
        const newFormData = {...formData};
        newFormData[name] = value;
        setFormData(newFormData);
    }
    return (
        <div className="page auth-page">
            <form onSubmit={e => handleSubmit(e)} >                
                {
                    isNewUser &&
                    <div className="input-container">
                        <label htmlFor="name" >
                        Enter Your Full Name
                        </label>
                        <input onBlur={e => handleInput(e)} id="name" type="text" name="name" placeholder="Your Full Name" />
                    </div>
                }
                <div className="input-container">
                    <label htmlFor="email" >
                        Enter Your Email
                    </label>
                    <input onBlur={e => handleInput(e)} id="email" type="email" name="email" placeholder="Email" />
                </div>
                <div className="input-container">
                    <label htmlFor="password" >
                        Enter Your password
                    </label>
                    <input onBlur={e => handleInput(e)} id="password" type="password" name="password" placeholder="Password" />
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
                        <label htmlFor="pack" >
                        Select A Package
                        </label>
                        <select onChange={e => handleInput(e)} name="pack" id="pack">
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