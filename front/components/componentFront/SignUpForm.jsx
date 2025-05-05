import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission (API, validation, etc.)
  };

  return (
    <main>
       <section className="sign-in-form section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto col-12">
              <h1 className="hero-title text-center mb-5">Sign Up</h1>

              <div className="social-login d-flex flex-column w-50 m-auto">
              <button type="submit" className="custom-btn mt-4 mb-3 ">
                  <i className="bi bi-google me-3 "></i>
                  Continue avec Google
                </button>
                <button type="submit" className="custom-btn mt-4 mb-3 ">
                  <i className="bi bi-facebook me-3"></i>
                  Continue avec Facebook
                </button>
              </div>

              <div className="div-separator w-50 m-auto my-5">
                <span>or</span>
              </div>

              <div className="row">
                <div className="col-lg-8 col-11 mx-auto">
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="Email adresse"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        pattern="[^ @]*@[^ @]*"
                      />
                      <label htmlFor="email">Email adresse</label>
                    </div>

                    <div className="form-floating my-4">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Mot de passe"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        pattern="[0-9a-zA-Z]{4,10}"
                      />
                      <label htmlFor="password">Mot de passe</label>
                      <p className="text-center">
                        * utiliser 0-9 a-z A-Z de 4 jusqu'à 10 caractéres
                      </p>
                    </div>

                    <div className="form-floating">
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirm_password"
                        className="form-control"
                        placeholder="Mot de passe"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        pattern="[0-9a-zA-Z]{4,10}"
                      />
                      <label htmlFor="confirm_password">Confirmer Mot de passe</label>
                    </div>

                    <button type="submit" className="custom-btn mt-4 mb-3 ">
                     Créer Compte
                    </button>
                    <p className="text-center" >
                      Compte existant? SVP <Link to="/sign-in" style={{ color: "#0A0A6B" }}>Sign In</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUpForm;
