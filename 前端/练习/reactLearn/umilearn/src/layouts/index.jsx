import React from "react";
import { NavLink } from "umi";
import './index.less'
export default function index(props) {
  console.log("🚀 ~ file: index.jsx ~ line 4 ~ index ~ props", props)
  return (
    <div>
      <NavLink to="/">首页</NavLink>
      <NavLink to="/login">登陆页</NavLink>
      <NavLink to="/welcome">欢迎页</NavLink>
      <NavLink to="/counter">计数器</NavLink>

      {props.children}
    </div>
  );
}
