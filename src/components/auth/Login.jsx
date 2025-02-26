import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <section className='purple-container'>
          <section class="logincontainer">
    {/* <div class="alert alert-danger">
      Invalid credentials
    </div> */}
    <div className='bluebtn'>
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
    <div class="form-group bluebtn">
    <p class="my-1 registerbtn leadShowcase dark-card-cover">
      Don't have an account? <Link to="/Register" class="leadShowcase">Sign Up</Link>
    </p>
    </div>
    </div>
  </section>
    </section>
  )
}

export default Login