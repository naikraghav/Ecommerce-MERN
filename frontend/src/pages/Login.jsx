import loginIcon from "../assets/signin.gif";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import { Link } from "react-router-dom";
import  { useState } from 'react';
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {

  // This state controls the visibility of the password input field
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic, such as making an API call
    const dataResponse = await fetch(SummaryApi.SignIn.url, {
      method: SummaryApi.SignIn.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
    } else {
      toast.error(dataApi.message);
    }
  };

  return (
    <section id='login'>
  <div className='mx-auto container p-4'>

    <div className='bg-white p-5 w-full max-w-sm mx-auto'>
      <div className='w-20 h-20 mx-auto'>
        <img src={loginIcon} alt='login icons'/>
      </div>

      <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit} >
        <div className='grid'>
          <label>Email : </label>
          <div className='bg-slate-100 p-2'>
            <input 
              type='email' 
              placeholder='Enter email' 
              name='email'
              value={data.email}
              onChange={handleChange}
              className='w-full h-full outline-none bg-transparent'
            />
          </div>
        </div>

        <div>
          <label>Password : </label>
          <div className='bg-slate-100 p-2 flex'>
            <input 
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter password' 
              name='password'
              value={data.password}
              onChange={handleChange}
              className='w-full h-full outline-none bg-transparent'
            />
            <div className='cursor-pointer text-xl'>
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <Link 
            to={'/forgot-password'} 
            className='block w-fit ml-auto hover:underline hover:text-red-600'
          >
            Forgot password ?
          </Link>
        </div>

        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
          Login
        </button>
      </form>

      <p className='my-5'>
        Don't have account ? 
        <Link to={"/sign-up"} className='text-red-600 hover:text-red-700 hover:underline'>
          Sign up
        </Link>
      </p>
    </div>

  </div>
</section>

  );
};

export default Login;
