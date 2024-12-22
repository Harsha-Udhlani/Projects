import { useState } from "react";
import "./App.css";
import Axios from "axios";
import Recipe from "./Components/Recipe";
import Alert from "./Components/Alert";
function App() {
  const APP_ID = "4e9f05eb";
  const APP_KEY = "9b904d703fa0d46a88ce1ac63f29f498";
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const url = `https://api.edamam.com/search?q=${query}s&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const getData = async () => {
    if (query != "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("No Food With Such Name");
      }
      setRecipes(result.data.hits);
      console.log(result.data);
      setAlert("");
      setQuery("");
    } else {
      setAlert("Please Fill The Form");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
  };
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <div className="App">
        <h1 onClick={getData}>Food Searching App</h1>
        <form className="search-form" onSubmit={handleSubmit}>
          {alert != "" && <Alert alert={alert} />}
          <input
            type="text"
            placeholder="Search Food"
            autoComplete="off"
            onChange={handleChange}
            value={query}
          />
          <input type="submit" value="SEARCH"></input>
        </form>
        <div className="recipes">
          {recipes &&
            recipes.map((rec, index) => {
              return <Recipe recipe={rec} key={index} />;
            })}
        </div>
      </div>
    </>
  );
}

export default App;
