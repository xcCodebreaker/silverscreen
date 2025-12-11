import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Input from "./form/Input";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setJwtToken } = useOutletContext();
    const { setAlertClassName } = useOutletContext();
    const { setAlertMessage } = useOutletContext();
    const { toggleRefresh } = useOutletContext();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // build the request payload
        let payload = {
            email: email,
            password: password,
        }

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(payload),
        }

        fetch(`/authenticate`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setAlertClassName("alert-danger");
                    setAlertMessage(data.message);
                } else {
                    setJwtToken(data.access_token);
                    setAlertClassName("d-none");
                    setAlertMessage("");
                    toggleRefresh(true);
                    navigate("/");
                }
            })
            .catch(error => {
                setAlertClassName("alert-danger");
                setAlertMessage(error);
            })
    }

    return(
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Welcome Back</h2>
                <p className="text-center text-secondary mb-3">Sign in to manage your movie catalog</p>

                <form onSubmit={handleSubmit}>
                    <Input
                        title="Email Address"
                        type="email"
                        className="modern-form-control"
                        name="email"
                        autoComplete="email-new"
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <Input
                        title="Password"
                        type="password"
                        className="modern-form-control"
                        name="password"
                        autoComplete="password-new"
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <div className="mt-3">
                        <input 
                            type="submit"
                            className="modern-btn modern-btn-primary w-100"
                            value="Sign In"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;