import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';

// Animation pour les icônes
const rotateSmall = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
`;

// Styled Components
const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  height: 60px;
  color: #e1e9fc;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #15171c;
    border-left: 4px solid #0A0A6B;
    cursor: pointer;
  }

  &:hover .icon {
    animation: ${rotateSmall} 0.6s ease-in-out;
  }
`;

const DropdownLink = styled(Link)`
  background: #15171c;
  height: 50px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 16px;

  &:hover {
    background: #1d1f25;
    cursor: pointer;
  }

  &:hover .icon {
    animation: ${rotateSmall} 0.6s ease-in-out;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const DropdownContainer = styled.div`
  overflow: hidden;
  transition: max-height 0.8s ease, opacity 0.4s ease;
  max-height: ${({ $expanded }) => ($expanded ? '500px' : '0')};
  opacity: ${({ $expanded }) => ($expanded ? '1' : '0')};
`;

const SubMenu = ({ item, toggleSidebar }) => {
  const [subnav, setSubnav] = useState(false);
  const navigate = useNavigate();

  const showSubnav = () => setSubnav(!subnav);

  const handleLogout = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: 'Voulez-vous vous déconnecter ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, déconnecter',
      cancelButtonText: 'Annuler'
    });

    if (result.isConfirmed) {
      localStorage.clear();
      navigate('/sign-in');
    }
  };

  const isLogout = item.title === 'Deconnexion';

  return (
    <>
      <SidebarLink
        to={item.path || "#"}
        onClick={isLogout ? handleLogout : (item.subNav ? showSubnav : toggleSidebar)}
      >
        <IconWrapper>
          <div className="icon">{item.icon}</div>
          <SidebarLabel>{item.title}</SidebarLabel>
        </IconWrapper>
        <div className="icon">
          {item.subNav && (subnav ? item.iconOpened : item.iconClosed)}
        </div>
      </SidebarLink>

      {item.subNav && (
        <DropdownContainer $expanded={subnav}>
          {item.subNav.map((subItem, index) => (
            <DropdownLink to={subItem.path} key={index} onClick={toggleSidebar}>
              <div className="icon">{subItem.icon}</div>
              <SidebarLabel>{subItem.title}</SidebarLabel>
            </DropdownLink>
          ))}
        </DropdownContainer>
      )}
    </>
  );
};

export default SubMenu;
