import { useEffect, useState, navigate } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { useNavigate, useParams } from "react-router-dom";


const fetchEmployees = async () => {
  const res = await fetch("/api/employees");
  return res.json();
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

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [copyEmployees, setCopyEmployees] = useState([]);
  const [inputText, setInputText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { header, order } = useParams();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState(order === "asc" ? true : false);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const employees = await fetchEmployees();
        setLoading(false);
       
        setEmployees(
          employees.sort(function (a, b) {
            return a[header] > b[header] ? 1 : -1;
          })
        );
       setSortOrder(order === "asc" ? true : false);
        setCopyEmployees(employees);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

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
  };

  const handleAttendance = (employee) => {
    employee.present = !employee.present;
    console.log(employee.present);
    updateEmployee(employee);
  };

  const handleSort = (property) => {
    if (sortOrder === false) {
      setSortOrder(true);
      setEmployees((previous) =>
        [...previous].sort((a, b) => a[property].localeCompare(b[property]))
      );
      navigate(`/employees/${property}/asc`)
    } else {
      setSortOrder(false);
      setEmployees((previous) =>
        [...previous].sort((a, b) => b[property].localeCompare(a[property]))
      );
      navigate(`/employees/${property}/desc`)
    }
  };

  const sortEmployees = (e) => {
    const option = e.target.value;
    if (option === "level") {
      setEmployees((previous) =>
        [...previous].sort((a, b) => a.level.localeCompare(b.level))
      );
    } else if (option === "position") {
      setEmployees((previous) =>
        [...previous].sort((a, b) => a.position.localeCompare(b.position))
      );
    } else if (option === "firstName") {
      setEmployees((previous) =>
        [...previous].sort((a, b) => a.name.localeCompare(b.name))
      );
    } else if (option === "lastName") {
      setEmployees((previous) =>
        [...previous].sort((a, b) => {
          const aLast = a.name.split(" ")[a.name.split(" ").length - 1];
          const bLast = b.name.split(" ")[b.name.split(" ").length - 1];
          return aLast.localeCompare(bLast);
        })
      );
    } else if (option === "middleName") {
      setEmployees((previous) =>
        [...previous].sort((a, b) => {
          const aMiddle =
            a.name.split(" ")[a.name.split(" ").length > 2 ? 1 : 1];
          const bMiddle =
            b.name.split(" ")[b.name.split(" ").length > 2 ? 1 : 1];
          return aMiddle.localeCompare(bMiddle);
        })
      );
    }
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

  return (
    <div>
      <input
        type="text"
        onChange={filterEmployees}
        value={inputText}
        placeholder="Search by position or level"
      ></input>
      <select onChange={sortEmployees} id="sort">
        <option value="" disabled defaultValue>
          --Sort by--
        </option>
        <option value="firstName">first name</option>
        <option value="lastName">last name</option>
        <option value="middleName">middle name</option>
        <option value="position">position</option>
        <option value="level">level</option>
      </select>
      <EmployeeTable
        employees={employees.slice((pageNumber - 1) * 10, pageNumber * 10)}
        onDelete={handleDelete}
        handleAttendance={handleAttendance}
        handleSort={handleSort}
      />
      <button onClick={decrementingPage}>Prev</button>
      <button onClick={incrementPage}>Next</button>
      <p>Page number: {pageNumber}</p>
    </div>
  );
};

export default EmployeeList;