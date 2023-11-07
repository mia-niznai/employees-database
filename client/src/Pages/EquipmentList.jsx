import React, { useEffect, useState } from "react";
import EquipmentTable from "../Components/EquipmentTable/EquipmentTable";
import Loading from "../Components/Loading";

const getAllEquipments = async () => {
    const response = await fetch("/api/equipments/");
    return response.json();
};

const deleteEquipment = async (id) => {
    const response = await fetch(`/api/equipments/${id}`, { method: "DELETE" });
    return response.json();
};

const EquipmentList = () => {
    const [equipments, setEquipments] = useState([]);
    const [loading, setLoading] = useState(true);
    

    const handleDelete = async (id) => {
        await deleteEquipment(id);
        setEquipments(equipments.filter((e) => e._id !== id));
    };
    

    useEffect(() => {
        async function fetchData() {
            try {
                const equipments = await getAllEquipments();

                setLoading(false);
                setEquipments(equipments);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <h1>Equipment List</h1>
            <EquipmentTable equipments={equipments} onDelete={handleDelete} />
        </>
    );
};

export default EquipmentList;
