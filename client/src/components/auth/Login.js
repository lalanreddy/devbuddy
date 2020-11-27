import React,{ Fragment,useState} from 'react';
import { Link,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { login } from '../../actions/auth';
const Login = ({ login,isAuthenticated }) => {
 const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
     login(email,password);
  
  };
  //Redirect if logged in
  if(isAuthenticated){
    return <Redirect to="/dashboard" />
  }
  return (
    <Fragment>
      <section className="pdewe">
        <h1 className="account">
       <span className="text-dark">Account Login</span>
      </h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email}
           onChange = {e=>{onChange(e)}}/>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange = {e=>{onChange(e)}}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-dark" id = "pd" value="LogIn"/>
      </form>
      <p className="my-1" id="sd">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
      </section>
    </Fragment>
    
  )
}
Login.propTypes = {
  login:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
};

const mapStateToProps = state =>({
 isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps,{login})(Login);
