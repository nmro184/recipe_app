const root = ReactDOM.createRoot(document.getElementById('root'))
 
function Header(){
    const deleteRecipe = async () => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                const response = await fetch(`/delete/${recipe_id}`);
                if (!response.ok) {
                    throw new Error('Failed to delete recipe');
                }
                await response.json();
                window.location.href = `/home/${username}`;
            } catch (error) {
                console.error(error);
            }
        }
    };
    
    const editRecipe = () =>{
        console.log("edit")
    }
    return(
            <header>
                <h2 className="welcome">
                    Welcome {username}
                </h2>
                <button onClick = {editRecipe}> edit </button>
                <button onClick = {deleteRecipe}> delete </button>
                <a href={`/home/${username}`} className="back-button">back</a>
            </header>)
}
function Recipe(){
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
    const { image, title, description, time, difficulty, kosher, special , author , id } = recipe;

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
    return(
    <>
        <Header/>
        <Recipe/>
    </>
    )
}
root.render(<App/>)