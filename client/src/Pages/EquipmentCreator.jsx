import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EquipmentForm from "../Components/EquipmentForm";

const createEquipment = async (equipment) => {
  try {
    const response = await fetch("/api/equipments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(equipment),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const EquipmentCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateEquipment = (equipment) => {
    setLoading(true);

    createEquipment(equipment)
      .then(() => {
        setLoading(false);
        navigate("/equipments");
      })
  };

  return (
    <EquipmentForm
      onCancel={() => navigate("/equipments")}
      disabled={loading}
      onSave={handleCreateEquipment}
    />
  );
};

export default EquipmentCreator;
