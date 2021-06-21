import React, { useEffect, useState } from 'react';
import Job from '../../components/Job';

const HomePage = () => {    
    const [allJobs, setAllJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [jobsToShow, setJobsToShow] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch("https://find-job-server.herokuapp.com/all-jobs")
        .then(res => res.json())
        .then(result => {
            setAllJobs(result);
            setJobsToShow(result);
            setIsLoading(false);
        });
    }, []);

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
                    <option value="0">Default</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Graphics Design">Graphics Design</option>
                    <option value="SEO">SEO</option>
                    <option value="Wordpress Design">Wordpress Design</option>
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