
import React from "react";
import { CheckCheck } from "lucide-react";

export default function UserDashboard() {
  return (
    <main className="container-fluid px-4 py-4">
      <div className="card shadow-sm p-4">
        <ol className="breadcrumb mb-3">
          <li className="breadcrumb-item active">
            <h2 className="d-flex align-items-center">
              <CheckCheck className="me-2" size={32} color="#28a745" />
              Dashboard
            </h2>
          </li>
        </ol>

        <div className="mt-3 text-center">
          <h3 className="fw-bold mb-3">Bienvenue dans Guinness Co-working Space 🎉</h3>
          <p className="lead">
            Nous sommes ravis de vous revoir sur votre espace utilisateur.
          </p>
        </div>
      </div>
    </main>
  );
}
