import React, { useState, useEffect } from "react";
var passwordhash = require("password-hash");
const Login = ({ setregister, setAction, users, others, setOthers }) => {
  //taking all the keys from object users and forming list of usernames
  let usernames = Object.keys(users);
  //function to handle when username is typed
  const myUsernameHandler = (e) => {
    //updates key 'luser' in 'others' object to value typed by user
    // updates 'matched' in 'others' to false everytime user types new character or removes one
    setOthers({ ...others, luser: e.target.value, matched: false });
  };
  //function to carry out if there is change in value of luser
  useEffect(() => {
    //takes all the items in 'usernames' object and compare it with the luser
    // if a match is found, changes 'matched' to true
    usernames.map((u) => {
      if (!others.matched) {
        if (u === others.luser) {
          setOthers({ ...others, matched: !others.matched });

          //console.log(submit);
        }
      }
      return 0;
    });
  }, [others, usernames, setOthers]);
  //handles password changes, updates the value to 'lpass' key in  'others' object
  const myPassHandler = (e) => {
        updaterror(" ");
    
    setOthers({ ...others, lpass: e.target.value });
  };
  //handles the submit button (login button)
  const mySubmitHandler = (e) => {
    e.preventDefault();
    //console.log(e);
    if (others.lpass !== "") {
      let user = others.luser;

      let pass = others.lpass;

      //if (users[user] === pass)
      //use password hash verify function to compare the input and stored hashed pass
      //generates a boolean
      if (passwordhash.verify(pass, users[user])) {
        setOthers({ ...others, loggedIn: true });
      } else {
        updaterror("Password incorrect!");
      }
    }
  };
  //performs when register is clicked
  const gotoRegister = () => {
    setregister(false);
    setAction(false);
  };
  //logout
  const logout = () => {
    setOthers({ loggedIn: false, luser: "", lpass: "", matched: false });
  };
  //error messages
  const [error, updaterror] = useState("");
  return (
    <form onSubmit={mySubmitHandler} className="text-center my-5">
      {others.loggedIn ? (
        <React.Fragment>
          <p>You have successfully loggedIn.</p>
          <p>
            Welcome,{" "}
            <span className="text-success text-capitalize">{others.luser}</span>
          </p>
          <button className="btn btn-outline-primary" onClick={logout}>
            Logout
          </button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h6>
            Type in the username, if user exist you can login, else register!
          </h6>
          <h2 className="heading">Login</h2>
          <input
            type="text"
            onChange={myUsernameHandler}
            placeholder="Username"
            value={others.luser}
            className="mx-auto  border-primary rounded d-block mb-2 py-2 mt-5"
          />
          <input
            type="password"
            onChange={myPassHandler}
            placeholder="Password"
            value={others.lpass}
            className="mx-auto  border-2 d-block border-primary rounded mb-2 py-2"
          />
          <React.Fragment>
            {others.matched ? (
              <input
                type="submit"
                className="btn btn-outline-primary px-5 font-weight-bold"
                value="login"
              />
            ) : (
              <p>
                new user?{" "}
                <u className="text-primary toreg" onClick={gotoRegister}>
                  Register
                </u>
              </p>
            )}
          </React.Fragment>
          <p className="text-danger mt-2">{error}</p>
        </React.Fragment>
      )}
    </form>
  );
};

export default Login;
