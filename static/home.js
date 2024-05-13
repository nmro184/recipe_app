const root = ReactDOM.createRoot(document.getElementById('root'))


function Header({setSearchQuery , userRecipes ,setUserRecipes}){
    const  myRecipes = () =>{
        setUserRecipes(!userRecipes);
    }
    const createRecipe = () => {
        window.location.href = `/create_recipe/${username}`
    };
    
    const handleSearch = (event) =>{
        setSearchQuery(event.target.value);
    }
    return (
        <header>
            <div className="welcome-div">
                <h2 className = "header-item">Welcome {username} </h2>
            </div>
          <div>
            <h2 onClick = {myRecipes} className = "header-item">my recipes</h2>
          </div> 

          <div className="search">
            <input id="search-bar" type="search" className="search-bar" onChange ={handleSearch} />
          </div>
          <div>
            <h2 className = "header-item" onClick = {createRecipe}>new recipe</h2>
          </div>
          <a href="/"> 
            <h2 className="header-item">log out</h2>
          </a>
        </header>
      );
}
function Main({recipes}){
    return(
        <RecipeCardGrid recipes = {recipes}/>
    )
}
function RecipeCardGrid({recipes}){

        
        if (recipes.length === 0) {
            return <div>no recipes</div>;
        }

        return (
            <div className="recipe-cards-grid">
                {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))}
            </div>
        );
}

function RecipeCard({ recipe }) {
    
    const { image, title, time, difficulty, kosher, special , author , id } = recipe;

    const showRecipe = () =>{
        window.location.href = `/recipe/${username}/${id}`
    }
    return (
        <div className="recipe-card" onClick = {showRecipe}>
            {author === username && <div> your recipe </div>}
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <div className="descriptors">
                <h4>{time}</h4>
                <h4>{difficulty}</h4>
                <h4> {kosher ? '' : 'Not'} Kosher</h4>
                <h4>{special}</h4>
            </div>
        </div>
    );
}
function App(){
    const [userRecipes , setUserRecipes ] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [recipes, setRecipes] = React.useState([]);
    React.useEffect(() => {
        const getAllRecipes = async () => {
            try {
                const response = await fetch('/get_all_recipes');
                if (!response.ok) {
                    throw new Error('Failed to fetch recipes');
                }
                const data = await response.json();
                setRecipes(data.recipes);
            } catch (error) {
                console.error(error);
            }
        };

        getAllRecipes();
    }, []);
    const filteredRecipes =
        userRecipes ? 
            recipes.filter(recipe =>
                recipe.author.toLowerCase() == username.toLowerCase())
        :
            recipes.filter(recipe =>
                recipe.title.toLowerCase().includes(searchQuery.toLowerCase()))
        ;
    return(
        <>
            <Header setSearchQuery={setSearchQuery} userRecipes = {userRecipes} setUserRecipes = {setUserRecipes}/>
            <Main recipes = {filteredRecipes}/>
        </>
    )
}

root.render(<App/>)
