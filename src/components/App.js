import React, {useState, useEffect} from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([])
  const [editPizza, setEditPizza] = useState({})

  useEffect(()=> {
    fetch("http://localhost:3001/pizzas")
    .then (resp => resp.json())
    .then(data => setPizzas(data))
  }, [])

  function updatePizza(pizzaObj) {
    const updatedPizzas = pizzas.map((pizza)=> {
      if (pizza.id === pizzaObj.id){
        return pizzaObj
      }
      else return pizza
    });
    setPizzas(updatedPizzas)
  }


  return (
    <>
      <Header />
      <PizzaForm editPizza={editPizza} updatePizza={updatePizza}/>
      <PizzaList pizzas={pizzas} onEdit={(pizza)=> setEditPizza(pizza)} />
    </>
  );
}

export default App;
