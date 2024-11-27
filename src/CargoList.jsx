import React from 'react';
import { Table, Button } from 'react-bootstrap';

const statuses = {
  "Ожидает отправки": "warning",
  "В пути": "info",
  "Доставлен": "success"
};

const CargoList = ({ cargos, onUpdateStatus }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Номер груза</th>
          <th>Название груза</th>
          <th>Статус</th>
          <th>Пункт отправления</th>
          <th>Пункт назначения</th>
          <th>Дата отправления</th>
          <th>Изменить статус</th>
        </tr>
      </thead>
      <tbody>
        {cargos.map(cargo => (
          <tr key={cargo.id}>
            <td>{cargo.id}</td>
            <td>{cargo.name}</td>
            <td>
              <span className={`badge bg-${statuses[cargo.status]}`}>{cargo.status}</span>
            </td>
            <td>{cargo.origin}</td>
            <td>{cargo.destination}</td>
            <td>{cargo.departureDate}</td>
            <td>
              <Button variant="outline-secondary" onClick={() => onUpdateStatus(cargo.id, cargo.status === "В пути" ? "Доставлен" : "В пути")}>
                {cargo.status === "В пути" ? "Доставить" : "В путь"}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CargoList;