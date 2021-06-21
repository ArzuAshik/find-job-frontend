import React, { useContext } from 'react';
import { useToasts } from 'react-toast-notifications';
import { UserContext } from '../App';

const Job = ({job}) => {
    const {_id, tag, company_name, price, description} = job;
    // eslint-disable-next-line
    const [userInfo, setUserInfo] = useContext(UserContext);
    const { addToast } = useToasts();
    
    function handleApply(jobID){
        if(userInfo.userID){
            console.log(jobID);
        }else{
            addToast("Please Login To Apply.", {
                appearance: 'warning',
                autoDismiss: true,
              });
        }
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