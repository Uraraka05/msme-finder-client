// client/src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map';

const HomePage = () => {
    const [msmes, setMsmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch data from our backend API
        const fetchData = async () => {
            try {
                // The URL is from the .env file Render gave you
                const apiUrl = `${process.env.REACT_APP_API_URL}/api/msmes`;
                console.log("Fetching data from:", apiUrl);
                const response = await axios.get(apiUrl);
                setMsmes(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching MSME data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []); // The empty array [] means this effect runs once when the component mounts

    if (loading) {
        return <div>Loading MSME locations...</div>;
    }

    return (
        <div>
            <h1>MSME Facility Locator</h1>
            <Map msmes={msmes} />
        </div>
    );
};

export default HomePage;