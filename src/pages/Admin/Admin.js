import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

const Admin = () => {
    const [pendingJobs, setPendingJobs] = useState([]);
    const { addToast } = useToasts();

    useEffect(() => {
        fetch("https://find-job-server.herokuapp.com/pending-jobs")
        .then(res => res.json())
        .then(result => setPendingJobs(result));
    }, []);

    function handleUpdateStatus(jobID){
        console.log(jobID);
        fetch("https://find-job-server.herokuapp.com/update-job-status", {
            method: "POST",
            body: JSON.stringify({jobID}),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(res => res.json())
        .then(({status, message}) => {
            if(status=== "success"){
                // const newPendingJobs = pendingJobs.filter(jb => jb._id !== jobID);
                setPendingJobs(pendingJobs.filter(jb => jb._id !== jobID))
            }
            addToast(message, {
                appearance: status,
                autoDismiss: true,
            });
        });
    }
    return (
        <>
            <h3 style={{textAlign: "center"}}>All Pending Jobs.</h3>
            <table>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Tag</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pendingJobs.length > 0 && pendingJobs.map(({company_name, price, description, tag, _id}) => (
                            <tr key={_id} >
                                <td>{company_name}</td>
                                <td>{tag}</td>
                                <td>{price}</td>
                                <td>{description}</td>
                                <td>
                                    <button onClick={ () => handleUpdateStatus(_id)} >Active</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {pendingJobs.length === 0 && <h3>No Pending Job Found</h3>}
        </>
    );
};

export default Admin;