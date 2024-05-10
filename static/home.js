const root = ReactDOM.createRoot(document.getElementById('root'))


function Header(){
    const createRecipe = () => {
        window.location.href = `/create_recipe/${username}`
    };
    return (
        <header>
            <h2 className="welcome">
                Welcome {username}
                <button> my recipes </button>
                <button className = "add-recipe-button" onClick = {createRecipe}>+</button>
            </h2>
          
          <div className="search">
            <input id="search-bar" type="search" className="search-bar" />
          </div>
          <a href="/" className="logout-button">log out</a>
        </header>
      );
}
function Main(){
    return(
        <RecipeCardGrid/>
    )
}
function RecipeCardGrid(){
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

        if (recipes.length === 0) {
            return <div>Loading...</div>;
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
    
    const { image, title, time, difficulty, kosher, special } = recipe;

    return (
        <div className="recipe-card">
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
    return(
        <>
            <Header/>
            <Main/>
        </>
    )
}

root.render(<App/>)
