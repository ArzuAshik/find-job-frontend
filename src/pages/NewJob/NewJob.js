import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { UserContext } from '../../App';

const NewJob = () => {
    const history = useHistory();
    const { addToast } = useToasts();
    const [formData, setFormData] = useState({
        tag: "Web Development",
    });
    const [remainingPost, setRemainingPost] = useState(0);
    // eslint-disable-next-line
    const [userInfo, setUserInfo] = useContext(UserContext);
    if(userInfo?.accountType !== "1"){
        history.push("/");
    }
    
    useEffect(() => {
        fetch("https://find-job-server.herokuapp.com/my-jobs", {
            method: "POST",
            body: JSON.stringify({userID: userInfo.userID}),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(res => res.json())
        .then(result => {
            setRemainingPost( userInfo.accountBalance - result.length);
        });
    }, [userInfo.accountBalance, userInfo.userID])
    
    function handleInput(e){
        const {name, value} = e.target;
        const newFormData = {...formData};
        newFormData[name] = value;
        setFormData(newFormData);
    }
    function handleCreateJob(e){
        e.preventDefault();
        if(remainingPost > 0){
            fetch("https://find-job-server.herokuapp.com/post-job", {
                method: "POST",
                body: JSON.stringify({...formData, userID: userInfo.userID}),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            .then(res => res.json())
            .then(({status, message}) => {
                addToast(message, {
                    appearance: status,
                    autoDismiss: true,
                });
                history.push("/profile");
            });
        }else{
            addToast("Your Post Limit is Over.", {
                appearance: "error",
                autoDismiss: true,
            });
        }
    }
    return (
        <div className="new-job">
            <h2>Remaining Post : {remainingPost}</h2>
            <form onSubmit={handleCreateJob} >
                <div className="input-container">
                    <label htmlFor="tag" >
                    Select A Job Category
                    </label>
                    <select onChange={e => handleInput(e)} name="tag" id="tag">
                        <option value="Web Development">Web Development</option>
                        <option value="Graphics Design">Graphics Design</option>
                        <option value="SEO">SEO</option>
                        <option value="Wordpress Design">Wordpress Design</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Data Entry">Data Entry</option>
                    </select>
                </div>
                <div className="input-container">
                    <label htmlFor="company">Company Name</label>
                    <input onChange={e => handleInput(e)} name="companyName" type="text" id="company" placeholder="Company Name" />
                </div>
                <div className="input-container">
                    <label htmlFor="price">Price</label>
                    <input onChange={e => handleInput(e)} name="price" type="text" id="price" placeholder="$5" />
                </div>
                <div className="input-container">
                    <label htmlFor="description">Job Description</label>
                    <input onChange={e => handleInput(e)} name="description" type="text" id="description" placeholder="Job Description" />
                </div>
                <button type="submit">Create Job</button>
            </form>
        </div>
    );
};

export default NewJob;