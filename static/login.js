const root = ReactDOM.createRoot(document.getElementById('root'))

function MessageDisplay({ message }) {
    return (
        <>
            {message && <div className="message">{message}</div>}
        </>
    );
}
function SignUpForm({isLoginFormVisible , setMessage , message, toggleForms}){

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        username: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        const { name, email, phone, username, password } = formData;

        if (!username || !password || !email || !phone || !name) {
            setMessage("Please fill out all the necessary fields.");
            return;
        }
        try {
            const response = await fetch('/signup', {
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
            setMessage(responseData['message']);
          } catch (error) {
            setMessage(error.message);
          }
    };

    return(
        <div className = "login-page">
            <form className="login-form" id="signupForm" action="/signup" method="POST" style={{ display: isLoginFormVisible ? 'none' : 'block' }}>
                    <input name="name" type="text" placeholder="full name" value={formData.name} onChange={handleChange} />
                <input name="email" type="email" placeholder="email" value={formData.email} onChange={handleChange} />
                <input name="phone" type="text" placeholder="phone number" value={formData.phone} onChange={handleChange} />
                <input name="username" type="text" placeholder="username" value={formData.username} onChange={handleChange} />
                <input name="password" type="password" placeholder="password" value={formData.password} onChange={handleChange} />
                    <div className="buttons">
                        <button className="login-button" onClick={handleSignup}>sign up</button>
                        <button className="login-button" onClick={toggleForms}>sign in</button>
                    </div>
                </form>
        </div>
    )
}
function LogInForm({isLoginFormVisible , setMessage , message, toggleForms}) {

    const [formData, setFormData] = React.useState({
        username: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    
    const handleLogin  = async (event) => {
        event.preventDefault();
        const { username, password } = formData;

        if (!username || !password) {
            setMessage("Please enter both username and password.");
            return;
        }
        try {
            const response = await fetch('/login', {
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
        };


    return (
        <div  className = "login-page">
            <form className="login-form" id="loginForm" action="/login" method="POST" style={{ display: isLoginFormVisible ? 'block' : 'none' }}>
            <input name="username" type="text" placeholder="username" value={formData.username} onChange={handleChange} />
            <input name="password" type="password" placeholder="password" value={formData.password} onChange={handleChange} />
                <div className="buttons">
                    <button className="login-button" onClick={handleLogin}>login</button>
                    <button className="login-button" onClick={toggleForms}>sign up</button>
                </div>
            </form>
            
        </div>
    );
}

function StartForm(){
    const [message, setMessage] = React.useState('');
    const [isLoginFormVisible, setIsLoginFormVisible] = React.useState(true);

    const toggleForms = (event) =>{
        event.preventDefault()
        setIsLoginFormVisible(!isLoginFormVisible);
        setMessage(''); 
    };

    return(
        <div>
            <MessageDisplay message={message} />
            <LogInForm isLoginFormVisible = {isLoginFormVisible} setMessage={setMessage}  toggleForms={toggleForms}/>
            <SignUpForm isLoginFormVisible = {isLoginFormVisible} setMessage={setMessage}  toggleForms={toggleForms}/>
        </div>
    )

}
root.render(<StartForm/>)