import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';

const JobApplication = () => {
    const {jobID} = useParams();
    const [jobApplications, setJobApplications] = useState([]);
    // eslint-disable-next-line
    const [userInfo, setUserInfo] = useContext(UserContext);
    const history = useHistory();
    
    useEffect(() => {
        fetch("https://find-job-server.herokuapp.com/application-for-single-job", {
            method: "POST",
            body: JSON.stringify({jobID}),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(res => res.json())
        .then(result => {
            setJobApplications(result);
        });
    }, [jobID, history, userInfo.userID])
    return (
        <div className="job-application">
            {
                jobApplications.length > 0 ?
                <>
                <h2>All Applicants Name</h2>
                <ul>
                    {
                        jobApplications.map(({name, _id}) => <li key={_id} >{name}</li>)
                    }
                </ul>
                </>
                :
                <h2>No Applicant Found!</h2>
            }
        </div>
    );
};

export default JobApplication;