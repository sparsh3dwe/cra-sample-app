import {useState} from "react";

export default function Login() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const submit = (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;
        if (!email || !password) {
            setErrorText('Cannot Process empty fields');
            return;
        }
        if (email === "sparshjain37@gmail.com" && password === "password@123") {
            setFirstName(e.target.firstName.value);
            setLastName(e.target.lastName.value);
            setLoggedIn(true);
        } else {
            setErrorText('invalid Login Details');
        }
    }

    if (loggedIn) {
        return <div>
            <div>Welcome, {firstName + ' ' + lastName}</div>
            <button onClick={() => setLoggedIn(false)}>logout</button>
        </div>
    }
    return <form onSubmit={submit}>
        <div style={{display: "flex", flexDirection: "column", marginTop: "100px"}}>
            <label style={{marginTop: "20px"}}> FirstName<input type={"text"} id={"firstName"}/></label>
            <label style={{marginTop: "10px"}}> LastName<input type={"text"} id={"lastName"}/>
            </label>
            <label style={{marginTop: "10px"}}> Email<input type={"email"} id={"email"}/>
            </label>
            <label style={{marginTop: "10px"}}> Password<input type={"password"} id={"password"}/>
            </label>
            <div style={{marginTop: "10px"}}><input type={"submit"} title={"Submit"} style={{width: '100px'}}/></div>
            <div style={{marginTop: "20px"}}>{errorText}</div>
        </div>
    </form>;
}