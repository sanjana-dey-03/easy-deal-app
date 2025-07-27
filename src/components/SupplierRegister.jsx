import { useState } from 'react';
import { Container, Box, Stepper, Step, StepLabel } from '@mui/material';
import PersonalDetails from './SupplierRegister/PersonalDetails';
import BankDetails from './SupplierRegister/BankDetails';
import { useAuth } from '../contexts/AuthContext';

const steps = ['Personal Details', 'Bank Details'];

export default function SupplierRegister({ onSwitchToLogin }) {
    const [activeStep, setActiveStep] = useState(0);
    const [collectedData, setCollectedData] = useState({});
    const { registerSupplier } = useAuth();

    const handleNext = (data) => {
        setCollectedData(prev => ({ ...prev, ...data }));
        setActiveStep(prev => prev + 1);
    };

    const handleBack = () => setActiveStep(prev => prev - 1);

    const handleFinish = async (bankData) => {
        const profileData = {
            ...collectedData,
            ...bankData,
        };
        try {
            console.log("Profile Data : ", profileData);
            await registerSupplier(profileData);
            alert('Supplier registration successful!');
            if (onSwitchToLogin) onSwitchToLogin();
        } catch (err) {
            console.error('Registration failed:', err);
            alert('Registration failed: ' + err.message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={4}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => (
                        <Step key={label}><StepLabel>{label}</StepLabel></Step>
                    ))}
                </Stepper>
            </Box>
            <Box mt={4}>
                {activeStep === 0 && (
                    <PersonalDetails onNext={handleNext} initialData={collectedData} />
                )}
                {activeStep === 1 && (
                    <BankDetails onBack={handleBack} onSubmit={handleFinish} initialData={collectedData} />
                )}
            </Box>
        </Container>
    );
}
