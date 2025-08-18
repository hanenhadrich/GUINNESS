import React from "react"; 
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";

const SidebarData = [
    {
        title: "Dashboard",
        path: "/compte",
        icon: <RiIcons.RiDashboardFill />,
    },
    {
        title: "Adhérents",
        path: "/adherents",
       icon: <FaIcons.FaUsers />,
         
    },
    {
        title: "Abonnements",
        icon: <FaIcons.FaBookOpen />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            { title: "Semaine", path: "/abonnement/semaine", icon: <FaIcons.FaAngleRight /> },
            { title: "Mois", path: "/abonnement/mois", icon: <FaIcons.FaAngleRight /> },
            { title: "Autre", path: "/abonnement/autre", icon: <FaIcons.FaAngleRight /> },
               ],
    }, 
     {
        title: "Reclamations",
        path: "/reclamations",
        icon: <MdIcons.MdReportProblem />,
    },      
    {
        title: "Profile",
        path: "/profile",
        icon: <AiIcons.AiOutlineUser />,
      },      
    {
        title: "Deconnexion",
        path: "/logout",
        icon: <RiIcons.RiLogoutBoxRLine />,
    },
    
];

export default SidebarData;