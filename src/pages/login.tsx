import { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Make sure to install react-icons

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex">
      {/* Right Side - Login Form */}
      <div className="w-1/2 flex items-center justify-center ">
        <div className="p-8 rounded-lg shadow-lg max-w-md w-full bg-white">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 border rounded"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 p-3 border rounded pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </button>
          </div>
          <button onClick={login} className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
            Login
          </button>
        </div>
      </div>
      {/* Left Side - Logo */}
      <div className="w-1/2 bg-blue-400 text-white flex items-center justify-center p-8">
        <div className="text-center">
          <img src="/logo.png" alt="Logo" className="mx-auto mb-4" style={{ width: '80px' }} />
          <h1 className="text-3xl font-bold text-slate-800">Modal App</h1>
        </div>
      </div>
    </div>
  );
}