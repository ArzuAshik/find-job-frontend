import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import Admin from "../Admin/Admin";

const Profile = () => {
    const history = useHistory();
    const [userInfo, setUserInfo] = useContext(UserContext);
    const [myJobs, setMyJobs] = useState([]);
    const [toShow, setToShow] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(!userInfo.userID){
            history.push("/auth");
        }
        if(userInfo.accountType === "1"){
            fetch("https://find-job-server.herokuapp.com/my-jobs", {
                method: "POST",
                body: JSON.stringify({userID: userInfo.userID}),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            .then(res => res.json())
            .then(result => {
                setMyJobs(result);
                setIsLoading(false);
            });
        }else if(userInfo.accountType === "0"){
            setIsLoading(false);
        }else if(userInfo.accountType === "2"){
            setIsLoading(false);
        }
    }, 
    [userInfo.userID, userInfo.accountType, history]);
    
    function handleViewApplications(jobID){
        history.push("/job-applications/" + jobID);
    }
    function handleToShow(){
        setToShow(toShow === 1 ? 0 : 1);
    }
    function handleLogout(){
        setUserInfo({});
        history.push("/auth");
    }
    
    return (
        <div className="page profile">
            <div className="logout-container">
                <button onClick={handleLogout} className="logout">Logout</button>
            </div>
            {
                isLoading ? 
                <h1>Loading...</h1> :                
                <>
                {
                userInfo.accountType === "1" &&
                    <>
                    <table>
                        <thead>
                            <tr style={{border: 0}}>
                                <th colSpan="4" style={{textAlign: "left", padding: "10px 0", border: 0}}>
                                    <button className="active" onClick={() => history.push("/create-job") } >
                                        + Create a New Job
                                    </button>
                                </th>
                                <th style={{ textAlign: "right", padding: "10px 0", border: 0}}>
                                    <button className={toShow === 0 ? "active" : "pending"} onClick={handleToShow}>
                                        {toShow === 0 ? "Active Jobs" : "Pending Jobs"}
                                    </button>
                                </th>
                            </tr>
                            <tr>                    
                                <th>Tag</th>
                                <th>Company Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            myJobs.length > 0 && myJobs.map(({_id, status, tag, company_name, price, description}) => status === toShow && (
                                <tr key={_id}>
                                    <td>{tag}</td>
                                    <td>{company_name}</td>
                                    <td>{price}</td>
                                    <td>{description}</td>
                                    <td>
                                        { status === 1 && <button onClick={() => handleViewApplications(_id)}>View</button> }
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    {myJobs.length === 0 && <h2>You have not created any Job yet.</h2>}
                    </>
                }
                {
                    userInfo.accountType === "0" && 
                    <h1>My Applications Page is Under Construction!</h1>
                }
                {
                    userInfo.accountType === "2" && 
                    <Admin />
                }
                </>
                
            }
        </div>
    );
};

export default Profile;