import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import { useParams } from "react-router-dom";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = async (search) => {
    const response = await fetch(`/employees/${search}`);
    const data = await response.json();
    return data;
};

const deleteEmployee = async (id) => {
    const res = await fetch(`/api/employees/${id}`, { method: "DELETE" });
    return res.json();
};

const updateEmployee = async (employee) => {
    const res = await fetch(`/api/employees/${employee._id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
    });
    return res.json();
};

const SearchEmployee = () => {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [copyEmployees, setCopyEmployees] = useState(null);
    const [inputText, setInputText] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const { search } = useParams();

    const handleDelete = (id) => {
        deleteEmployee(id);

        setEmployees((employees) => {
            return employees.filter((employee) => employee._id !== id);
        });
    };


    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const employees = await fetchEmployees(search);
                setLoading(false);
                setEmployees(employees);
                setCopyEmployees(employees);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEmployeeData();
    }, [search]);


    const filterEmployees = (e) => {
        setInputText(e.target.value);
        e.preventDefault();
        const filteredEmployees = copyEmployees.filter(
            (employee) =>
                employee.position
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                employee.level.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setEmployees(filteredEmployees);
        console.log(employees)
    };

    const handleAttendance = (employee) => {
        employee.present = !employee.present;
        console.log(employee.present);
        updateEmployee(employee);
    };

    

    const incrementPage = () => {
        if (pageNumber * 10 >= employees.length) return;
        setPageNumber(pageNumber + 1);
    };

    const decrementingPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <EmployeeTable
                employees={employees.slice((pageNumber - 1) * 10, pageNumber * 10)}
                onDelete={handleDelete}
                handleAttendance={handleAttendance}
            />
            <button onClick={decrementingPage}>Prev</button>
            <button onClick={incrementPage}>Next</button>
            <p>Page number: {pageNumber}</p>
        </div>
    );
};

export default SearchEmployee;