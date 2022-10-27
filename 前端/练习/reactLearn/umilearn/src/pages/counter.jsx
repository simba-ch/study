import React from "react";
import { connect } from "umi";
function counter(props) {
  console.log("🚀 ~ file: counter.jsx ~ line 4 ~ counter ~ props", props);
  return (
    <div>
      <p>{props.counte}</p>
      <button onClick={props.onIncrease}> 加1</button>
      <button onClick={props.onDecrease}>减1</button>
    </div>
  );
}

function mapState(state) {
  return {
    counte: state.counter,
  };
}

function mapProps(dispatch) {
  return {
    onIncrease() {
      dispatch({ type: "counter/increase" });
    },
    onDecrease() {
      dispatch({ type: "counter/decrease" });
    },
  };
}
export default connect(mapState, mapProps)(counter);
