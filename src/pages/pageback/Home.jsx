import React from 'react';
import '../../css/index.css';
import DashboardLayout from '../../layouts/DashboardLayout';

import TodoList from '../../components/componentBack/TodoList';
import ReservationsList from '../../components/componentBack/ReservationsList';
import Statistique from '../../components/componentBack/Statistique'; 
import ErrorBoundary from '../../components/componentBack/ErrorBoundary';
import { ChartSpline, CheckCheck, FilePenLine } from 'lucide-react';

export default function Home() {
  return (
    <DashboardLayout>
      
      <ol className="breadcrumb mb-2 ms-1 fs-2">
        <li className="breadcrumb-item active">
          <CheckCheck className="me-2 fs-1" />
          Dashboard
        </li>
      </ol>
      <ol className="breadcrumb mb-4 ms-3">
        <li className="breadcrumb-item active">
          <FilePenLine className="me-2" size={18} />
          To-Do List & Réservations
        </li>
      </ol>

      <ErrorBoundary>
        <div className="card shadow-lg mb-4">
          <div className="card-body">
            <div className="row">
              <TodoList />
              <ReservationsList />
            </div>
          </div>
        </div>
      </ErrorBoundary>

      <ol className="breadcrumb mb-4 ms-3">
        <li className="breadcrumb-item active">
          <ChartSpline className="me-2" size={18} />
          Statistiques
        </li>
      </ol>

      <div className="card shadow-lg mb-4">
        <div className="card-body">
          <Statistique />
        </div>
      </div>
    </DashboardLayout>
  );
}
