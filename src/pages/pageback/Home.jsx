
import '../../css/index.css';
import { CheckCheck, FilePenLine, ChartSpline } from 'lucide-react';

import TodoList from '../../components/componentBack/TodoList';
import ReservationsList from '../../components/componentBack/ReservationsList';
import Statistique from '../../components/componentBack/Statistique'; 
import ErrorBoundary from '../../components/componentBack/ErrorBoundary';

export default function Home() {
  return (
    <main className="container-fluid px-4" style={{ margin: '10px' }}>
      

      <ErrorBoundary>
        <div className="card shadow-lg mb-4" style={{ marginLeft: '40px', marginRight: '40px' }}>
          <div className="card-body" style={{ paddingLeft: '40px', paddingRight: '40px' }}>
            <ol className="breadcrumb mb-2 ms-1 fs-2">
              <li className="breadcrumb-item active">
                <h2><CheckCheck className=" me-2 fs-1" />
                Dashboard</h2>
              </li>
            </ol>
            <ol className="breadcrumb mb-4 ms-4">
              <li className="breadcrumb-item active">
                <h5><FilePenLine className="me-2" size={18} />
                To-Do List & Réservations</h5>
              </li>
            </ol>

            <div className="row">
              <TodoList />
              <ReservationsList />
            </div>

            <hr className="my-4" />

            <ol className="breadcrumb mb-4 ms-4">
              <li className="breadcrumb-item active">
                <h5><ChartSpline className="me-2" size={18} />
                Statistiques</h5>
              </li>
            </ol>

            <Statistique />
          </div>
        </div>
      </ErrorBoundary>
    </main>
  );
}
