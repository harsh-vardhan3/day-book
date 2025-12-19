import { Link } from "react-router-dom";
import { FaHome, FaBookOpen, FaInfo, FaChartBar, FaUserFriends, FaCalendarAlt } from "react-icons/fa";

const NavLinks = ({ toggle }) => {
  return (
    <>
      <li onClick={toggle} className="tooltip tooltip-bottom" data-tip="Home">
        <Link to="/" className="flex items-center justify-center">
          <FaHome size={20} />
        </Link>
      </li>
      <li onClick={toggle} className="tooltip tooltip-bottom" data-tip="Your Entries">
        <Link to="/entries" className="flex items-center justify-center">
          <FaBookOpen size={20} />
        </Link>
      </li>
      <li onClick={toggle} className="tooltip tooltip-bottom" data-tip="Shared With Me">
        <Link to="/shared" className="flex items-center justify-center">
          <FaUserFriends size={20} />
        </Link>
      </li>
      <li onClick={toggle} className="tooltip tooltip-bottom" data-tip="Mood Analytics">
        <Link to="/analytics" className="flex items-center justify-center">
          <FaChartBar size={20} />
        </Link>
      </li>
      <li onClick={toggle} className="tooltip tooltip-bottom" data-tip="Calendar">
        <Link to="/calendar" className="flex items-center justify-center">
          <FaCalendarAlt size={20} />
        </Link>
      </li>
      <li onClick={toggle} className="tooltip tooltip-bottom" data-tip="About">
        <Link to="/about" className="flex items-center justify-center">
          <FaInfo size={20} />
        </Link>
      </li>
    </>
  );
};
export default NavLinks;
