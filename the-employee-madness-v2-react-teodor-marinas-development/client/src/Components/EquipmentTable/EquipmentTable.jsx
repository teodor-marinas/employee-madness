import { Link } from "react-router-dom";
import "./EquipmentTable.css";
import { useState } from "react";

const EquipmentTable = ({ equipments, onDelete,  }) => {

  const [toShow, setToShow] = useState(equipments)
  const [sortOrder, setSortOrder] = useState('asc');


  const handleFilterChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    if (inputValue === "") {
      setToShow(equipments);
    }
    else {
      const filteredEquipments = equipments.filter(equipment => {
        if (equipment.amount.toLowerCase() === inputValue || equipment.type.toLowerCase() === inputValue) {
          return true;
        }
        return false;
      });
      setToShow(filteredEquipments);
    }
  };


  const handleSort = (columnName) => {
    const sortedEquipments = [...equipments].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[columnName] > b[columnName] ? 1 : -1;
      } else {
        return a[columnName] < b[columnName] ? 1 : -1;
      }
    });
    setToShow(sortedEquipments);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };


  return (
    <>
      <input placeholder="Filter by type or amount" onChange={e => handleFilterChange(e)} />
      <div className="EquipmentTable">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>Name</th>
              <th onClick={() => handleSort('type')}>Type</th>
              <th onClick={() => handleSort('amount')}>Amount</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {
              toShow.map((equipment) => {
                return (
                  <tr key={equipment._id}>
                    <td>{equipment.name}</td>
                    <td>{equipment.type}</td>
                    <td>{equipment.amount}</td>
                    <td>
                      <Link to={`/update/equipment/${equipment._id}`}>
                        <button type="button">Update</button>
                      </Link>
                      <button type="button" onClick={() => onDelete(equipment._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );

}

export default EquipmentTable;
