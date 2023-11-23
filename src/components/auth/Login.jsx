import React from 'react'

const Login = () => {
  return (
    <section className='loginbod'>
          <section class="logincontainer">
    {/* <div class="alert alert-danger">
      Invalid credentials
    </div> */}
    <p class="lead"><i class="fas fa-user"></i> Please enter email and password</p>
    <form class="form profileShowcase dark-card-cover" action="dashboard.html">
      <div class="form-group">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          placeholder="Password"
          name="password"
        />
      </div>
      <input type="submit" class="btn btn-primary" value="Login" />
    </form>
    <p class="my-1">
      Don't have an account? <a href="register.html">Sign Up</a>
    </p>
  </section>
    </section>
  )
}

export default Login