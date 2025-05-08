

import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

const SidebarData = [
    {
        title: "Dashboard",
        path: "/compte",
        icon: <AiIcons.AiFillHome />
    },
    {
        title: "Adhérents",
        path: "/adherent",
        icon: <FaIcons.FaUserCircle />,
    },
    {
        title: "Abonnement",
        icon: <FaIcons.FaBookOpen />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: "Semaine",
                path: "/abonnement/semaine",
                icon: <FaIcons.FaAngleRight/>,
            },
            {
                title: "Mois",
                path: "/abonnement/mois",
                icon: <FaIcons.FaAngleRight />,
            },{
                title: "Autre",
                path: "/abonnement/autre",
                icon: <FaIcons.FaAngleRight/>,
            },
        ],
    },       
    {
        title: "Support",
        path: "/support",
        icon: <IoIcons.IoMdHelpCircle />,
    },
    {
        title: "Deconnexion",
        path: "/deconnect",
        icon: <FaIcons.FaTimes />,
    },
    
];

export default SidebarData;