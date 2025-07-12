// src/pages/AuthPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup, login } from '../api/authApi.js';
import { isAuthenticated } from '../util/auth.js';
import { setTokens } from '../util/auth.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      email: form.email.value,
      password: form.password.value,
    };

    if (!isLogin) {
      const confirmPassword = form.confirmPassword.value;
      if (payload.password !== confirmPassword) {
        setMessage("Passwords do not match");
        console.log(message);
        return;
      }

      payload.username = form.username.value;
      payload.phoneNumber = form.phoneNumber.value;
    }

    try {
      const data = isLogin ? await login(payload) : await signup(payload);
      setTokens(data.accessToken, data.refreshToken, data.userName);
      navigate('/');
    } catch (err) {
      const errorMsg = err.message || 'Something went wrong';
      setMessage(errorMsg);
      console.log(errorMsg);
    }
  };

  useEffect(() => {
  
       if (isAuthenticated()) {
        navigate('/');
       }
  
    }, []);

  return (
    <div className='flex justify-center md:items-center  flex-col md:flex-row w-full h-full main-cont box-border'>

      <div className='w-1/2 flex flex-col items-center justify-center'>
        <h1 className='text-white mt-2 md:mt-0 text-2xl md:text-4xl'>Short News</h1>
        <div className='hidden md:block'>
          <img src="./News.jpeg" width={400} height={400} alt="News" />
        </div>
      </div>

      <div className='w-full flex flex-col items-center justify-center h-full'>
        <div className='bg-white w-[85%] md:h-auto h-auto min-h-[23rem]  py-6 md:w-[28rem] md:max-w-[26rem] rounded-2xl shadow-2xl flex flex-col justify-center items-center'>
          
          <h2 className="text-xl font-semibold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
          {message && <p className="text-red-600 mb-2">{message}</p>}
          
          <form onSubmit={handleSubmit} className="flex flex-col w-full md:w-[23rem] gap-4 max-w-sm relative px-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="p-2 border border-gray-400 rounded-md text-[#3450d7]"
            />

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="p-2 border border-gray-400 rounded-md text-[#3450d7] w-full"
              />
              <span
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {!isLogin && (
              <>

                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    required
                    className="p-2 border border-gray-400 rounded-md text-[#3450d7] w-full"
                  />
                  <span
                    className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  required
                  className="p-2 border border-gray-400 rounded-md text-[#3450d7]"
                />

                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  required
                  className="p-2 border border-gray-400 rounded-md text-[#3450d7]"
                />

                
              </>
            )}

            <button
              type="submit"
              className="bg-[#3450d7] text-white py-2 rounded cursor-pointer hover:bg-[#2b3cc4]"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-4 text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button onClick={toggleMode} className="text-[#3450d7] underline cursor-pointer">
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
      
    </div>
  );
}
