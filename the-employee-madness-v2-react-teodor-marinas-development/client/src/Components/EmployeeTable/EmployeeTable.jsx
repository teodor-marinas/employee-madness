import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { useState } from "react";
// import { useAtom } from "jotai";
// import state from '../Atom' 

const EmployeeTable = ({ employees, onDelete }) => {

  const [toShow, setToShow] = useState(employees)
  const [sortOrder, setSortOrder] = useState('asc');

  console.log(employees);

  const patchMissing = (checked, id) => {
    return fetch(`/api/employees/${id}`, { 
        method: "PATCH", 
        body: JSON.stringify({
        present: checked ? true : false,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
}

  const handleFilterChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    if (inputValue === "") {
      setToShow(employees);
    }
    else {
      const filteredEmployees = employees.filter(employee => {
        if (employee.position.toLowerCase() === inputValue || employee.level.toLowerCase() === inputValue) {
          return true;
        }
        return false;
      });
      setToShow(filteredEmployees);
    }
  };


  const handleSort = (columnName) => {
    const sortedEmployees = [...employees].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[columnName] > b[columnName] ? 1 : -1;
      } else {
        return a[columnName] < b[columnName] ? 1 : -1;
      }
    });
    setToShow(sortedEmployees);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleDeleteEmployee = (toDelete) => {
    const filteredEmployees = employees.filter(employee => employee._id !== toDelete)
    setToShow(filteredEmployees)
  }

  // const handleAttendence = (checked, id) => {
  //   console.log(checked, id)
  //   if(!checked) {

  //   }
  // }

  return (
    <>
      <input placeholder="Filter by level or position" onChange={e => handleFilterChange(e)} />
      <div className="EmployeeTable">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>Name</th>
              <th onClick={() => handleSort('level')}>Level</th>
              <th onClick={() => handleSort('position')}>Position</th>
              <th> Present</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {
              toShow.map((employee) => {
                return (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.level}</td>
                    <td>{employee.position}</td>
                    <td>
                      <input id={employee._id} type="checkbox" defaultChecked={employee.present} onClick={(e) => { patchMissing(e.target.checked, e.target.id); /*handleAttendence(e.target.checked, e.target.id)*/}}/>
                    </td>
                    <td>
                      <Link to={`/update/${employee._id}`}>
                        <button type="button">Update</button>
                      </Link>
                      <button type="button" onClick={() => {onDelete(employee._id); handleDeleteEmployee(employee._id)}}>
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

export default EmployeeTable;
