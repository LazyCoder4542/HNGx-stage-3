import { User, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

// import Search from "./mini/Search";
// import { ReactComponent as HomeIcon } from "../assets/icons/Home.svg";
import { ReactComponent as AvatarIcon } from "../assets/icons/avatar.svg";
import { ReactComponent as LogoutIcon } from "../assets/icons/Logout.svg";
import logo from "./../assets/images/logo.png"

import style from "./Header.module.css";
import { Link } from "react-router-dom";
import { IPopupContext, usePopup } from "./mini/popupContext";

function Header() {
  const navigate = useNavigate()
  const user = auth.currentUser as User
  const {triggerPopup} = usePopup() as IPopupContext
  return (
    <>
      <header id={style["site-header"]}>
        <Link to="/">
        <div className={style.icon}>
          <img src={logo} alt="anichive" />
          <span style={{ fontFamily: "chilanka", fontWeight: 700 }}>
            <span>ANI</span><span>CHIVE</span>
          </span>
        </div>
        </Link>
        {/* <Search/> */}

        {!auth.currentUser ? (
          <Link to={"/login"}>
            <button className="btn btn-secondary rounded">Log in</button>
          </Link>
        ) : (
          <div className={style.user}>
            {
              user.photoURL ? 
              <img src={`/images` + user.photoURL} alt="" /> :
              <span className="svg-wrapper">
                <AvatarIcon />
              </span>

            }
            <p>Hello, {user.displayName}</p>
            <button
              className={"btn btn-secondary rounded " + style.logout}
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    navigate("/landing");
                    triggerPopup("Signed out successfully", "success")
                  })
                  .catch((error) => {
                    triggerPopup("An error occurred", "error")
                  });
              }}
            >
              <span className="svg-wrapper">
                <LogoutIcon />
              </span>
              Log out
            </button>
          </div>
        )}

        {/* <div className={style.menu}>
                    <span>
                        
                    </span>
                </div> */}
      </header>
    </>
  );
}

export default Header;
