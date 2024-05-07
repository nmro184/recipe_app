const root = ReactDOM.createRoot(document.getElementById('root'))


function Header(){
    return (
        <header>
            <h2 className="welcome">
                Welcome {username}
                <button> my recipes </button>
            </h2>
          
          <div className="search">
            <input id="search-bar" type="search" className="search-bar" />
          </div>
          <a href="/" className="logout-button">log out</a>
        </header>
      );
}

function App(){
    return(
        <Header/>
    )
}

root.render(<App/>)
