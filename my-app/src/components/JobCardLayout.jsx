import React, { useState, useEffect } from 'react';
import './JobCardLayout.css';
import './NavbarAndFilter.css';
import logo from '../logo.png'

const JobCard = ({ job }) => (
  <div className="job-card">
    <div className="card-header">
      <img src={`/logos/${job.company}.png`} alt={job.company} className="company-logo" />
      <span className="time">{job.time || 'Just Now'}</span>
    </div>
    <h2 className="job-title">{job.title}</h2>
    <p className="details">👤 {job.exp || '1-3 yr Exp'}</p>
    <p className="details">📍 {job.mode || 'Onsite'} &nbsp;&nbsp; 💰 ₹{job.salaryMax}</p>
    <ul className="description">
      <li>{job.description?.split('.')[0] || 'A user-friendly interface lets you browse'}</li>
    </ul>
    <button className="apply-btn">Apply Now</button>
  </div>
);

const JobCardLayout = () => {
  
  // Reuse styles
const inputStyle = {
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  width: '100%',
  boxSizing: 'border-box'
};

const buttonStyle = {
  padding: '12px 20px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  border: 'none'
};

  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    jobType: '',
    salaryMin: '',
    salaryMax: '',
    deadline: '',
    description: '',
  });

  // 👇 FETCH JOBS ON LOAD
useEffect(() => {
  fetch('http://localhost:5000/api/jobs')
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setJobs(data);
      } else {
        console.error('Expected an array but got:', data);
        setJobs([]);
      }
    })
    .catch(err => {
      console.error('Error fetching jobs:', err);
      setJobs([]);
    });
}, []);


  // 👇 HANDLE PUBLISH TO BACKEND
  const handlePublish = () => {
    fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(newJob => {
        setJobs([newJob, ...jobs]);
        setShowModal(false);
        setFormData({
          title: '',
          company: '',
          location: '',
          jobType: '',
          salaryMin: '',
          salaryMax: '',
          deadline: '',
          description: '',
        });
      })
      .catch(err => console.error('Error creating job:', err));
  };

  return (
    <div className="container">
      {/* Filter Bar */}
       <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" style={{height:'50px',width:'50px'}} />
        </div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Find Jobs</li>
          <li>Find Talents</li>
          <li>About us</li>
          <li>Testimonials</li>
        </ul>
       <span
            onClick={() => setShowModal(true)}
            className='create-job-btn'
          >
            Create Jobs
          </span>
      </nav>

      {/* Filter Bar */}
      <div className="filter-bar">
        <input type="text" className="filter-input" placeholder="Search By Job Title, Role" />
        <select className="filter-select">
          <option>Preferred Location</option>
          <option>Chennai</option>
          <option>Bangalore</option>
        </select>
        <select className="filter-select">
          <option>Job type</option>
          <option>Part-time</option>
          <option>Full-time</option>
        </select>
        <div className="salary-slider">
          <span>Salary Per Month</span>
          <input type="range" min="50000" max="80000" />
          <span>₹50k - ₹80k</span>
        </div>
      </div>

      

      {/* Job Cards */}
      <div className="grid">

        {jobs.map((job, i) => (
          <JobCard key={i} job={job} />
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '30px',
            width: '90%', maxWidth: '700px', boxShadow: '0 0 20px rgba(0,0,0,0.15)'
          }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Job Opening</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input placeholder="Job Title" value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                style={inputStyle} />

              <input placeholder="Company Name" value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                style={inputStyle} />

              <input placeholder="Location" value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                style={inputStyle} />

              <select value={formData.jobType}
                onChange={e => setFormData({ ...formData, jobType: e.target.value })}
                style={inputStyle}>
                <option value="">Select Job Type</option>
                <option value="FullTime">FullTime</option>
                <option value="PartTime">PartTime</option>
              </select>

              <input placeholder="Min Salary" value={formData.salaryMin}
                onChange={e => setFormData({ ...formData, salaryMin: e.target.value })}
                style={inputStyle} />

              <input placeholder="Max Salary" value={formData.salaryMax}
                onChange={e => setFormData({ ...formData, salaryMax: e.target.value })}
                style={inputStyle} />

              <input type="date" placeholder="Application Deadline"
                value={formData.deadline}
                onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                style={inputStyle} />
            </div>

            <textarea
              placeholder="Job Description"
              rows={4}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              style={{ ...inputStyle, width: '100%', marginTop: '15px' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button
                style={{ ...buttonStyle, backgroundColor: '#fff', color: '#000', border: '1px solid #ccc' }}
                onClick={() => setShowModal(false)}
              >
                Save Draft
              </button>
              <button
                style={{ ...buttonStyle, backgroundColor: '#007bff', color: '#fff' }}
                onClick={handlePublish}
              >
                Publish &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reuse styles
const inputStyle = {
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  width: '100%',
  boxSizing: 'border-box'
};

const buttonStyle = {
  padding: '12px 20px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  border: 'none'
};

export default JobCardLayout;
