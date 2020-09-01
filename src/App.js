import React, { useState } from "react";
import Login from "./components/login";
import Reg from "./components/reg";
import Header from "./components/header";
import "./components/xtra.css";
function App() {
  const [islogin, setAction] = useState(true); // to know which page between login and register should be shown, true: login page ; false: reg page
  const [done_register, setregister] = useState(false); // to set once registration is complete
  //loggedIn : checks if anyone is logged in, false will show login page, true will show login success message
  //luser,lpass are used to store the username and password when user enters to login
  //matched: to check if the username user enters to login exist in the object
  const [others, setOthers] = useState({
    loggedIn: false,
    luser: "",
    lpass: "",
    matched: false,
  });
  //usernames and hashed passwords
  const [users, setusers] = useState({
    admin: "sha1$d75fb41e$1$065fbc44548f69fac3b09a741350e8314e0a9f24",
    tan: "sha1$370b7584$1$6e5bfcee82fe2f05474b30fb890e5763d0a6f2bb",
    arvndvv: "sha1$30142305$1$112c97db7086b019f1ef88941397eb7470be9c58",
    cos: "sha1$7db6da87$1$61e96eec1cad4369d7a90c101d324226292b783f",
    b374: "sha1$6a94cd4a$1$fddb8b78f4b48cd74c8fc046ea2b17fb3e6f2ca0",
  });
  //localstorage
  // not implemented
  //---------------

  return (
    <div className="App container-fluid bg-aqua">
      <Header />
      {islogin ? (
        <Login
          setregister={setregister}
          setAction={setAction}
          users={users}
          others={others}
          setOthers={setOthers}
        />
      ) : (
        <Reg
          setAction={setAction}
          done_register={done_register}
          setregister={setregister}
          users={users}
          setusers={setusers}
        />
      )}
    </div>
  );
}

export default App;
