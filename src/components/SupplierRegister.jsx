import React, { useState } from 'react';
import PersonalDetails from './SupplierRegister/PersonalDetails';
import BankDetails from './SupplierRegister/BankDetails';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // make sure this path is correct

const SupplierRegister = ({ onSwitchToLogin }) => {
  const [step, setStep] = useState(1);
  const [personalData, setPersonalData] = useState(null);

  const handleNext = async (data) => {
    try {
      // Firebase registration with email + password
      await createUserWithEmailAndPassword(auth, data.email, data.password);

      setPersonalData(data);
      setStep(2);
    } catch (error) {
      alert(`Registration error: ${error.message}`);
    }
  };

  const handleSubmit = (bankData) => {
    const fullData = {
      ...personalData,
      ...bankData,
      registeredAt: new Date().toISOString()
    };

    console.log('Final submitted supplier registration data:', fullData);
    alert('Registration complete!');
    onSwitchToLogin(); // optional: return to login
  };

  return (
    <div>
      {step === 1 ? (
        <PersonalDetails onNext={handleNext} />
      ) : (
        <BankDetails onBack={() => setStep(1)} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default SupplierRegister;

