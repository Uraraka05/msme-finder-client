// client/src/components/SearchBar.js

import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, category, setCategory }) => {
  return (
    <div style={{ padding: '10px 20px', display: 'flex', gap: '20px', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', fontSize: '16px', width: '300px' }}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ padding: '8px', fontSize: '16px' }}
      >
        <option value="">All Categories</option>
        <option value="Textiles">Textiles</option>
        <option value="Food Processing">Food Processing</option>
        {/* Add more categories here as needed */}
      </select>
    </div>
  );
};

export default SearchBar;