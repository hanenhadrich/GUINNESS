import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogin } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Écoute la réponse du backend
  useEffect(() => {
    const customMessage = localStorage.getItem('loginMessage');
    if (isAuthenticated && user && customMessage) {
      Swal.fire({
        title: customMessage,
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
      });
      localStorage.removeItem('loginMessage');
      navigate('/compte');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(requestLogin({ email, password }));

    if (requestLogin.fulfilled.match(resultAction)) {
      const messageFromBackend = resultAction.payload.message;
      localStorage.setItem('loginMessage', messageFromBackend);
    } else {
      Swal.fire({
        title: 'Erreur',
        text: 'Email ou mot de passe incorrect.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <main>
      <section className="sign-in-form section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto col-12">
              <h1 className="hero-title text-center mb-5 fw-bold">Connexion</h1>
              <div className="col-lg-8 col-11 mx-auto">
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-4 p-0">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label>Email</label>
                  </div>
                  <div className="form-floating p-0">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label>Mot de passe</label>
                  </div>
                  <button type="submit" className="custom-btn mt-4 mb-4" disabled={isLoading}>
                    {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                  </button>
                  <p className="text-center">
                    Pas encore de compte ? <a href="/sign-up">Créez-en un !</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignInForm;
