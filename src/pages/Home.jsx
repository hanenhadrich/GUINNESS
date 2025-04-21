import React from 'react';
import '../css/index.css';
import Footer from '../components/Footer';
import TodoList from '../components/TodoList';
import ReservationsList from '../components/ReservationsList';
import Statistique from '../components/Statistique'; 
import ErrorBoundary from '../components/ErrorBoundary';
import { CalendarCheck, FileChartLine, FilePenLine } from 'lucide-react';
export default function Home() {
  return (
    <main className="container-fluid px-4">
      <h1 className="mt-4">Dashboard</h1>
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
          <FileChartLine className="me-2" size={18} />
          Statistiques
        </li>
      </ol>
      <div className="card shadow-lg mb-4">
        <div className="card-body">
          <Statistique />
        </div>
      </div>
      <Footer /> 
    </main>
  );
}
