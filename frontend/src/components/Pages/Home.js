import React from "react";
import sfImage from "../Superfluid-logo.jpeg"

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  image: {
    width: "400px",
    marginTop: "20px",
  },
  title: {
    fontSize: "48px"
  }
};

export const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to <b>Subs</b></h1>
      <p>
      <b>Subs</b> is a subscription system which is developed with tradeable cashflow
        contract powered by Superfluid
      </p>
      <img
        src={sfImage}
        style={styles.image}
      />
    </div>
  );
};


