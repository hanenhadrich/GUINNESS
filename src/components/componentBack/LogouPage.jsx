import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice'; // Ton action logout Redux
import { useNavigate } from 'react-router-dom';

const LogouPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Déconnexion',
      text: "Voulez-vous vraiment vous déconnecter ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, déconnecter',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout()); // Ton action logout Redux
        Swal.fire({
          title: 'Déconnecté',
          text: 'Vous avez été déconnecté avec succès.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
        navigate('/sign-in'); // Rediriger vers page connexion
      }
    });
  };

  return handleLogout;
};

export default LogouPage;
