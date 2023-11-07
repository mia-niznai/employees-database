import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EquipmentForm from "../Components/EquipmentForm";
import Loading from "../Components/Loading";

const updateEquipment = async (equipment) => {
  try {
    const response = await fetch(`/api/equipments/${equipment._id}`, {
      method: "PATCH",
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

const fetchEquipment = async (id) => {
  const res = await fetch(`/api/equipments/${id}`);
  return res.json();
};

const EquipmentUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [equipmentLoading, setEquipmentLoading] = useState(true);

  useEffect(() => {
    setEquipmentLoading(true);
    fetchEquipment(id)
      .then((equipment) => {
        setEquipment(equipment);
        setEquipmentLoading(false);
      });
  }, [id]);

  const handleUpdateEquipment = async (equipment) => {
    try {
      setUpdateLoading(true);
      await updateEquipment(equipment);
      setUpdateLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (equipmentLoading) {
    return <Loading />;
  }

  return (
    <EquipmentForm
      equipment={equipment}
      onSave={handleUpdateEquipment}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
    />
  );
};

export default EquipmentUpdater;
