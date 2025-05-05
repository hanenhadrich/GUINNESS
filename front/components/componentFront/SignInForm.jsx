import React, { useState } from 'react';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajouter ici la logique de soumission du formulaire (par exemple, appel API)
  };

  return (
    <main>
      <section className="sign-in-form section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto col-12">
              <h1 className="hero-title text-center mb-5 fw-bold" style={{ fontSize: '70px' }}>Sign In</h1>
              <div className="row">
                <div className="col-lg-8 col-11 mx-auto">
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-4 p-0">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        pattern="[^ @]*@[^ @]*"
                        className="form-control"
                        placeholder="Email adresse"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label htmlFor="email">Email adresse</label>
                    </div>

                    <div className="form-floating p-0">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label htmlFor="password">Mot de passe</label>
                    </div>

                    <button type="submit" className="custom-btn mt-4 mb-3 ">
                        Se connecter
                    </button>


                    <p className="text-center">
                      {/* Aucun compte ? <a href="/sign-up" style={{ color: "#0A0A6B" }}>Créez one!</a> */}
                      Aucun compte ? <a href="/compte" style={{ color: "#0A0A6B" }}>Créez one!</a> 
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

export default SignInForm;
