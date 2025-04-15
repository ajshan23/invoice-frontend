import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import logoSm from "@/assets/images/logo-sm.png";
import logoDark from "@/assets/images/logo-dark.png";

const LogoBox = ({ lightMode = false }) => {
  return (
    <div className="logo-box">
      {lightMode ? (
        <Link to="/" className="logo">
          <span className="logo-lg">
            <img src={logo} className="h-8 w-auto" alt="logo" />
          </span>
          <span className="logo-sm">
            <img src={logoSm} className="h-8 w-auto" alt="small logo" />
          </span>
        </Link>
      ) : (
        <Link to="/" className="logo">
          <span className="logo-lg">
            <img src={logoDark} alt="dark logo" className="h-8 w-auto" />
          </span>
          <span className="logo-sm">
            <img src={logoSm} alt="small logo" className="h-8 w-auto" />
          </span>
        </Link>
      )}
    </div>
  );
};

export default LogoBox;
