import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete, handleAttendance, handleSort }) => {

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th onClick={()=> handleSort("name")}>Name</th>
            <th onClick={()=> handleSort("level")}>Level</th>
            <th onClick={()=> handleSort("position")}>Position</th>
            <th> Present </th>
            <th> Favorite brand</th>
            <th> Favorite color </th>
            <th>Salary</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={employee.present}
                  name="present"
                  id={`present_${employee._id}`}
                  onClick={() => handleAttendance(employee)}
                />
              </td>
              <td>{employee.brand.name} </td>
              <td>{employee.color.name} </td>
              <td>{employee.salary}</td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;