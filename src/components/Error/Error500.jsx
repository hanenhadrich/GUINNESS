
import { Link } from 'react-router-dom';
import "../../css/styles.css";

export default function Error500() {
  return (
    <div id="layoutError">
        <div id="layoutError_content">
            <main>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <div class="text-center mt-4">
                            <img class="mb-4 img-error" src="assets/img/error-500.jpg" />
                                <h1 class="display-1">500</h1>
                                <p class="lead">Internal Server Error</p>
                                <a href="index.html">
                                    <i class="fas fa-arrow-left me-1"></i>
                                    Return to Dashboard
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        <div id="layoutError_footer">
        <footer className="py-4 bg-light mt-auto">
          <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between small">
            <div className="text-muted">Copyright &copy; Hanen Riguen 2025</div>
              <div>
                <a href="#">Privacy Policy</a>
                &middot;
                <a href="#">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
