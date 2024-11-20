
//import React
import React, { useState } from "react";

//import Link from react router dom
import { Link, useNavigate } from "react-router-dom";

//import API
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

import LayoutAdmin from "../../../layouts/Admin";



export default function Dashboard() {
    //navigate
    const navigate = useNavigate();

    //token from cookies
    const token = Cookies.get("token");

    //method logout
    const logout = async (e) => {
        e.preventDefault();

        //fetch to rest api for logout
        await Api.post("/api/logout",{}, {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            //remove user from cookies
            Cookies.remove("user");

            //remove token from cookies
            Cookies.remove("token");

            //show toast
            toast.success("Logout Successfully!", {
                position: "top-right",
                duration: 4000,
            });

            //redirect to login page
            navigate("/login");
            console.log('test');

        }).catch((error) => {
            //set response error to state
            console.log(error);

            setErrors(error.response.data);
        });
    };
    return (
        <LayoutAdmin>
            <div>
                <Link
                    className="btn btn-danger"
                    onClick={logout}
                >
                    Logout
                </Link>
            </div>
        </LayoutAdmin>

    );
}