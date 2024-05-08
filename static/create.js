

function CreateRecipeForm() {
    const [imageSrc, setImageSrc] = React.useState(null);
    const [formData, setFormData] = React.useState({
        title: '',
        description: '',
        time: '',
        difficulty: '',
        kosher: false, // For checkboxes, set initial value to false
        specialDescriptor: ''
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

    const handleDragOver = (event) => {
        event.preventDefault();
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
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };
    return (
        <form>
                <input 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    onDragOver={handleDragOver} 
                    onDrop = {handleDrop}
                    className="file-input"
                />
            {imageSrc && (
                <img src={imageSrc} alt="Uploaded" className="uploaded-image" />
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
