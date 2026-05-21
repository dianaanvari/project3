import './App.css'
import { useState } from 'react'
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
        {props.recipe.ingrediant.map((item, index) => (
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

  const [recipes, setRecipes] = useState([{"name": "pasta", "instructions": "do the thing", "ingrediant": ["thing1", "thing2"]}])
  const [currentRecipe, setCurrentRecipe] = useState(0)
  
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
          setCurrentRecipe={setCurrentRecipe}
         />
      ))}
        </ul>
        <button>Add New</button>
      </div>

      <div className="main">
        <h2>Instructions</h2>
        <textarea placeholder="Write instructions here..." />
      </div>

      <div className="ingredients">
        <h2>Ingredients</h2>
        <textarea placeholder="List ingredients..." />
      </div>

      <div className="footer">
        <button>Save</button>
      </div>

    </div>
  )
}



export default App