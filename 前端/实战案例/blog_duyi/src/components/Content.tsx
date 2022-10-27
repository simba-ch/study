
import { connect } from "react-redux";
import { Provider } from "react-redux";
import store from "../redux";

function Content(props: any) {
  console.log("🚀 ~ file: Content.tsx ~ line 6 ~ Content ~ props", props)
  return props.children
}

function MapStateToProps(state: any) {

}

export default <Provider store={store}>
  {connect(MapStateToProps)(Content)}
</Provider>

