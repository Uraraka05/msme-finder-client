// client/src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
    const [msmes, setMsmes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Add state for search and filter
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');

    // This useEffect hook will now re-run whenever searchTerm or category changes
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Build the API URL with query parameters for filtering
                const apiUrl = new URL(`${process.env.REACT_APP_API_URL}/api/msmes`);
                if (searchTerm) {
                    apiUrl.searchParams.append('name', searchTerm);
                }
                if (category) {
                    apiUrl.searchParams.append('category', category);
                }

                console.log("Fetching data from:", apiUrl.toString());
                const response = await axios.get(apiUrl.toString());
                setMsmes(response.data);
                
            } catch (error) {
                console.error("Error fetching MSME data:", error);
            }
            setLoading(false);
        };

        fetchData();
    }, [searchTerm, category]); // Dependency array ensures this runs on filter/search change

    return (
        <div>
            <h1>MSME Facility Locator</h1>
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              category={category}
              setCategory={setCategory}
            />
            {loading ? (
                <div>Loading MSME locations...</div>
            ) : (
                <Map msmes={msmes} />
            )}
        </div>
    );
};

export default HomePage;