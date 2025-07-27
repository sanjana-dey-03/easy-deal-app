// src/components/SupplierDashboard.jsx
import React from 'react';
import { Tabs, Tab, Box, AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const tabConfig = [
    { label: 'Orders', path: '' },
    { label: 'Products', path: 'products' },
    { label: 'Slots', path: 'slots' },
    { label: 'Deal Hour', path: 'deal-hour' },
    { label: 'Profile', path: 'profile' },
];

/**
 * Main supplier dashboard with horizontal tabs.
 */
export default function SupplierDashboard() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // Extract the last segment for tab matching
    const segments = pathname.split('/');
    const activeSegment = segments[segments.length - 1];
    const currentTab = tabConfig.findIndex(t => t.path === activeSegment);

    const handleTabChange = (event, newIndex) => {
        // Navigate relatively to the nested route
        const next = tabConfig[newIndex].path;
        navigate(next);
    };

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Supplier Dashboard</Typography>
                </Toolbar>
                <Tabs
                    value={currentTab >= 0 ? currentTab : 0}
                    onChange={handleTabChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {tabConfig.map(({ label }) => (
                        <Tab key={label} label={label} />
                    ))}
                </Tabs>
            </AppBar>

            <Box sx={{ p: 3 }}>
                <Outlet />
            </Box>
        </Box>
    );
}
