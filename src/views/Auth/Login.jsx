//import state
import { useState } from "react";

//import service
import Api from "../../services/Api";

//import layoutAuth
import LayoutAuth from "../../layouts/Auth";

//import Cookie
import Cookies from "js-cookie";

//import Navigate
import { Navigate, useNavigate } from "react-router-dom";

//import toast
import toast from "react-hot-toast";

export default function login() {
    //title page
    document.title = "Login - Admin Desa";

    //navigate
    const navigate = useNavigate();

    //define state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //define state errors
    const [errors, setErrors] = useState([]);

    //define state show password
    const [showPassword, setShowPasswod] = useState(false);

    //method login
    const login = async (e) => {
        e.preventDefault();

        await Api.post("/api/login", {
            //data
            email: email,
            password: password,
        })
            .then((response) => {
                //set token to cookies
                Cookies.set("token", response.data.token);

                //set user to cookies
                Cookies.set("user", JSON.stringify(response.data.user));

                //show toast
                toast.success("Login Successfully!", {
                    position: "top-right",
                    duration: 4000,
                });

                //redirect dashboard page
                navigate("/admin/dashboard");
            })
            .catch((error) => {
                //set response error to state
                setErrors(error.response.data);
            });
    };

    //method toggle show password
    const toggleShowPassword = (e) => {
        e.preventDefault();
        setShowPasswod(!showPassword);
    }

    //handle text input
    const handleTextEmail = (e) => {
        const { email, ...rest } = errors;
        setEmail(e.target.value);
        setErrors(rest);
    }
    
    const handleTextPassword = (e) => {
        const { password, ...rest } = errors;
        setPassword(e.target.value);
        setErrors(rest);
    }



    //check if cookie already exists
    if (Cookies.get("token")) {
        //redirect dashboard page
        return <Navigate to="/admin/dashboard" replace />;
    }

    return (
        <LayoutAuth>
            <div
                className="row d-flex align-items-center justify-content-center"
                style={{
                    marginTop: "50px",
                }}
            >
                <div className="col-md-5">

                    <div className="card rounded-4 shadow-sm border-top-success">
                        <div className="card-body">
                            <div className="text-center">
                                <img src={"/images/logo.png"} width={"100"} />
                            </div>
                            <hr />

                            <div className="form-left h-100 py-3 px-3">
                                {errors.message && (
                                    <div className="alert alert-danger">{errors.message}</div>
                                )}
                                <form onSubmit={login} className="row g-4">
                                    <div className="col-12">
                                        <label>Email Address</label>
                                        <div className="input-group">
                                            <div className="input-group-text">
                                                <i className="fa fa-envelope"></i>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={email}
                                                onChange={handleTextEmail}
                                                placeholder="Enter Email Address"
                                            />
                                        </div>
                                        {errors.email && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.email[0]}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-12">
                                        <label>Password</label>
                                        <div className="input-group">
                                            <div className="input-group-text">
                                                <i className="fa fa-lock"></i>
                                            </div>
                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                className="form-control"
                                                value={password}
                                                onChange={handleTextPassword}
                                                placeholder="Enter Password"
                                                style={{ borderRight : '0' }}
                                            />
                                            <div className="show-hide-password">
                                                <a href="#" className="text-dark" onClick={toggleShowPassword}>
                                                    <i className="fa fa-eye-slash" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                        </div>
                                        {errors.password && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.password[0]}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4 float-end rounded-4"
                                    >
                                        LOGIN
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutAuth>
    );
}