import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import SidebarData from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { IconEffectWrapper } from "./IconEffectWrapper";

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const NavIcon = styled(Link)`
  font-size: 1rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ $sidebar }) => ($sidebar ? "0" : "-100%")};
  transition: left 350ms ease-in-out;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(true);
  const hideSidebar = () => setSidebar(false);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <IconEffectWrapper>
              <FaIcons.FaBars onClick={showSidebar} />
            </IconEffectWrapper>
          </NavIcon>

          <Link
            className="navbar-brand d-flex align-items-center"
            to="/"
            style={{ fontSize: "14px", color: "white" }}
          >
            <img
              src="/assets/img/GN-Photoroom.png"
              alt="Guinness Co-working Space"
              style={{ height: "40px", borderRadius: "50%" }}
            />
            <div className="d-flex flex-column ms-2">
              <span style={{ fontWeight: "bold", textAlign: "center" }}>
                GUINNESS
              </span>
              <span style={{ fontSize: "12px" }}>CO-WORKING SPACE</span>
            </div>
          </Link>
        </Nav>

        <SidebarNav $sidebar={sidebar} onMouseLeave={hideSidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <IconEffectWrapper>
                <AiIcons.AiOutlineClose onClick={hideSidebar} />
              </IconEffectWrapper>
            </NavIcon>

            {SidebarData.map((item, index) =>
              item.title !== "Deconnexion" ? (
                <SubMenu item={item} key={index} toggleSidebar={hideSidebar} />
              ) : null
            )}

            <div style={{ marginTop: "auto" }}>
              {SidebarData.map((item, index) =>
                item.title === "Deconnexion" ? (
                  <SubMenu item={item} key={index} toggleSidebar={hideSidebar} />
                ) : null
              )}
            </div>
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
