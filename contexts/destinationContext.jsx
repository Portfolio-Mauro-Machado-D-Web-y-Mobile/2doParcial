import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchDestinations } from '../api/connections';

const DestinationContext = createContext();

const DestinationProvider = ({ children }) => {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const loadDestinations = async () => {
            const data = await fetchDestinations();
            setDestinations(data);
        };
        loadDestinations();
    }, []);

    const updateDestinations = async () => {
        const data = await fetchDestinations();
        setDestinations(data);
    };

    return (
        <DestinationContext.Provider value={{ destinations, setDestinations, updateDestinations }}>
            {children}
        </DestinationContext.Provider>
    );
};

const useDestinations = () => {
    const context = useContext(DestinationContext);
    if (!context) {
        throw new Error('useDestinations must be used within a DestinationProvider');
    }
    return context;
};

export { DestinationProvider, useDestinations };
