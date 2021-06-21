import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import Job from '../../components/Job';

const HomePage = () => {
    // eslint-disable-next-line
    const [userInfo, setUserInfo] = useContext(UserContext);    
    const [allJobs, setAllJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [jobsToShow, setJobsToShow] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const history = useHistory();

    
    useEffect(() => {
        if(!userInfo.userID){
            history.push("/auth");
        }

        if(userInfo.accountType === "0"){
            fetch("https://find-job-server.herokuapp.com/all-jobs")
            .then(res => res.json())
            .then(result => {
                setAllJobs(result);
                setJobsToShow(result);
                setIsLoading(false);
            });
        }
        else{
            history.push("/profile");
        }
    }, [userInfo.userID, userInfo.accountType, history]);

    function handleFilter(filterBy){
        if(filterBy === "0"){
            setJobsToShow(allJobs);
        }else{
            const toShowFirst = [];
            const toShowLast = [];
            allJobs.forEach(j => {
                if(j.tag === filterBy){
                    toShowFirst.push(j);
                }else{
                    toShowLast.push(j);
                }
            });
            setJobsToShow([...toShowFirst, ...toShowLast]);
        }
    }

    function pagination(){
        const totalPage = jobsToShow.length / 20;
        const buttons = [];
        if(totalPage > 1){
            for(let i = 1; i <= totalPage; i++){
                const btn = (<button key={i} onClick={() => setCurrentPage(i)} className={currentPage === i ? "pagination-btn active" : "pagination-btn"} >{i}</button>);
                buttons.push(btn);
            }
        }
        return buttons;
    }

    return (
        <div className="page home-page">
            <div className="filter">
                <select name="filter" id="filter" onChange={(e) => handleFilter(e.target.value)} >
                    <option value="Web Development">Web Development</option>
                    <option value="Graphics Design">Graphics Design</option>
                    <option value="SEO">SEO</option>
                    <option value="Wordpress Design">Wordpress Design</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Data Entry">Data Entry</option>
                </select>
            </div>
            {
                isLoading ?
                <h1>Loading...</h1>
                :
                jobsToShow.slice((20 * currentPage) - 20, currentPage * 20).map(job => <Job key={job._id} job={job}/>)
            }
            <div className="pagination">
                {
                    pagination()
                }
            </div>
        </div>
    );
};

export default HomePage;