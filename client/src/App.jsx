import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
/*
1. Create Components for Recipe and Selector
2. Send data into compoents to display them
3. Make Recipe selectors into a list of components to display all of them
*/


// Recipe Component
function Recipe(props) {
  return (
    <div>
      <h2>{props.recipe.name}</h2>

      <h3>Instructions</h3>
      <p>{props.recipe.instructions}</p>

      <h3>Ingredients</h3>
      <ul>
        {props.recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
    )
  }

// Recipe Selector Component
function RecipeSelector(props) {
  return (
    <li onClick={() => props.setCurrentRecipe(props.index)}>
      {props.recipe.name}
    </li>
  )
}

function App() {

 // const [recipes, setRecipes] = useState([{"name": "pasta", "instructions": "do the thing", "ingredients": ["thing1", "thing2"]}])
 // const [currentRecipe, setCurrentRecipe] = useState(0)
 const [recipes, setRecipes] = useState([])
 const [currentRecipe, setCurrentRecipe] = useState (0)
 const [instructionsText, setInstructionsText] = useState("")
 const [ingredientsText, setIngredientsText] = useState("")
 const [greeting, setGreeting] = useState("")

 useEffect(() => {
  fetch('http://localhost:5050/api/recipes')
  .then(res => res.json())
  .then(data => {
    setRecipes(data)
    if (data.length > 0) {
      handleRecipeSelect(0)
    }
  })
  .catch(err => setGreeting("Server is not responding 😢"))
}, [])
const handleAddNew = async () => {
// Axios handles the promise and the JSON conversion automatically
  const response  = await axios.post ('http://localhost:5050/api/recipes', {
    name: "New Recipe",
    instructions: "",
    ingredients: []
  });
  setRecipes([...recipes, response.data]);
}
const handleRecipeSelect = (index) => {
  setCurrentRecipe(index)
  if (recipes[index]) {
    setInstructionsText(recipes[index].instructions)
    setIngredientsText(recipes[index].ingredients.join('\n'))
  }
}
const handleSave = async () => {
  if (!recipes[currentRecipe]) {
    alert ("no recipe selcted")
    return
  }
  const response = await axios.put(`http://localhost:5050/api/recipes/${recipes[currentRecipe]._id}`,{
    name: recipes[currentRecipe].name,
    instructions: instructionsText,
    ingredients: ingredientsText
});

const newRecipes = [...recipes];
newRecipes[currentRecipe] = response.data;
setRecipes(newRecipes);
}

const handleDelete = async () => {
  if (!recipes[currentRecipe]) {
  alert("No recipe selcted!")
  return
}

await axios.delete(`http://localhost:5050/api/recipes/${recipes[currentRecipe]._id}`)
const newRecipes = recipes.filter((_, i) => i !== currentRecipe)
setRecipes(newRecipes)
}

return (
    <div className="container">
      <div className="sidebar">
        <h2>Recipes</h2>
        <ul>
        {recipes.map((recipe, index) => (
           <RecipeSelector
           key={index}
           recipe={recipe}
          index={index}
          setCurrentRecipe={handleRecipeSelect}
         />
      ))}
        </ul>
        <button onClick={handleAddNew}>Add New</button>
      </div>

      <div className="main">
        <h2>Instructions</h2>
        <textarea
        value = {instructionsText}
        onChange={(e) => setInstructionsText(e.target.value)}
        placeholder="Write instructions here..." />
      </div>

      <div className="ingredients">
        <h2>Ingredients</h2>
        <textarea 
        value={ingredientsText}
        onChange={(e) => setIngredientsText(e.target.value)}
        placeholder="List ingredients..." />
      </div>

      <div className="footer">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleDelete}>Delete</button>
      </div>

    </div>
  )
}



export default App