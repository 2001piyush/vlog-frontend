import React, { useState } from "react";
import { registerUser,userLogin } from "../../api";
import { useNavigate } from "react-router-dom";
function Registration({ setIsAuthenticated, setIsAdmin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await registerUser({
        name,
        email,
        password,
      });
       await userLogin(email, password);
       setIsAuthenticated(true);
       setIsAdmin(false); // regular user await userLogin(email, password);
        // regular user
      alert("Registration successful!");
      setName("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
       navigate("/");
    } catch (err) {
      alert(err.message || "Registration failed");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow" style={{ borderRadius: "25px" }}>
            <div className="row g-0 align-items-center">
              <div className="col-md-6 p-5">
                <h2 className="text-center fw-bold mb-5">Sign up</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Your Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Repeat your password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-check mb-4">
                    <input className="form-check-input" type="checkbox" id="newsletter" />
                    <label className="form-check-label" htmlFor="newsletter">
                      Subscribe to our newsletter
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mb-4">
                    Register
                  </button>
                </form>
              </div>
              <div className="col-md-6 d-none d-lg-flex align-items-center justify-content-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  alt="Registration"
                  className="img-fluid"
                  style={{ borderRadius: "25px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;