//This page is responsible for the first page that user see when he types the site
import React from "react";

const HomePage = ({ history }) => {
  return (
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container" style={{ height: "100vh" }}>
          <h1 className="ui inverted stackable header">
            <img
              className="ui image massive"
              src="/assets/logo.png"
              alt="logo"
            />
            <div className="content">PCology</div>
          </h1>
          <h2 className="ccontent">Η "επιστημονική" πλευρά των υπολογιστών</h2>
          <div
            onClick={() => history.push("/events")}
            className="ui huge white inverted button"
          >
            Ξεκινάμε
            <i className="right arrow icon" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
