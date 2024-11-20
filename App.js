// App.js
import React, { useState } from 'react';

function App() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const fetchServices = async () => {
    const response = await fetch('http://localhost:5000/services');
    const data = await response.json();
    setServices(data);
  };

  const addService = async () => {
    const response = await fetch('http://localhost:5000/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price }),
    });
    if (response.ok) {
      fetchServices();
      setName('');
      setDescription('');
      setPrice('');
    }
  };

  return (
    <div>
      <h1>Service Platform</h1>
      <input
        type="text"
        placeholder="Service Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={addService}>Add Service</button>
      <h2>Available Services:</h2>
      <button onClick={fetchServices}>Load Services</button>
      <ul>
        {services.map((service, index) => (
          <li key={index}>
            {service.name} - {service.description} (${service.price})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
