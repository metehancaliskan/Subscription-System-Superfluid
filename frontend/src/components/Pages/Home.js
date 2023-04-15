import React from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  image: {
    maxWidth: "100px",
    marginTop: "20px",
  },
};

export const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to Subs</h1>
      <p>
        Subs is a subscription system which is developed with tradeable cashflow
        contract powered by Superfluid
      </p>
      <img
        src="https://www.google.com/url?https://github.com/superfluid-finance/protocol-monorepo/blob/HEAD/sf-logo.png=i&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40superfluid-finance%2Fsdk-core%2Fv%2F0.3.1-dev.9212d2a.0&psig=AOvVaw24uGic3qQKALZOfnoHDGun&ust=1681637857269000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOC-lKvLq_4CFQAAAAAdAAAAABAE"
        style={styles.image}
      />
    </div>
  );
};


