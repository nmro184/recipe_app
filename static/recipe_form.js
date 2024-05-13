
function Header({initialRecipe}){
    return(
        <header>
            <h2 className="header-item"> {username} </h2>
            <h2 className = "header-item"> {initialRecipe.image ? "Edit recipe form" : "Create recipe form"}</h2>
            <a href={`/home/${username}`} >
            <h2 className="header-item">back</h2>

            </a>
        </header>
        );
}


function RecipeForm({initialRecipe}) {
    const [message, setMessage] = React.useState('');
    const [imageSrc, setImageSrc] = React.useState(initialRecipe.image || null);
    const [formData, setFormData] = React.useState({
        image: initialRecipe.image || null,
        title: initialRecipe.title || '',
        description: initialRecipe.description || '',
        time: initialRecipe.time || '',
        difficulty: initialRecipe.difficulty || '',
        kosher: initialRecipe.kosher || false,
        specialDescriptor: initialRecipe.specialDescriptor || '',
        author: initialRecipe.author || username
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        handleImage(file);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        handleImage(file);
    };

    const handleImage = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
                setFormData({
                    ...formData,
                    image: reader.result,
                });
                
            };
            reader.readAsDataURL(file);
        }
    };
    const handleImageRemove = () =>{
        setImageSrc(null);
        setFormData({
            ...formData,
            image: null,
        });
    }

    const validateForm = () =>{
        const { image, title , description , time , difficulty  } = formData;
        if (!image || !title || !description || !time || !difficulty){
            setMessage("please fill in the required blank fields")
            return false
        }else{
            return true
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const valid = validateForm();
        if (valid) {
            try {
                let url = '/new_recipe';
                let method = 'POST';
                if (initialRecipe && initialRecipe.id) {
                    url = `/update_recipe/${username}/${initialRecipe.id}`;
                    method = 'PUT';
                }
    
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message);
                }
    
                const responseData = await response.json();
                window.location.href = responseData.redirect;
            } catch (error) {
                setMessage(error.message);
            }
        } else {
            console.log(valid);
            console.log(formData);
        }
    };
    
    return (
        <form>
                {message && <h1> {message} </h1>}
                {imageSrc == null &&
                <input 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    onDrop = {handleDrop}
                    className="file-input"
                />}
            {imageSrc && (
                <>
                    <img src={imageSrc} alt="Uploaded" className="uploaded-image" />
                    <button onClick = {handleImageRemove}>remove </button>
                </>
            )}
            <input type="text" name="title" className="title-input" placeholder="Title" value={formData.title} onChange={handleChange} />
            <textarea name="description" className="description-input" placeholder="Description" value={formData.description} onChange={handleChange} ></textarea>
            <input type="text" name="time" className="time-input" placeholder="Time to make" value={formData.time}  onChange={handleChange} />
            <input type="text" name="difficulty" className="difficulty-input" placeholder="Difficulty level" value={formData.difficulty} onChange={handleChange}  />
            <div className="checkbox-input">
                <label htmlFor="kosher">Kosher</label>
                <input type="checkbox" id="kosher" name="kosher" className="kosher-input" checked={formData.kosher} onChange={handleChange} />
            </div>
            <input type="text" name="specialDescriptor" className="specialDescriptor-input" placeholder="Special descriptor" value={formData.specialDescriptor} onChange={handleChange} />
            <button onClick = {handleSubmit} type="submit"  className="submit-button" > submit</button>
        </form>
    );
}


async function RenderApp() {
    const initialRecipe = await fetchInitialRecipe();
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(<App initialRecipe={initialRecipe} />);
}

async function fetchInitialRecipe() {
    if (recipe_id != -1) {
        try {
            const response = await fetch(`/get_recipe/${recipe_id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch recipe');
            }
            const data = await response.json();
            return data.recipe;
        } catch (error) {
            console.error(error);
            return {};
        }
    }
    return {};
}

function App({ initialRecipe }) {
    
    return (
    <div>
        <Header initialRecipe={initialRecipe}/>
        <RecipeForm initialRecipe={initialRecipe} />
    </div>   
    );
}
RenderApp();