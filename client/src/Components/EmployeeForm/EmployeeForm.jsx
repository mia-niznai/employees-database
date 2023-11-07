import { useEffect, useState } from "react";
import Loading from "../Loading";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(employee ? employee.equipment.name : '');
  const [loading, setLoading] = useState(true);
  const [brandOptions, setBrandsOptions] = useState([]);
  const [aBrand, setABrand] = useState(employee ? employee.brand.name : '');
  const [colorOptions, setColorsOptions] = useState([]);
  const [aColor, setAColor] = useState(employee ? employee.color.name : '');
  const [bookOptions, setBookOptions] = useState([]);
  const [aBook, setABook] = useState(employee ? employee.readBooks[0].title : '');
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("")
  const [readBooks, setReadBooks] = useState(
    employee ? employee.readBooks : []
  );
  const [level, setLevel] = useState(employee ? employee.level : "");
  
  function changeLevel(e) {
    const salary = e.target.value;
    if (1 <= salary && salary <= 100) {
      setLevel("Junior");
    } else if (101 <= salary && salary <= 300) {
      setLevel("Medior");
    } else if (301 <= salary && salary <= 400) {
      setLevel("Senior");
    } else if (401 <= salary && salary <= 800) {
      setLevel("Expert");
    } else if (801 <= salary) {
      setLevel("Godlike");
    }
  }


  function handleEquipmentChange(event) {
    setSelectedOption(event.target.value);
  }

  function handleBrandChange(event) {
    setABrand(event.target.value);
  }

  function handleColorChange(event) {
    setAColor(event.target.value);
  }


  useEffect(() => {
    async function fetchEquipment() {
      const res = await fetch("/api/equipments");
      const equipments = await res.json();
      const options = equipments.map((equipment) => ({
        key: equipment._id,
        value: equipment._id,
        label: equipment.name,
      }));
      setEquipmentOptions(options);
      setLoading(false);
    };

    async function fetchBrand() {
      const res = await fetch("/api/brands");
      const brands = await res.json();
      const options = brands.map((brand) => ({
        key: brand._id,
        value: brand._id,
       label: brand.name,
      }));
      setBrandsOptions(options);
      setLoading(false);
    };

    async function fetchColor() {
      const res = await fetch("/api/colors");
      const colors = await res.json();
      const options = colors.map((color) => ({
        key: color._id,
        value: color._id,
        label: color.name,
      }));
      setColorsOptions(options);
      setLoading(false);
    };


    fetchBrand();
    fetchColor();
    fetchEquipment();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return onSave({ ...employee, readBooks: updatedReadBooksfunction() });
  };

  const handleBookName = (e) => {
    setBookName(e.target.value);
  };

  const handleBookAuthor = (e) => {
    setBookAuthor(e.target.value);
  };

  const newBook = {
    title: bookName,
    author: bookAuthor,
  };

  const updatedReadBooksfunction = () => {
    if (readBooks.length > 1) {
      const updatedReadBooks = readBooks.concat(newBook);
      return updatedReadBooks;
    } else {
      const updatedReadBooks = readBooks.concat(newBook);
      return updatedReadBooks;
    }
  };


  if (loading) {
    return <Loading />;
  }

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          value={level}
          name="level"
          id="level"
          readOnly
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="equipment">Equipment:</label>
        <select name="equipment" value={selectedOption} onChange={handleEquipmentChange}>
          <option value="">{selectedOption}</option>
          {equipmentOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="control">
        <label htmlFor="brand">Brand:</label>
        <select name="brand" value={aBrand} onChange={handleBrandChange}>
          <option value="">{aBrand}</option>
          {brandOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>


      <div className="control">
        <label htmlFor="color">Color:</label>
        <select name="color" value={aColor} onChange={handleColorChange}>
          <option value="">{aColor}</option>
          {colorOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="control">
        <label htmlFor="salary">Salary:</label>
        <input
          defaultValue={employee ? employee.salary : null}
          name="salary"
          id="salary"
          onChange={changeLevel}
        />
      </div>

      <details
        style={{
          backgroundColor: "rgb(99, 151, 254)",
        }}
      >
        <summary
        >
          Book(s):
        </summary>
        {readBooks.length > 0
          ? readBooks.map((book, _id) => {
            return (
              <div className="control" key={book._id}>
                <label htmlFor="bookName">Book name:</label>
                <input
                  readOnly
                  defaultValue={employee ? book.title : null}
                  name="bookName"
                  id="bookName"
                />
                <div className="control"></div>
                <label htmlFor="author">Book author:</label>
                <input
                  readOnly
                  defaultValue={employee ? book.author : null}
                  name="author"
                  id="author"
                />
              </div>
            );
          })
          : null}
      </details>

      <div className="control">
        <label htmlFor="bookName">Book name:</label>
        <input
          value={bookName}
          onChange={handleBookName}
          name="bookName"
          id="bookName"
        />
        <div className="control"></div>
        <label htmlFor="author">Book author:</label>
        <input
          value={bookAuthor}
          onChange={handleBookAuthor}
          name="author"
          id="author"
        />
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;