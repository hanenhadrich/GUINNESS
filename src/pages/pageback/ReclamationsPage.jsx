
import ReclamationList from "../../components/componentBack/ReclamationList";
import { CircleHelp } from "lucide-react";
const ReclamationsPage = () => {
  return (
    <div className="container mt-2">
      <div className="card shadow-lg p-1 mb-5 bg-white rounded">
        <div className="card-body">
          <div className="d-flex align-items-center mb-4">
            
            <CircleHelp size={30} color="#dc3545" className="me-2 text-primary" />
            <h2 className="m-0">Réclamations</h2>
          </div>

          <ReclamationList />
        </div>
      </div>
    </div>
  );
};

export default ReclamationsPage;
