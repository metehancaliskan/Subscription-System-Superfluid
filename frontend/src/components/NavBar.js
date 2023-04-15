import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const [click, setClick] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const handleClick = () => setClick(!click);

  //Connect the client ( netflix's) wallet here. setWalletConnected to true.
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      });
      console.log("Connected", accounts[0]);
      currentAccount = setCurrentAccount(accounts[0]);
      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      // setupEventListener()
    } catch (error) {
      console.log(error);
    }

    setWalletConnected(true);

  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            CodeBucks
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/market"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Market
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/subscriber"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Subscriber
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/provider"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Provider
              </NavLink>
            </li>
            <li className="nav-item">
        <button id="connectWallet" className="button" onClick={connectWallet}>
          {walletConnected ? `${currentAccount.substring(0, 4)}...${currentAccount.substring(
            38
          )}` : "Connect Wallet"}
        </button>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
