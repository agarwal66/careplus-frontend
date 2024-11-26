import  { useEffect, useState } from "react";
import axios from "axios";

const AnalyticsDashboard = () => {
  const [patientData, setPatientData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/analytics/data", {
          withCredentials: true, 
        });
        
        console.log(response.data);  
        setPatientData(response.data); 
        setLoading(false); 
      } catch (err) {
        setLoading(false); 
        setError(err.message); 
      }
    };

    fetchAnalyticsData(); 
  }, []); 
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>; 
  }

  if (!patientData || !patientData.patientAdmissions || patientData.patientAdmissions.length === 0) {
    return <p>No predictions data available</p>;
  }

  return (
    <div>
      <h2>Hospital Data Analytics & Prediction</h2>
      <h3>Patient Admissions Prediction</h3>
      {/* Render the data here */}
      <div>
        <h4>Predicted Patient Admissions:</h4>
        <ul>
          {patientData.patientAdmissions.map((entry, index) => (
            <li key={index}>
              Date: {entry.date} - Predicted Admissions: {entry.count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
