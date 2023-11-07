require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EquipmentModel = require("./db/equipment.model");
const BrandModel = require("./db/brand.model");
const ColorModel = require("./db/color.model");
const EmployeeModel = require("./db/employee.model");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().populate("equipment brand color readBooks").sort({ created: "desc" });
  return res.json(employees);
});

app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id).populate("equipment brand color");
  return res.json(employee);
});

app.get("/employees/:name", async (req, res) => {
  const name = req.params.name;
  const employees = await EmployeeModel.find({ name: { $regex: new RegExp(name, "i") } });
  return res.json(employees);
});

app.get("/api/equipments/", async (req, res) => {
  const equipments = await EquipmentModel.find().sort({ created: "desc" });
  return res.json(equipments);
});

app.get("/api/equipments/:id", async (req, res) => {
  const equipment = await EquipmentModel.findById(req.params.id);
  return res.json(equipment)
});

app.get("/brands/:name", async (req, res) => {
  const name = req.params.name;
  const brands = await BrandModel.find({ name: { $regex: new RegExp(name, "i") } });
  return res.json(brands);
});

app.get("/api/brands/", async (req, res) => {
  const brands = await BrandModel.find();
  return res.json(brands);
});

app.get("/api/brands/:id", async (req, res) => {
  const brands = await BrandModel.findById(req.params.id);
  return res.json(brands)
});

app.get("/colors/:name", async (req, res) => {
  const name = req.params.name;
  const colors = await ColorModel.find({ name: { $regex: new RegExp(name, "i") } });
  return res.json(colors);
});

app.get("/api/colors/", async (req, res) => {
  const colors = await ColorModel.find();
  return res.json(colors);
});

app.get("/api/colors/:id", async (req, res) => {
  const colors = await ColorModel.findById(req.params.id);
  return res.json(colors)
});


app.get("/api/missing", async (req, res) => {
  const checkedEmployees = await EmployeeModel.find({ present: "false" }).populate("brand color");
  res.json(checkedEmployees)
})

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    console.log(saved)
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.delete("/employees/:name", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.post("/api/equipments", async (req, res, next) => {
  const equipment = req.body;
  try {
    const saved = await EquipmentModel.create(equipment);
    return res.json(saved)
  } catch (error) {
    return next(error);
  }
});

app.patch("/api/equipments/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(equipment);
  } catch (err) {
    return next(err)
  }
});

app.delete("/api/equipments/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findById(req.params.id);
    const deleted = await equipment.delete();
    return res.json(deleted)
  } catch (err) {
    return next(err)
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
