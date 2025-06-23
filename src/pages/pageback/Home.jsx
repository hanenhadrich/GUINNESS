import '../../css/index.css';
import { CheckCheck, FilePenLine, ChartSpline } from 'lucide-react';

import TodoList from '../../components/componentBack/TodoList';
import ReservationsList from '../../components/componentBack/ReservationsList';
import Statistique from '../../components/componentBack/Statistique';
import ErrorBoundary from '../../components/componentBack/ErrorBoundary';
import SubscriptionCalendarView from '../../components/componentBack/SubscriptionCalendarView';

export default function Home() {
  return (
    <main className="container-fluid px-1">
      <ErrorBoundary>
        <div className="card shadow-lg mb-4 mx-md-5 mx-0">
          <div className="card-body px-md-5 px-3">
            <ol className="breadcrumb mb-2 ms-1 fs-2">
              <li className="breadcrumb-item active">
                <h2 className="d-flex align-items-center">
                  <CheckCheck className="me-2 fs-1" />
                  Dashboard
                </h2>
              </li>
            </ol>

            <ol className="breadcrumb mb-4 ms-3">
              <li className="breadcrumb-item active">
                <h5 className="d-flex align-items-center">
                  <FilePenLine className="me-2" size={18} />
                  To-Do List & Réservations
                </h5>
              </li>
            </ol>
            <ol><SubscriptionCalendarView/></ol>
            <div className="row">
              
                <TodoList />
              
              
                <ReservationsList />
              
            </div>

            <hr className="my-4" />

            <ol className="breadcrumb mb-4 ms-3">
              <li className="breadcrumb-item active">
                <h5 className="d-flex align-items-center">
                  <ChartSpline className="me-2" size={18} />
                  Statistiques
                </h5>
              </li>
            </ol>

            <Statistique />
          </div>
        </div>
      </ErrorBoundary>
    </main>
  );
}
