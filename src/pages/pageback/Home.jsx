import '../../css/index.css';
import { CheckCheck, FilePenLine, ChartSpline } from 'lucide-react';

import TodoList from '../../components/componentBack/Home/TodoList';
import ReservationsList from '../../components/componentBack/Home/ReservationsList';
import Statistique from '../../components/componentBack/Home/Statistique';
import ErrorBoundary from '../../components/ErrorBoundary';
import SubscriptionCalendarView from '../../components/componentBack/Home/SubscriptionCalendarView';
import { fetchSubscriptions, selectSubscriptions } from "../../store/subscriptionSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
export default function Home() {
  const dispatch = useDispatch(); // <-- Ajouté ici
  const subscriptions = useSelector(selectSubscriptions);

  useEffect(() => {
    dispatch(fetchSubscriptions()); // <-- dispatch défini
  }, [dispatch]);

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
            <div className="my-4">
              <SubscriptionCalendarView subscriptions={subscriptions} />
            </div>
            <hr className="my-4" />
            <ol className="breadcrumb mb-4 ms-3">
              <li className="breadcrumb-item active">
                <h5 className="d-flex align-items-center">
                  <FilePenLine className="me-2" size={18} />
                  To-Do & Réservations
                </h5>
              </li>
            </ol>
            <div className="card shadow-sm border-0 rounded-3 p-3">
              <div className="row ms-3 ">
                <TodoList />
                <ReservationsList />
              </div>
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
