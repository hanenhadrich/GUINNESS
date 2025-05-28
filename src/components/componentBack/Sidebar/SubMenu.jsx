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
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #0A0A6B;
    cursor: pointer;
  }

  &:hover .icon {
    transform: scale(1.2) translateX(5px);
    animation: ${rotateSmall} 0.6s ease-in-out;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  transition: transform 0.3s ease;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 50px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 16px;

  &:hover {
    background: #414757;
    cursor: pointer;
  }

  &:hover .icon {
    transform: scale(1.2) translateX(5px);
    animation: ${rotateSmall} 0.6s ease-in-out;
  }
`;

const SubMenu = ({ item, toggleSidebar }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <IconWrapper className="icon">{item.icon}</IconWrapper>
        <SidebarLabel>{item.title}</SidebarLabel>
        <div>
          {item.subNav && subnav ? (
            <AiIcons.AiOutlineDown />
          ) : item.subNav ? (
            <AiIcons.AiOutlineRight />
          ) : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((subItem, index) => (
          <DropdownLink to={subItem.path} key={index} onClick={toggleSidebar}>
            <IconWrapper className="icon">{subItem.icon}</IconWrapper>
            <SidebarLabel>{subItem.title}</SidebarLabel>
          </DropdownLink>
        ))}
    </>
  );
};

export default SubMenu;
