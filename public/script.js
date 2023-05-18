// base url here
const base_url = `http://localhost:4000`;
// pull in buttons to add event listeners below

//pull in input (text) areas

//
const login = () => {
  let body = { username: username.value, password: password.value }; // make sure they match the HTML value element names.
  axios
    .post(`${baseURL}/api/login`, body)
    .then((res) => {
      console.log(res.data);
      let token = res.data.token;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", res.data.id); // .id is the primary key on your user table
      //window.location.href = `/`; this will be where you are redirected after you login
    })
    .catch((err) => console.log(err));
};

const signUp = () => {
  let body = { username: newUser.value, password: newPassword.value }; // make sure they match the HTML value element names.
  axios
    .post(`${baseURL}/api/signUp`, body)
    .then(async (res) => {
      // console.log("hit signup");
      let token = await res.data.token;
      console.log(res.data);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", res.data.id); // .id is the primary key on your user table
      //window.location.href = `/`; this will be where you are redirected after you login
    })
    .catch((err) => console.log(err));
};
// event listeners below should match the buttons.
//   userLogin.addEventListener('click', login)
//   newUserSubmit.addEventListener('click', signUp)
