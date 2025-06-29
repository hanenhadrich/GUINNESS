import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestRegister, resetRegistration, clearError } from "../../store/authSlice";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom"; 

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const { isLoading, error, registrationSuccess } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (registrationSuccess) {
      Swal.fire("Succès", "Inscription réussie !", "success").then(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          telephone: "",
          password: "",
          confirmPassword: "",
        });
        dispatch(resetRegistration());
        navigate("/sign-in"); 
      });
    }
  }, [registrationSuccess, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      Swal.fire("Erreur", error, "error");
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (formData.password !== formData.confirmPassword) {
      Swal.fire("Erreur", "Les mots de passe ne correspondent pas !", "error");
      return false;
    }
    const phoneRegex = /^\+216[0-9]{8}$/;
    if (!phoneRegex.test(formData.telephone)) {
      Swal.fire(
        "Erreur",
        "Veuillez saisir un numéro de téléphone valide au format +216XXXXXXXX",
        "error"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(
      requestRegister({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        telephone: formData.telephone,
        password: formData.password,
      })
    );
  };
  return (
    <main>
      <section className="sign-up-form section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto col-12">
              <h1 className="hero-title text-center mb-5">Inscription</h1>
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-floating mb-4">
                  <input
                    id="firstName"
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
                    id="lastName"
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
                    id="email"
                    type="email"
                    autoComplete="off"
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
                    id="telephone"
                    type="tel"
                    name="telephone"
                    className="form-control"
                    placeholder="Téléphone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    pattern="^\+216[0-9]{8}$"
                    title="Numéro au format +216XXXXXXXX"
                  />
                  <label htmlFor="telephone">Téléphone (+216 XX XXX XXX)</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    autoComplete="new-password"
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
                    id="confirmPassword"
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

                <button type="submit" className="custom-btn mt-4 mb-3" disabled={isLoading}>
                  {isLoading ? "En cours..." : "S'inscrire"}
                </button>

                <p className="text-center">
                  Déjà un compte ?{" "}
                  <Link to="/sign-in" className="sign-link">
                    Se connecter
                  </Link>
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
