import React, { useRef, useEffect } from "react";
import { history } from "umi";
import { useHistory } from "umi";
export default function login() {
  useEffect(() => {
    if (localStorage.getItem("userName")) history.push("/welcome");
    return;
  });

  const history = useHistory();
  const account = useRef();
  const password = useRef();
  function login() {
    if (
      account.current.value === "admin" &&
      password.current.value === "123123"
    ) {
      localStorage.setItem("userName", account.current.value);
      history.push("/welcome");
    } else {
      alert("账号或密码错误");
    }
  }
  return (
    <div>
      <p>
        账号： <input type="text" ref={account} />
      </p>
      <p>
        密码： <input type="password" ref={password} />
      </p>
      <button
        onClick={() => {
          login();
        }}
      >
        登陆
      </button>
    </div>
  );
}
