import React, { useState } from "react";
//for hashing password
var passwordhash = require("password-hash");
const Reg = ({ setAction, setusers, users, done_register, setregister }) => {
  //state for error messages
  const [error, updaterror] = useState("");
  //border color of inputs change
  const [border, changeborder] = useState({
    usr: "border-primary",
    pass: "border-primary",
  });
  //state for updating user inputs
  const [temp, updatetemp] = useState({ usr: "", pass: "" });

  //splitting out usernames from users
  let usernames = Object.keys(users);

  // when click on login link
  const gotologin = () => {
    setAction(true);
  };
  //to register
  const register = (e) => {
    //flag varibale to check if username is unique
    let unique = true;
    e.preventDefault();
    //check username given with used usernames
    usernames.forEach((usr) => {
      if (usr === temp.usr) {
        //console.log("exist");
        unique = false;
      }
    });
    if (unique) {
      if (temp.pass !== "") {
        //hashes password
        let hashedpass = passwordhash.generate(temp.pass);
        //if username is unique and password is not empty,
        //updates users object
        setusers({ ...users, [temp.usr]: hashedpass });
        //console.log(hashedpass);
        //to show success message
        setregister(true);
      } else {
        //if password is empty
        changeborder({ ...border, pass: "border-danger" });
        updaterror("Password cannot be empty!");
      }
    } else {
      //if username is not unique
      updaterror("Username already taken!");
    }
  };
  const handlechange = (e) => {
    // main use of this function is to update the temp object
    //by adding key value pairs

    //additional check is implemented for username so that
    //if username is unique border color is green
    //if username exist border turns red
    let unique = true;
    if (e.target.name === "usr") {
      usernames.forEach((usr) => {
        if (usr === e.target.value) {
          //console.log("exist");
          unique = false;
        }
      });
      if (unique) {
        changeborder({ ...border, usr: "border-success" });
      } else {
        changeborder({ ...border, usr: "border-danger" });
      }
    }
    //updates temp object
    updatetemp({ ...temp, [e.target.name]: e.target.value.trim() });
  };
  return (
    <div>
      <form onSubmit={register} className="text-center my-5">
        {done_register ? (
          <p>
            Registered!{" "}
            <u className="text-danger toreg" onClick={gotologin}>
              Login now
            </u>
          </p>
        ) : (
          <React.Fragment>
            <h6>Note: Username should be unique!</h6>
            <h2 className="heading">Register</h2>
            <input
              type="text"
              name="usr"
              onChange={handlechange}
              placeholder="Username"
              className={
                "mx-auto   rounded d-block mb-2 py-2 mt-5 " + border.usr
              }
            />
            <input
              type="password"
              name="pass"
              onChange={handlechange}
              placeholder="Password"
              className={
                "mx-auto border-2 d-block rounded mb-2 py-2 " + border.pass
              }
            />

            <input
              type="submit"
              className="btn btn-outline-primary px-5 font-weight-bold"
              value="Register"
            />

            <p>
              have account?{" "}
              <u className="text-primary toreg" onClick={gotologin}>
                Login
              </u>
            </p>
            <p className="text-danger mt-2">{error}</p>
          </React.Fragment>
        )}
      </form>
    </div>
  );
};
export default Reg;
