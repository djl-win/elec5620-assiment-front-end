import React from "react";
import ExploreSlide from "../../component/ExploreSlider";
import ExploreBody from "../../component/ExporeBody";

class Explore extends React.Component {
  render() {
    return (
      <div>
        <div>
        <ExploreSlide/>
        </div>
        <div>
        <ExploreBody />
        </div>
      </div>
    );
  }
};

export default Explore;