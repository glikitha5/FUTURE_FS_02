import React from 'react';

function Analytics({ data }) {
  const stats = [
    { label: 'Total Leads', value: data.totalLeads, color: '#007bff' },
    { label: 'New', value: data.newLeads, color: '#17a2b8' },
    { label: 'Contacted', value: data.contactedLeads, color: '#ffc107' },
    { label: 'Converted', value: data.convertedLeads, color: '#28a745' },
  ];

  return (
    <div style={styles.container}>
      <h3>Analytics Dashboard</h3>
      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={{ ...styles.statValue, color: stat.color }}>
              {stat.value}
            </div>
            <div style={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
        <div style={styles.statCard}>
          <div style={styles.statValue}>
            {data.conversionRate}%
          </div>
          <div style={styles.statLabel}>Conversion Rate</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  statCard: {
    textAlign: 'center',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  statValue: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  statLabel: {
    fontSize: '14px',
    color: '#666',
  },
};

export default Analytics;