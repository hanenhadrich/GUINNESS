import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestUpdateProfile, clearError } from "../../store/authSlice";
import Swal from "sweetalert2";

const UpdateProfileForm = () => {
  const dispatch = useDispatch();

  const { user, isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    telephone: user?.telephone || "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (error) {
      Swal.fire("Erreur", error, "error");
      dispatch(clearError());
    }
  }, [error, dispatch]);

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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(
      requestUpdateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        telephone: formData.telephone,
        password: formData.password ? formData.password : undefined,
      })
    );
  };

  return (
    <main>
      <section className="profile-form section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto col-12">
              <h1 className="hero-title text-center mb-5">Modifier le profil</h1>
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
                    
                    placeholder="Mot de passe (laisser vide pour ne pas changer)"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="password">Mot de passe (optionnel)</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    autoComplete="new-password"
                    placeholder="Confirmer le mot de passe"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                </div>

                <button type="submit" className="custom-btn mt-4 mb-3" disabled={isLoading}>
                  {isLoading ? "En cours..." : "Mettre à jour"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UpdateProfileForm;
