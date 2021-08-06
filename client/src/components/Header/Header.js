import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, setCartCount } from "../../features/cartCountSlice";
import "./header.css";
import { Link } from "react-router-dom";
import appleLogo from "./apple-white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Header = (props) => {
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();

  const showSidebar = () => {
    const sidebar = document.getElementsByClassName("sidebar")[0];
    const sidebarContent =
      document.getElementsByClassName("sidebar-content")[0];
    sidebar.style.width = "50vw";
    sidebarContent.style.display = "flex";
  };
  const hideSidebar = () => {
    const sidebar = document.getElementsByClassName("sidebar")[0];
    const sidebarContent =
      document.getElementsByClassName("sidebar-content")[0];
    sidebar.style.width = "0";
    sidebarContent.style.display = "none";
  };
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    props.setAuth(false);
    toast.success("You logged out successfully");
    hideSidebar();
    dispatch(setCartCount(0));
  };

  return (
    <>
      <div className='header'>
        <li className='header-list'>
          <Link to='/'>
            <img src={appleLogo} alt='' className='logo' />
          </Link>
          <Link to='/iphone'>
            <ul>iPhone</ul>
          </Link>
          <Link to='/ipad'>
            <ul>iPad</ul>
          </Link>
          <Link to='/mac'>
            <ul>MacBook</ul>
          </Link>
          {!props.isAuthenticated ? (
            <Link to='/login'>
              <ul>Login</ul>
            </Link>
          ) : (
            <ul onClick={logout}>Logout</ul>
          )}
          <Link to='/cart'>
            <ul>Cart ({cartCount})</ul>
          </Link>
        </li>
      </div>
      <div className='mobile-header'>
        <div className='mobile-header-list'>
          <Link to='/'>
            <img
              src={appleLogo}
              alt=''
              className='logo'
              onClick={hideSidebar}
            />
          </Link>
          <FontAwesomeIcon
            icon={faBars}
            className='fa-bars'
            onClick={showSidebar}
          />
        </div>
      </div>
      <div className='sidebar'>
        <div className='sidebar-content'>
          <Link to='/iphone'>
            <p onClick={hideSidebar}>iPhone</p>
          </Link>
          <Link to='/ipad'>
            <p onClick={hideSidebar}>iPad</p>
          </Link>
          <Link to='/mac'>
            <p onClick={hideSidebar}>MacBook</p>
          </Link>
          <Link to='/cart'>
            <p onClick={hideSidebar}>Cart ({cartCount})</p>
          </Link>
          {!props.isAuthenticated ? (
            <Link to='/login'>
              <p onClick={hideSidebar}>Login</p>
            </Link>
          ) : null}
          {!props.isAuthenticated ? (
            <Link to='/register'>
              <p onClick={hideSidebar}>Register</p>
            </Link>
          ) : null}
          {props.isAuthenticated ? (
            <p onClick={logout} className='logout-link'>
              Logout
            </p>
          ) : null}
          <FontAwesomeIcon
            icon={faTimesCircle}
            className='fa-times-circle'
            onClick={hideSidebar}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
