import React, { useState, useEffect } from 'react';
import LeadForm from './LeadForm';
import LeadTable from './LeadTable';
import Analytics from './Analytics';
import Navbar from './Navbar';
import { getLeads, getAnalytics } from '../api';

function Dashboard({ setToken }) {
  const [leads, setLeads] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [leadsRes, analyticsRes] = await Promise.all([
        getLeads(),
        getAnalytics(),
      ]);
      setLeads(leadsRes.data);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div>
      <Navbar onLogout={handleLogout} onAddLead={() => setShowForm(true)} />
      <div style={styles.container}>
        {analytics && <Analytics data={analytics} />}
        
        {showForm && (
          <LeadForm
            onClose={() => setShowForm(false)}
            onLeadAdded={fetchData}
          />
        )}
        
        <LeadTable leads={leads} onLeadUpdate={fetchData} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  loading: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
  },
};

export default Dashboard;