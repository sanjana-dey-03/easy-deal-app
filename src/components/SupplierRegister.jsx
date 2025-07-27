// src/components/SupplierRegister.jsx
import React, { useState } from 'react';
import PersonalDetails from './SupplierRegister/PersonalDetails';
import BankDetails from './SupplierRegister/BankDetails';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const SupplierRegister = ({ onSwitchToLogin }) => {
  const [step, setStep] = useState(1);
  const [personalData, setPersonalData] = useState(null);

  const handleNext = (data) => {
    setPersonalData(data);
    setStep(2);
  };

  const handleSubmit = async (bankData) => {
    const fullData = {
      ...personalData,
      ...bankData,
      registeredAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'suppliers', personalData.uid), fullData);
      alert('Registration complete!');
      onSwitchToLogin();
    } catch (err) {
      console.error('Error saving to Firestore:', err);
      alert('Something went wrong. Try again.');
    }
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
