import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext(null);

/**
 * Provides authentication state and supplier registration via Firebase.
 * registerSupplier: creates Auth user and saves full profile to Firestore.
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Listen for Firebase auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({ uid: firebaseUser.uid, email: firebaseUser.email, role: 'supplier' });
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    /**
     * Register a new supplier: creates Auth user and saves profile.
     * @param {Object} profileData - contains email, password, and other supplier fields
     */
    const registerSupplier = async (profileData) => {
        const { email, password, ...rest } = profileData;
        // Create authentication record
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = credential.user;
        // Combine profile data
        const fullProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: 'supplier',
            ...rest,
            registeredAt: new Date().toISOString(),
        };

        console.log("Full Profileeee : ", fullProfile);
        // Save to Firestore
        await setDoc(doc(db, 'suppliers', firebaseUser.uid), fullProfile);
        // Update context
        setUser({ uid: firebaseUser.uid, email: firebaseUser.email, role: 'supplier' });
        return fullProfile;
    };

    /**
     * Sign out current user
     */
    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, registerSupplier, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = { children: PropTypes.node.isRequired };

/**
 * Hook to access authentication context
 */
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};