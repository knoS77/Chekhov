import React, { useState } from 'react';
import AddCargo from './AddCargo';
import CargoList from './CargoList';
import { Container, Row, Col } from 'react-bootstrap';

const initialCargoList = [
  {
    id: "CARGO001",
    name: "Строительные материалы",
    status: "В пути",
    origin: "Москва",
    destination: "Казань",
    departureDate: "2024-11-24"
  },
  {
    id: "CARGO002",
    name: "Хрупкий груз",
    status: "Ожидает отправки",
    origin: "Санкт-Петербург",
    destination: "Екатеринбург",
    departureDate: "2024-11-26"
  }
];

const App = () => {
  const [cargos, setCargos] = useState(initialCargoList);
  const [filteredStatus, setFilteredStatus] = useState('Все');

  const addCargo = (newCargo) => {
    setCargos([...cargos, newCargo]);
  };

  const updateCargoStatus = (id, newStatus) => {
    const cargo = cargos.find(c => c.id === id);
    const departureDate = new Date(cargo.departureDate);

    if (newStatus === "Доставлен" && departureDate > new Date()) {
      alert("Ошибка: Дата отправления в будущем, не может быть статус 'Доставлен'.");
      return;
    }

    setCargos(cargos.map(cargo =>
      cargo.id === id ? { ...cargo, status: newStatus } : cargo
    ));
  };

  const filteredCargos = filteredStatus === 'Все' ? cargos : cargos.filter(cargo => cargo.status === filteredStatus);

  return (
    <Container>
      <h1>Управление грузами</h1>
      <AddCargo onAdd={addCargo} />
      <label htmlFor="filter">Фильтр по статусу:</label>
      <select id="filter" onChange={(e) => setFilteredStatus(e.target.value)}>
        <option>Все</option>
        <option>Ожидает отправки</option>
        <option>В пути</option>
        <option>Доставлен</option>
      </select>
      <CargoList cargos={filteredCargos} onUpdateStatus={updateCargoStatus} />
    </Container>
  );
};

export default App;