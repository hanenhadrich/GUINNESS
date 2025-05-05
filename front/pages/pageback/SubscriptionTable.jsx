import React from 'react';
import SubscriptionList from '../components/SubscriptionList';
import Footer from '../components/Footer'; // Assure-toi que le Footer est importé correctement

const SubscriptionSemaine = () => {
  return (
    
      <div className="container mt-2">
        
          <div className="card-body shadow-lg">
            <SubscriptionList filterType="semaine" />
          </div>
        
      </div>
      
   
  );
};

export default SubscriptionSemaine;
