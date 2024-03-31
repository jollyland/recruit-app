import React, { useState } from "react";
import '../css/agegroupselect.css';

function AgeGroupSelect() {
    const [startAge, setStartAge] = useState(0);
    const [endAge, setEndAge] = useState(20);
    const options = [];

    const handleStartAgeChange = (e) => {
        const selectedStartAge = parseInt(e.target.value);
        setStartAge(selectedStartAge);
    };

    const handleEndAgeChange = (e) => {
        const selectedEndAge = parseInt(e.target.value);
        setEndAge(selectedEndAge);
    };

    for (let i = 0; i <= 20; i++) {
        options.push(<option key={i} value={i}>{i}</option>);
    }
  
    return (
      <div className="ageGroupSelect">
        <div className="label">
            年齡
        </div>
        <div className="inputContainer">
            <select value={startAge} onChange={handleStartAgeChange}>{options.slice(0,endAge+1)}</select>
            <div className="dash">～</div>
            <select  value={endAge} onChange={handleEndAgeChange}>{options.slice(startAge, 21)}</select>
            <div className="hint"
             style={{ opacity: startAge === endAge ? '100%' : '0'}}
             >年齡區間不可重疊</div>
        </div>
      </div>
    );
  }
  export default AgeGroupSelect;