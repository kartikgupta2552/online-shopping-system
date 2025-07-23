import React from 'react'
import App from '../App';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className='container bg-secondary vh-100 d-flex align-items-center justify-content-center'>
      <div className='row w-100'>
        <div className='col-md-6  col-lg-5 mx-auto'>
          <div className='card shadow p-4'>
            <h3 className='text-center mb-4'>Register</h3>
            <form>
              <div className='mb-3'>
                <label for="name">Name</label>
                <input type='text' id='name' className='form-control' placeholder='Enter name'/>
              </div>
              <div className='mb-3'>
                <label for="email">Email</label>
                <input type='email' id='email' className='form-control' placeholder='Enter email'/>
              </div>
              <div className='mb-3'>
                <label for="password">Password</label>
                <input type='password' id='password' className='form-control' placeholder='Enter password'/>
              </div>
              <div className='mb-3'>
                <label for="confirm-password">Password</label>
                <input type='password' id='confirm-password' className='form-control' placeholder='Confirm password'/>
              </div>
              <div className='mb-3'>
                <label for="mobile">Mobile</label>
                <input type='number' id='mobile' className='form-control' placeholder='Enter Mobile'/>
              </div>
              <div className='d-flex justify-content-center'>
                <button className='btn btn-primary w-75'>Sign up</button>
              </div>
            </form>
            <p className='text-center'>
              Already have an account?
              <Link to="/" className='btn btn-link'>Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Register