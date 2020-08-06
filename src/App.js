import React, { useEffect, useState } from "react";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./App.css";
import Recipe from "./Recipe";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const APP_ID = "b1a2aab1";
  const APP_KEY = "6b73fffed4f4b61c107598527fe62d58";
  const URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        setRecipes(res.data.hits);
      })
      .catch((err) => console.log(err));
  }, [query]);

  const inputChangedHandler = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <h1>Recipe App</h1>
      <form onSubmit={getSearch}>
        <TextField
          id="standard-basic"
          label="Recipe Search"
          variant="standard"
          value={search}
          onChange={inputChangedHandler}
        />
        <Button variant="outlined" color="primary">
          SEARCH
        </Button>
      </form>
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
        />
      ))}
    </div>
  );
};

export default App;
