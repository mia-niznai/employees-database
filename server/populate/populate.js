/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const brands = require("./brands.json");
const colors = require("./colors.json");
const books = require("./books.json");
const equipments = require("./equipments.json");
const EmployeeModel = require("../db/employee.model");
const EquipmentModel = require("../db/equipment.model");
const BrandModel = require("../db/brand.model");
const ColorModel = require("../db/color.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEquipments = async () => {
  await EquipmentModel.deleteMany({});

  const equipmentsData = equipments.map((equipment) => ({
    name: equipment.name,
    type: equipment.type,
    amount: equipment.amount
  }));

  await EquipmentModel.create(...equipmentsData);
  console.log("Equipments created");
}

const populateBrands = async () => {
  await BrandModel.deleteMany({});

  const brandsData = brands.map((brand) => ({
    name: brand.name,
  }));

  await BrandModel.create(...brandsData);
  console.log("Brands created");
}

const populateColors = async () => {
  await ColorModel.deleteMany({});

  const colorsData = colors.map((color) => ({
    name: color.name,
  }));

  await ColorModel.create(...colorsData);
  console.log("Colors created");
}

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const equipments = await EquipmentModel.find();
  const brands = await BrandModel.find();
  const colors = await ColorModel.find();

  const employees = names.map((name) => {
    const salaries = Math.floor(Math.random() * 1200) + 1;
    const level = salaries >= 0 && salaries <= 100 ? "Junior" : salaries >= 101 && salaries <= 300 ? "Medior" :
      salaries >= 301 && salaries <= 400 ? "Senior" : salaries >= 401 && salaries <= 800 ? 'Expert' : salaries > 800 ? "Godlike" : '';
    return {
      name,
      level: level,
      position: pick(positions),
      equipment: pick(equipments),
      present: false,
      brand: pick(brands),
      color: pick(colors),
      salary: salaries,
      readBooks: pick(books)
    }
  });

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};


const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEquipments();

  await populateBrands();

  await populateColors();

  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
