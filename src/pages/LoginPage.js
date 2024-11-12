import Modal from "../components/Modal";
import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FilledInfoAlert from "../components/FilledInfoAlert";
import { GoAlertFill } from "react-icons/go";

let content;

function LoginPage({ onChange }) {
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);

  const { email, password } = user;
  let actionBar = (
    <Button primary rounded>
      OK
    </Button>
  );

  const icon = <GoAlertFill />;

  const handleCloseModal = () => {
    setIsShown(false);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // handle submit:
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      content = `Please fill all the information`;
      return setIsShown(true);
    }

    const { data: userFetched } = await axios.get(
      `http://localhost:3001/users?email=${email}`
    );

    // Check if there is a user with this email:
    if (userFetched.length === 0) return setEmailError(true);
    setEmailError(false);

    if (password !== userFetched[0].password) {
      content = `Wrong password!!`;
      return setIsShown(true);
    }

    sessionStorage.setItem("userId", userFetched[0].id);
    onChange();
    navigate("/");
  };

  return (
    <div>
      <div className="flex justify-center items-center w-full h-96">
        <form onSubmit={handleSubmit} className="max-w-md w-full mt-7">
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={handleChange}
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />

            <label
              for="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
            {emailError && (
              <FilledInfoAlert icon={icon}>No user found</FilledInfoAlert>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={handleChange}
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <p className="text-sm mt-1">
              Dont have an account?
              <Link className="text-blue-700 underline" to="/signup">
                SignUp here
              </Link>
            </p>
            {/* 
      تذكر الكومبوننت تبع اللينك بداخل انكور تاغ , لكن معمول اله بريفينت ديفولت,
       و اثناء الكبس عليه بنادي على الفنكشين يلي هو نافيغيت و بنعطيه ال 
      >> to prop
       */}
            <label
              for="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <Button primary rounded className="mt-4">
            Submit
          </Button>
        </form>
      </div>
      {isShown && (
        <Modal actionBar={actionBar} onClose={handleCloseModal}>
          {content}
        </Modal>
      )}
    </div>
  );
}

export default LoginPage;
