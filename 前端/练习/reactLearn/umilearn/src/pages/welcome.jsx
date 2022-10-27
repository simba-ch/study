/** 
* title: 首页
*/
import React, { useEffect } from "react";
import { useHistory } from "umi";
export default function welcome() {
  const history = useHistory();
  const userName = localStorage.getItem("userName");
  console.log("🚀 ~ file: welcome.jsx ~ line 6 ~ welcome ~ userName", userName);
  function logout() {
    console.log("======");
    localStorage.removeItem("userName");
    history.push("/login");
  }
  useEffect(() => {
    if (!userName) {
      history.push("/login");
      return;
    }
  });

  return (
    <div>
      <h1>欢迎{userName}</h1>
      <button
        onClick={() => {
          logout();
        }}
      >
        注销
      </button>
    </div>
  );
}
