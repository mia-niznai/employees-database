import { Link } from "react-router-dom";
import "./EquipmentTable.css"

const EquipmentTable = ({ equipments, onDelete }) => {
    return (
        <div className="EquipmentTable">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {equipments.map((equipment) => (
                    <tr key={equipment._id}>
                        <td>{equipment.name}</td>
                        <td>{equipment.type}</td>
                        <td>{equipment.amount}</td>
                        <td>
                            <Link to={`/update2/${equipment._id}`}>
                                <button type="button">Edit</button>
                            </Link>
                            <button onClick={() => onDelete(equipment._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
};

export default EquipmentTable;