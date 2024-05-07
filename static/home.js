const root = ReactDOM.createRoot(document.getElementById('root'))


function Header(){
    const createRecipe = () => {
        window.location.href = '/'
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
        <RecipeCard/>
    )
}
function RecipeCard(){
    return(
        <div className = 'recipe-card'>
            <image></image>
            <h2>title</h2>
            <div className = "descriptors">
                <h4>time</h4>
                <h4>diffculty</h4>
                <h4> kosher </h4>
                <h4> special descriptor </h4>
            </div>

        </div>
    )
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
