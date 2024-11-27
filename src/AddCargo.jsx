import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';

const origins = ["Москва", "Санкт-Петербург", "Казань", "Екатеринбург"];
const destinations = ["Казань", "Москва", "Екатеринбург", "Санкт-Петербург"];

const AddCargo = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !origin || !destination || !departureDate) {
      setError('Все поля должны быть заполнены!');
      return;
    } else {
      setError('');
    }

    const newCargo = {
      id: `CARGO${(Math.random() + 1).toString(36).substring(7).toUpperCase()}`,
      name,
      status: "Ожидает отправки",
      origin,
      destination,
      departureDate,
    };
    
    onAdd(newCargo);
    setName('');
    setOrigin('');
    setDestination('');
    setDepartureDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Название груза"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            label="Пункт отправления"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            fullWidth
          >
            {origins.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            label="Пункт назначения"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            fullWidth
          >
            {destinations.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Дата отправления"
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Добавить груз
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddCargo;