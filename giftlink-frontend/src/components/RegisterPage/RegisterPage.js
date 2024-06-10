import React, { useState } from "react";
import { urlConfig } from "../../config";
import { useAppContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "./RegisterPage.css";

function RegisterPage() {
  //insert code here to create useState hook variables for firstName, lastName, email, password
  [firstName, setFirstName] = useState("");
  [lastName, setLastName] = useState("");
  [email, setEmail] = useState("");
  [password, setPassword] = useState("");

  const [showerr, setShowerr] = useState("");

  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();

  // insert code here to create handleRegister function and include console.log
  const handleRegister = async () => {
    try {
      const response = await fetch(
        `${urlConfig.backendUrl}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          }),
        },
      );
      const json = await response.json();

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", firstName);
        sessionStorage.setItem("email", json.email);
        setIsLoggedIn(true);
        navigate("/app");
      }
      if (json.error) {
        setShowerr(json.error);
      }
    } catch (e) {
      console.log("Error fetching details: " + e.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="register-card p-4 border rounded">
            <h2 className="text-center mb-4 font-weight-bold">Register</h2>
            <div className="text-danger">{showerr}</div>
            {/* insert code here to create input elements for all the variables - firstName, lastName, email, password */}
            <div className="mb-4">
              <label htmlFor="firstName" className="form label">
                FirstName
              </label>
              <br />
              <input
                id="firstName"
                type="text"
                className="form-control"
                placeholder="Enter your firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* insert code here to create a button that performs the `handleRegister` function on click */}
            <button
              className="btn btn-primary w-100 mb-3"
              onClick={handleRegister}
            >
              Register
            </button>
            <p className="mt-4 text-center">
              Already a member?{" "}
              <a href="/app/login" className="text-primary">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  ); //end of return
}

export default RegisterPage;
