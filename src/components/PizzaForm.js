import React, {useState, useEffect} from "react";

function PizzaForm({editPizza, updatePizza}) {
  const [formPizza, setFormPizza] = useState(
                                  {topping: "",
                                    size: "Small",
                                    vegetarian: false})


  useEffect(()=> {
    if (Object.keys(editPizza).length !== 0) {
      setFormPizza(editPizza)
        }
    }, [editPizza])

  function handleChange(e) {
    const name = e.target.name;
    let value = e.target.value
    if (e.target.type === "radio") {
      if(value === "Vegetarian") {
        value = true
      }
      else value = false    
    }
    setFormPizza({...formPizza, [name]:value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch(`http://localhost:3001/pizzas/${formPizza.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formPizza),
    })
    .then((r) => r.json())
    .then((updatedItem) => updatePizza(updatedItem))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            onChange={handleChange}
            value={formPizza.topping}
          />
        </div>
        <div className="col">
          <select className="form-control" name="size" value={formPizza.size} onChange={handleChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
              checked={formPizza.vegetarian}
              onChange={handleChange}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              checked={!formPizza.vegetarian}
              value="Not Vegetarian"
              onChange={handleChange}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
