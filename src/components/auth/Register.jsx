import axios from 'axios';
import React, { useEffect, useState, useNavigate  } from 'react';
import { Link} from 'react-router-dom';
// import { setAlert } from '../../actions/alert';
// import propTypes from 'prop-types';

const Register = ({ setAlert }) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
  const [dynamicClassList, setDynamicClassList] = useState(" purple-circle-container")
  const [loginRef, setLoginRef] = useState('Already have an account?')
  const [placeholderFirstName, setPlaceholderFirstName] = useState('🎺 Please Enter First Name')
  const [placeholderLastName, setPlaceholderLastName] = useState('🎶 Please Enter Last Name 🎧')
  const [placeholderEmail, setPlaceholderEmail] = useState('🎶 Please Enter Email Address 🎧')
  const [placeholderPassword, setPlaceholderPassword] = useState('🎶 Please Enter Password 🎧')
  const [placeholderConfirmPassword, setPlaceholderConfirmPassword] = useState('🎶 Please Confirm Passwords 🎧')
  const [errors, setErrors] = useState('')
  const [nameError, setNameError] = useState([false, null]);
  const [emailError, setEmailError] = useState([false, null]);
  const [passwordError, setPasswordError] = useState([false, null]);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const navigate = useNavigate()
  const onSubmit = async e => {
    e.preventDefault();

    if (firstName.length < 3) {
      setNameError([true, firstName])
      console.log(firstName.length, 'danger');
    } else if (lastName.length < 3) {
      setNameError([true, lastName])
      console.log(lastName.length, 'danger');
    } if (!emailRegex.test(email)) {
      setEmailError([true, email]);
      setErrors('Invalid Email')
    } if (!passwordRegex.test(password)) {
      setErrors('Password must be at least 6 characters long and contain at least 1 uppercase letter');
      setPasswordError([true, password])
    } else if (password !== confirmPassword){
      setPasswordConfirmationError(true)
      setConfirmPasswordMessage('Passwords Must Match')
      return false
    }  else {
      const newUser = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        avatar:'',
      };
      axios.post('http://localhost:8000/api/users',
      newUser, {withCredentials: true})
        .then(res => {
          console.log('✔✔✔👌', res)
          navigate('/Landing');
        })
        .catch(err => {
          console.log('🎡🎡🔭', err)
          const errorResponse = err.response.data.errors; // Get the errors from err.response.data
          const errorArr = []; // Define a temp error array to push the messages in
          for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
            if (errorResponse[key].message.includes('password')) {
              errorArr.push(errorResponse[key].message)
            }
          }
          // Set Errors
          setErrors(errorArr);
        });
      console.log('success!')
      setFormData ({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar:''
      });
    }
  }
  const showErrors = () => {
    if (nameError[0]) {
      return 'Name Is Too Short!';
    }
    return '';
  };
  const showEmailErrors = () => {
    if (emailError[0]) {
      return 'Invalid Email Format!';
    }
  }
  const showPasswordErrors = () => {
    if (passwordError[0]) {
      return 'Password must be at least 6 characters long and contain at least 1 uppercase letter';
    } 
  }
  const showConfirmPassword = () => {
    if (passwordConfirmationError) {
      return 'Passwords Must Match';
    }
  }
  
  const loginhover = (e) => {
    console.log(e.target.innerText)
    if (e.target.innerText === `Already have an account?`) {
      setLoginRef('🎶 Login Here!')
    }
    else {
      setLoginRef('Already have an account?')
    }
  }
  const placeholderhover = (e) => {
    // console.log(e.target.innerText)
    if (e.target.innerText === '🎶 First Name! 🎧') {
      setPlaceholderFirstName('🎶 Please Enter First Name!')
    }
    else {
      setPlaceholderFirstName('🎶 First Name! 🎧')
    }

    if (e.target.innerText === '🎶 Please Enter Last Name! 🎧') {
      setPlaceholderLastName('🎶 Last Name! 🎧')
    }
    else {
      setPlaceholderLastName('🎶 Please Enter Last Name! 🎧')
    }
    if (e.target.innerText === '🎶 Email! 🎧') {
      setPlaceholderEmail('🎶 Please Enter Email Address! 🎧')
    }
    else {
      setPlaceholderEmail('🎶 Email! 🎧')
    }

    if (e.target.innerText === '🎶 Password! 🎧') {
      setDynamicClassList('purple-circle-container')
      setPlaceholderPassword('🎶 Please Enter Password! 🎧')
    }
    else {
      setPlaceholderPassword('🎶 Password! 🎧')
      setDynamicClassList('leadShowcase, purple-circle-container, dark-card-cover')
    }

    if (e.target.innerText === '🎶 Confirm Password! 🎧') {
      setPlaceholderConfirmPassword('🎶 Please Confirm Password! 🎧')
    }
    else {
      setDynamicClassList('leadShowcase, purple-circle-container, dark-card-cover')
      setPlaceholderConfirmPassword('🎶 Confirm Password! 🎧')
    }


  }
  return (
    <section className="register profileCoverShowcase" style={{ marginBottom: '0px' }}>
      <div className='border-box profilegrpbtns'>
        <div className='profileShowcase box-shadow purple-circle-container' style={{ paddingTop: '' }}>

          <div className="purple-circle-container leads margin">
            <h1 className="lead dark-glo dark-card-cove dark-profile-overlay">
              <p className="lead"><i className="fas fa-user"></i>🎶 MELODY DREAMS 🎶</p>
            </h1>
          </div>

          <form className="form bluebtn purple-circle-container leadShowcas margi box-shadow dark-card-cove" onSubmit={e => onSubmit(e)}>

            <div className="form-group bluebtn ">
              <label className="bluebtn purple-circle-container" htmlFor="firstName">
                <p className=" purple-circle-container">
                  <Link to='/Register' className="bluebtn leadShowcase dark-profile-overlay" onMouseEnter={e => placeholderhover(e)}>{placeholderFirstName}</Link>
                </p>
              </label>
              {
                nameError[0] ?
                  <p className='flashMessage'>{showErrors()}</p> : ''
              }
              <input className='textShowcase'
                type="text"
                placeholder={placeholderFirstName}
                name="firstName"
                value={firstName}
                onChange={e => onChange(e)} />
            </div>

            <div className="form-group secondary_leads dark-glo bluebtn">
              <label className="bluebtn" htmlFor="lastName">
                <p className="leadShowcas purple-circle-container">
                  <Link to='/Register' className="bluebtn leadShowcase dark-profile-overla dark-card-cove" onMouseEnter={e => placeholderhover(e)}>{placeholderLastName}</Link>
                </p>
              </label>
              {
                nameError[0] && nameError[1].length < 3 && <p className='flashMessage'>{showErrors()}</p>
              }
              <input className='textShowcase'
                type="text"
                placeholder={placeholderLastName}
                name="lastName"
                value={lastName}
                onChange={e => onChange(e)} />
            </div>

            <div className="form-group secondary_leads dark-glo bluebtn">
              <label className="bluebtn" htmlFor="email">
                <p className="leadShowcas purple-circle-container">
                  <Link to='/Register' className="bluebtn leadShowcase dark-profile-overla dark-card-cove" onMouseEnter={e => placeholderhover(e)}>{placeholderEmail}</Link>
                </p>
              </label>
              { 
                emailError[0] && !emailRegex.test(email) && <p className='flashMessage'>{showEmailErrors()}</p>
              }
              <input className='textShowcase'
                type="email"
                placeholder={placeholderEmail} name="email"
                value={email}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group secondary_leads dark-glo bluebtn">
              <label className="bluebtn" htmlFor="password">
                <p className={dynamicClassList}>
                { 
                  passwordError[0] && !passwordRegex.test(password) && <p className='flashMessage'>{showPasswordErrors()}</p> 
                }

                  <Link to='/Register' className="bluebtn leadShowcase dark-profile-overla dark-card-cove" onMouseEnter={e => placeholderhover(e)}>{placeholderPassword}</Link>
                </p>
              </label>

              <input className='textShowcase'
                type="password"
                placeholder={placeholderPassword}
                name="password"
                value={password}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group secondary_leads dark-glo bluebtn">
              <label className="bluebtn" htmlFor="confirmPassword">
                <p className="leadShowcas purple-circle-container">
                  <Link to='/Register' className="bluebtn leadShowcase dark-profile-overla dark-card-cove" onMouseEnter={e => placeholderhover(e)}>{placeholderConfirmPassword}</Link>
                </p>
              </label>
              { 
                passwordConfirmationError && <p className='flashMessage'>{showConfirmPassword()}</p> 
              }

              <input className='textShowcase'
                type="password"
                placeholder={placeholderConfirmPassword}
                name="confirmPassword"
                value={confirmPassword}
                onChange={e => onChange(e)}
              />
              <small className="form-text"
              >This site uses Gravatar so if you want a profile image, use a
                Gravatar email </small>
            </div>
            <div className="bluebtn">
              <p className="leadShowcase purple-circle-container ">

                <input className="bluebtn leadShowcase dark-profile-overlay dark-card-cover my-1" type="submit" value="Register"/>
              </p>
            </div>


            <div className="form-group leadShowcase dark-glo bluebtn">
              <div className="bluebtn">
                <p className="leadShowcas purple-circle-container landin">
                  <Link to='/Login' className="bluebtn textShowcase dark-profile-overla dark-card-cover" onMouseEnter={e => loginhover(e)}>{loginRef}</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default (Register);