import React,{ useState } from 'react'

function Login() {
  // state object for the form
  const [values, setValues] = useState({
    userName: '',
  });
  // if submitted is true, show success
  const [submitted, setSubmitted] = useState(false);

  // success showed only if form is valid
  const [valid, setValid] = useState(false);

  // Any time input changes {'onChange'}, update the state with the new values
  // '...' copies the old values; 
  // then change userName to event.target.value
  const handleUserNameInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      userName: event.target.value, 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(values.userName) {
      setValid(true);
  }
    setSubmitted(true);
  };
  

  return (
    <div className='login'>
      <form className='login-form' onSubmit={handleSubmit}>
      {/* success message only appears if 'submitted' is true */}
      {submitted && valid ? <div class='success-message'>
        Success! Thank you for logging in!
        </div>: null}
      <input
          // for every keystroke
          onChange={handleUserNameInputChange}
          // for this input, the value will be the value that's in state
          value={values.userName}
          id="user-name"
          class="form-field"
          type="text"
          placeholder="Username"
          name="userName"
        />
        <button class="form-field" type="submit">
          Login
        </button>
        {/* if button clicked and userName is empty */}
        {submitted && !values.userName ? <span className='error-text'>Please type in a username</span>: null}
      </form>
    </div>
  )
}

export default Login
