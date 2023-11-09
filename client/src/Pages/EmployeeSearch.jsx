import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { useParams } from "react-router-dom";
// import { useAtom } from 'jotai'
// import state from '../Components/Atom'

const fetchEmployees = () => {
    return fetch("/api/employees/").then((res) => res.json());
};

const deleteEmployee = (id) => {
    return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
        res.json()
    );
};




const EmployeeList = () => {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState(null);
    const params = useParams()

    const filterByParam = (employees, params) => {
        const filteredEmployees = employees.filter((employee) => employee.name.toLowerCase().includes(params.search.toLowerCase()))
        setEmployees(filteredEmployees)
    }

    const handleDelete = (id) => {
        deleteEmployee(id);

        setEmployees((employees) => {
            return employees.filter((employee) => employee._id !== id);
        });
    };

    useEffect(() => {
        fetchEmployees()
            .then((employees) => {
                setLoading(false);
                filterByParam(employees, params)
            })
    }, []);

    if (loading) {
        return <Loading />;
    }

    return <EmployeeTable employees={employees} onDelete={handleDelete} />;
};

export default EmployeeList;
