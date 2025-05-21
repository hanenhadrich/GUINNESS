import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestRegister } from '../../store/authSlice';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      dispatch(requestRegister(formData));
    } else {
      alert('Les mots de passe ne correspondent pas!');
    }
  };

  return (
    <main>
      <section className="sign-up-form section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto col-12">
              <h1 className="hero-title text-center mb-5">Sign Up</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="firstName">Prénom</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="lastName">Nom</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="password">Mot de passe</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirmer le mot de passe"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                </div>

                <button type="submit" className="custom-btn mt-4 mb-3">
                  Créer un compte
                </button>

                <p className="text-center">
                  Déjà un compte ? <Link to="/sign-in">Se connecter</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUpForm;
