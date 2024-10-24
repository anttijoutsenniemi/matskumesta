import React, { useState } from 'react';
import './../styles/contactCard.css';

interface ContactProps {
    fetchEmail: () => any;
}

const ReservationAccepted: React.FC<ContactProps> = (props) => {
  const [contactInfo, setContactInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Async function to simulate fetching contact information
  const fetchContactInfo = async () => {
    setLoading(true);
    try {
        let email : string = props.fetchEmail();
        setContactInfo(email);
    } catch (error) {
      console.error('Error fetching contact info', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reservation-container">
      <div className="reservation-message">
        Myyjä on hyväksynyt varauksesi!
      </div>
      {contactInfo ? (
        <div className="contact-info">{contactInfo}</div>
      ) : (
        <button className="contact-button" onClick={fetchContactInfo}>
          {loading ? 'Loading...' : 'Näytä yhteystiedot'}
        </button>
      )}
    </div>
  );
};

export default ReservationAccepted;