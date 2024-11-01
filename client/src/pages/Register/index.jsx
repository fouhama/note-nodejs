import { useRef } from "react";
import { UserAuth } from "../../Context/AuthContext";
function Register() {
  const { registerUser } = UserAuth();
  const fromregster = useRef(null);
  const handlerForm = (e) => {
    e.preventDefault();
    const formData = new FormData(fromregster.current);
    const data = Object.fromEntries(formData);
    registerUser(data);
  };
  return (
    <div className='m-auto w-80  mt-20'>
      <form ref={fromregster}>
        <h1 className='text-3xl font-bold mb-4 uppercase text-center'>
          Register
        </h1>
        <div className='mb-4'>
          <input
            type='email'
            className='border-[1px] border-neutral-500 p-3 w-full outline-none focus:border-blue-400 rounded-lg'
            placeholder='Email'
            name='email'
          />
        </div>
        <div className='mb-4'>
          <input
            type='password'
            className='border-[1px] border-neutral-500 p-3 w-full outline-none focus:border-blue-400 rounded-lg'
            placeholder='password'
            name='password'
          />
        </div>
        <div className='mb-4'>
          <button
            onClick={handlerForm}
            className='p-3 bg-blue-600 text-white font-semibold rounded-lg w-full'>
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
