import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import * as AiIcons from "react-icons/ai";

const rotateSmall = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
`;

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
    background: #15171c;
    cursor: pointer;
  }

  &:hover .icon {
    animation: ${rotateSmall} 0.6s ease-in-out;
  }
`;

const SubMenu = ({ item, toggleSidebar }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to={item.path || "#"} onClick={item.subNav ? showSubnav : toggleSidebar}>
        <IconWrapper>
          <div className="icon">{item.icon}</div>
          <SidebarLabel>{item.title}</SidebarLabel>
        </IconWrapper>
        <div className="icon">
          {item.subNav && (subnav ? item.iconOpened : item.iconClosed)}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((subItem, index) => (
          <DropdownLink to={subItem.path} key={index} onClick={toggleSidebar}>
            <div className="icon">{subItem.icon}</div>
            <SidebarLabel>{subItem.title}</SidebarLabel>
          </DropdownLink>
        ))}
    </>
  );
};

export default SubMenu;
