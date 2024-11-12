import Modal from "../components/Modal";
import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
import { GoAlertFill } from "react-icons/go";
import { useNavigate, Link } from "react-router-dom";

// useNavigate >> بتسخدمها لما بدك تستعملها جوا فنكشين عشان بعد ما تنفذ كود تنتقل اوتوماتيكيا الى صفحة اخرى
// Link >> بتستخدمه لما بدك تحط لينك يعني a >> anchor tag

let content;

function SignupPage({ onChange }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    postalCode: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const handleClosemModal = () => {
    setIsShown(false);
  };
  const actionBar = (
    <Button primary rounded>
      Ok
    </Button>
  );

  // Validation function:
  const validation = (name) => {
    const { email, userName, password } = user;
    if (name === "email") {
      const emailReg = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
      if (email) {
        setEmailError(true);
        if (emailReg.test(email)) setEmailError(false);
      } else {
        setEmailError(false);
      }
    }

    if (name === "userName") {
      const userNameReg = /^[a-zA-Z0-9_-]{3,16}$/;
      if (userName) {
        setUserNameError(true);
        if (userNameReg.test(userName)) setUserNameError(false);
      } else {
        setUserNameError(false);
      }
    }

    if (name === "password") {
      const passwordReg =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (password) {
        setPasswordError(true);
        if (passwordReg.test(password)) setPasswordError(false);
      } else {
        setPasswordError(false);
      }
    }
  };

  const handleKeyUp = (e) => {
    validation(e.target.name);
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // Distruct the user:
      const { email, userName, password, confirmPassword, phoneNumber } = user;

      // Check if all the information is filled: >> must put state of object when no info >> must appear a errorDivs
      if (
        !email ||
        !userName ||
        !password ||
        !confirmPassword ||
        !phoneNumber
      ) {
        console.log("hhhere");
        content = "Please must fill all the information";
        setIsShown(true);
        return;
      }

      // Check if the user already registered:
      const { data: users } = await axios.get("http://localhost:3001/users");

      if (users.filter((user) => user.email === email).length > 0)
        return console.log("This email is already used");
      if (users.filter((user) => user.userName === userName).length > 0)
        return console.log("This user name is used");
      if (password !== confirmPassword) {
        content = "Please confirm the same password";
        setIsShown(true);
        return;
      }

      if (emailError || passwordError || userNameError) {
        content = "Please check for the validation";
        setIsShown(true);
        return;
      }

      const { data } = await axios.post("http://localhost:3001/users", user);
      console.log(data);

      // create a cart to this user:
      const { data: cart } = await axios.post(`http://localhost:3001/carts`, {
        userId: data.id,
        userName,
        cart: [],
      });

      sessionStorage.setItem("userId", data.id);
      onChange();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center w-full h-96">
        <form onSubmit={handleSubmit} className="max-w-md w-full mt-7">
          <div className="relative z-0 w-full mb-5 group">
            <input
              onKeyUp={handleKeyUp}
              onChange={handleChange}
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            {emailError && (
              <p className="flex justify-start items-center text-red-800 text-sm gap-1">
                <GoAlertFill />
                Please enter a valid email
              </p>
            )}
            <label
              for="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onKeyUp={handleKeyUp}
              onChange={handleChange}
              name="userName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            {userNameError && (
              <p className="flex justify-start items-center text-red-800 text-sm gap-1">
                <GoAlertFill />
                User name must be more than 3 characters of less than 16
              </p>
            )}
            <label
              for="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              User Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onKeyUp={handleKeyUp}
              onChange={handleChange}
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            {passwordError && (
              <p className="flex justify-start items-center text-red-800 text-sm gap-1">
                <GoAlertFill />
                Your password must be at least 8 characters long and contain at
                least one uppercase letter, one lowercase letter, one digit, and
                one special character from @$!%*?&. Please ensure your password
                meets these requirements.
              </p>
            )}
            <label
              for="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={handleChange}
              name="confirmPassword"
              id="confirmPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            {/* {isFilled && <FilledInfoAlert icon={icon}>This filed id required</FilledInfoAlert>} */}
            <label
              for="floating_repeat_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm password
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={handleChange}
                id="phoneNumber"
                name="phoneNumber"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              {/* {isFilled && <FilledInfoAlert icon={icon}>This filed id required</FilledInfoAlert>} */}
              <label
                for="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number (+962788907765)
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={handleChange}
                type="text"
                name="postalCode"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="floating_company"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Postal Code
              </label>
            </div>
          </div>
          <p className="text-sm">
            Have already an account?
            <Link className="text-blue-700 underline" to="/login">
              log in
            </Link>
          </p>
          <Button primary rounded className="mt-4">
            Submit
          </Button>
        </form>
      </div>
      {isShown && (
        <Modal onClose={handleClosemModal} actionBar={actionBar}>
          {content}
        </Modal>
      )}
    </div>
  );
}

export default SignupPage;
