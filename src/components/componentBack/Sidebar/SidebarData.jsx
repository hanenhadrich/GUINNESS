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
        path: "/adherents",
        icon: <FaIcons.FaAddressCard />,
         
    },
    {
        title: "Abonnements",
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
        title: "Reclamations",
        path: "/reclamations",
        icon: <IoIcons.IoMdHelpCircle />,
    },      
    {
        title: "Profile",
        path: "/test-modal",
        icon: <FaIcons.FaUserCircle />,
    },
    {
        title: "Deconnexion",
        path: "/logout",
        icon: <FaIcons.FaTimes />,
    },
    
];

export default SidebarData;