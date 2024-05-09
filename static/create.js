

function CreateRecipeForm() {
    const [message , setMessage] = React.useState('')
    const [imageSrc, setImageSrc] = React.useState(null); 
    const [formData, setFormData] = React.useState({
        image : imageSrc ,
        title: '',
        description: '',
        time: '',
        difficulty: '',
        kosher: false, 
        specialDescriptor: '',
        author : username
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
            if (valid)
                {
                    try {
                        const response = await fetch('/new_recipe', {
                          method: 'POST',
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
                }
            else{
                console.log(valid)
                console.log(formData)
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CreateRecipeForm />);
