import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { UserContext } from '../../App';
import CheckoutForm from "../../components/CheckoutForm";

const LoginSignUp = () => {
    // eslint-disable-next-line
    const [userInfo, setUserInfo] = useContext(UserContext);
    const [isNewUser, setIsNewUser] = useState(false);
    const [isEmployer, setIsEmployer] = useState(false);
    const [paymentSucceeded, setPaymentSucceeded] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        pack: 10
    });
    const { addToast } = useToasts();
    const history = useHistory();

    const promise = loadStripe("pk_test_51J4nbqCGTM1umYl0bvwI8l4BHSMvlKFTOod82ROvWoNHrslcwHRK52oVCYBvK1Dg4wPYEurWWHUZOZ4N4fNLMBn900Nw60Bq4q");

    function createAccount(){
        const {name, email, password, pack} = formData;
        fetch("https://find-job-server.herokuapp.com/sign-up", {
                    method: "POST",
                    body: JSON.stringify({name, email, password, accountBalance: parseInt(pack), accountType: isEmployer ? "1" : "0"}),
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
                        addToast("Failed to create new account. Please try again.", {
                            appearance: result.status,
                            autoDismiss: true,
                          });
                    }
                });
    };

    function handleSubmit(e){
        e.preventDefault();
        const {name, email, password} = formData;
        // sign up part
        if(isNewUser){
            if(name && email && password){
                // creating new account
                if(!isEmployer){
                    createAccount();
                }
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

    function createEmployerAccount(){
        if(paymentSucceeded){
            addToast("Payment Successful.", {
                appearance: 'success',
                autoDismiss: true,
              });
            setIsEmployer(false);
            createAccount();
        }
    }
    // eslint-disable-next-line
    useEffect(createEmployerAccount, [paymentSucceeded])
    return (
        <div className="page auth-page">
            <div>
            <form >                
                {
                    isNewUser &&
                    <div className="input-container">
                        <label htmlFor="name" >
                        Enter Your Full Name
                        </label>
                        <input onChange={e => handleInput(e)} id="name" type="text" name="name" placeholder="Your Full Name" />
                    </div>
                }
                <div className="input-container">
                    <label htmlFor="email" >
                        Enter Your Email
                    </label>
                    <input onChange={e => handleInput(e)} id="email" type="email" name="email" placeholder="Email" />
                </div>
                <div className="input-container">
                    <label htmlFor="password" >
                        Enter Your password
                    </label>
                    <input onChange={e => handleInput(e)} id="password" type="password" name="password" placeholder="Password" />
                </div>
                {
                    isNewUser &&
                    <label style={{marginBottom: "5px", display: "block"}}><input type="checkbox" onChange={(e) => {
                        setIsEmployer(e.target.checked);
                    }} /> I'm a Employer</label>
                }
                {
                    isNewUser && isEmployer &&
                    <div className="input-container">
                        <label htmlFor="pack" >
                        Select A Package
                        </label>
                        <select onChange={e => handleInput(e)} name="pack" id="pack">
                            <option value={10}>Basic Account</option>
                            <option value={20}>Standard Account</option>
                            <option value={30}>Premium Account</option>
                        </select>
                    </div>
                }
            </form>
            {!isEmployer && <button onClick={handleSubmit}>{isNewUser ? "Sign Up" : "Login" }</button>}
            {
                isEmployer &&
                <div className="card">
                    <Elements stripe={promise}>
                        <CheckoutForm amount={formData.pack} setPaymentSucceeded={setPaymentSucceeded} />            
                    </Elements>
                </div>
            }
            {                    
                <p>{isNewUser ? "Already" : "Don't"}  have an account? <span onClick={() => {setIsNewUser(!isNewUser); setIsEmployer(false);}}>{isNewUser ? "Login" : "Sign Up"}</span></p>
            }
            </div>
        </div>
    );
};

export default LoginSignUp;