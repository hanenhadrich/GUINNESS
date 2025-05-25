import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/authSlice";

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    background: #252831;
    border-left: 4px solid #0a0a6b;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #252831;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 16px;

  &:hover {
    background: #1f1f2e;
    cursor: pointer;
  }
`;

const LogoutButton = styled.div`
  display: flex;
  color: #e1e9fc;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: #252831;
    border-left: 4px solid #0a0a6b;
  }
`;

const SubMenu = ({ item, toggleSidebar }) => {
  const [subnav, setSubnav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showSubnav = () => setSubnav(!subnav);

  const handleLogout = () => {
    toggleSidebar(); // Ferme le menu
    dispatch(logout());
    navigate("/home");
  };

  // Si c'est le bouton de déconnexion
  if (item.title === "Deconnexion") {
    return (
      <LogoutButton onClick={handleLogout}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
      </LogoutButton>
    );
  }

  return (
    <>
      <SidebarLink
        to={item.path}
        onClick={(e) => {
          if (item.subNav) {
            e.preventDefault(); // Ne pas naviguer si sous-menu
            showSubnav(); // Toggle sous-menu
          } else {
            toggleSidebar(); // Ferme le sidebar si lien simple
          }
        }}
      >
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>

      {subnav &&
        item.subNav.map((subItem, index) => (
          <DropdownLink
            to={subItem.path}
            key={index}
            onClick={toggleSidebar} // Ferme le menu au clic sur un sous-lien
          >
            {subItem.icon}
            <SidebarLabel>{subItem.title}</SidebarLabel>
          </DropdownLink>
        ))}
    </>
  );
};

export default SubMenu;
