const root = ReactDOM.createRoot(document.getElementById('root'))
 
function Header({recipe}){

    const deleteRecipe =  () => {
        window.location.href = `/delete/${username}/${recipe.id}`
    }

    const editRecipe = () =>{
        window.location.href = `/edit_recipe/${username}/${recipe.id}`;
    }
    return(
            <header>
                <h2 className="welcome">
                    Welcome {username}
                </h2>
                {recipe.author == username &&
                <div>
                    <button onClick = {editRecipe}> edit </button>
                    <button onClick = {deleteRecipe}> delete </button>
                </div>
                }
                <a href={`/home/${username}`} className="back-button">back</a>
            </header>)
}
function Recipe({recipe}){
   
    const { image, title, description, time, difficulty, kosher, special , author  } = recipe;

    return(
        <div className="recipe" >
        {author === username && <div> your recipe </div>}
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <p className = "description">{description}</p>
        <div className="descriptors">
            <h4>{time}</h4>
            <h4>{difficulty}</h4>
            <h4> {kosher ? '' : 'Not'} Kosher</h4>
            <h4>{special}</h4>
        </div>
    </div>
    )
}
function App(){
    const [recipe , setRecipe] = React.useState({})
    React.useEffect(() => {
        const getRecipe = async () => { 
            try {
                const response = await fetch(`/get_recipe/${recipe_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe');
                }
                const data = await response.json();
                setRecipe(data.recipe);
            } catch (error) {
                console.error(error);
            }
        };

        getRecipe();
    }, []);
    return(
    <>
        <Header recipe = {recipe}/>
        <Recipe recipe = {recipe}/>
    </>
    )
}
root.render(<App/>)