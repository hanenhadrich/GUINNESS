import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogin } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) navigate('/compte');
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestLogin({ email, password }));
  };

  return (
    <main>
      <section className="sign-in-form section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto col-12">
              <h1 className="hero-title text-center mb-5 fw-bold">Sign In</h1>
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
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label>Password</label>
                  </div>
                  <button type="submit" className="custom-btn mt-4 mb-4" disabled={isLoading}>
                    {isLoading ? 'Connexion...' : 'Se connecter'}
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
