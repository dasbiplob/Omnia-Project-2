import { bcrypt } from "../../deps.js";
import * as authService from "../../services/authService.js";
import { validasaur } from "../../deps.js";

const showRegister = ({ render }) => {
  render("register.eta");
};

const showLogin = ({ render }) => {
  render("login.eta");
};

const registerUser = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const formData = await body.value;
  const registerData = { email: formData.get("email"), password: formData.get("password") };
  const [passes, errors] = await validasaur.validate(
    registerData,
    {
      email: [validasaur.isEmail],
      password: [validasaur.required, validasaur.minLength(4)],
    },
  );
  if (!passes) {
    console.log(errors);
    registerData.validationErrors = errors
    render("register.eta", registerData);
  }
  else {
    await authService.addUser(
      registerData.email,
      await bcrypt.hash(registerData.password),
    );
    response.redirect("/auth/login");
  }
};

const loginUser = async ({ request, response, state, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const userFromDatabase = await authService.findUserByEmail(
    params.get("email"),
  );
  if (userFromDatabase.length != 1) {
    render("login.eta", {error: "Cannot find user with email, try again!"});
    return;
  }

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    params.get("password"),
    user.password,
  );

  if (!passwordMatches) {
    render("login.eta", {error: "Password mismatches, try again!"});
    return;
  }

  await state.session.set("user", user);
  response.redirect("/topics");
};

export { showRegister, registerUser, showLogin, loginUser };
