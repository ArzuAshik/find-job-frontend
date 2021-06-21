import React, { useContext } from 'react';
import { useToasts } from 'react-toast-notifications';
import { UserContext } from '../App';

const Job = ({job}) => {
    const {_id, tag, company_name, price, description} = job;
    // eslint-disable-next-line
    const [userInfo, setUserInfo] = useContext(UserContext);
    const { addToast } = useToasts();
    
    function handleApply(jobID){
        console.log(jobID);
        fetch("https://find-job-server.herokuapp.com/apply-for-job", {
        method: "POST",
        body: JSON.stringify({jobID, name: userInfo.name, userID: userInfo.userID}),
        headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(res => res.json())
        .then( ({status, message}) => {
            addToast(message, {
                appearance: status,
                autoDismiss: true,
            });
        });
    }
    return (
        <div className="job">
            <h2>{tag}</h2>
            <p>Company Name: {company_name}</p>
            <p>Price: {price}</p>
            <p>{description}</p>
            <button onClick={() => handleApply(_id)} className="apply">Apply for Job</button>
        </div>
    );
};

export default Job;