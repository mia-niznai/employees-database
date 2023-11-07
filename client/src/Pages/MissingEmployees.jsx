import { useState, useEffect } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = async () => {
    const response = await fetch("/api/missing");
    return response.json()
}

const deleteEmployee = (id) => {
    return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
        res.json()
    );
};

const updateEmployee = async (employee) => {
    const response = await fetch(`/api/employees/${employee._id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
    });
    const data = await response.json();
    return data;
};


const MissingEmployees = () => {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isMissing, setIsMissing] = useState(false);

    const handleDelete = (id) => {
        deleteEmployee(id);
        setEmployees((employees) => {
            return employees.filter((employee) => employee._id !== id);
        });
    };

    useEffect(() => {
        const getEmployees = async () => {
            try {
                const employees = await fetchEmployees();
                setLoading(false);
                setEmployees(employees);
            } catch (error) {
                console.error(error);
            }
        };
        getEmployees();
    }, [isMissing]);


    if (loading) {
        return <Loading />;
    }

    const handleAttendance = (employee) => {
        employee.present = !employee.present
        setIsMissing(!isMissing)
        updateEmployee(employee)
    }

    const incrementPage = () => {
        if (pageNumber * 10 >= employees.length) return;
        setPageNumber(pageNumber + 1);
    };

    const decrementingPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    return (
        <div >
            <EmployeeTable employees={employees.slice((pageNumber - 1) * 10, pageNumber * 10)} onDelete={handleDelete} handleAttendance={handleAttendance} />
            <button onClick={decrementingPage}>Prev</button>
            <button onClick={incrementPage}>Next</button>
            <p>Page number: {pageNumber}</p>
    </div >
    )
}

export default MissingEmployees;