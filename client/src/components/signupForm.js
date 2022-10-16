const SignupForm = ({ inputs, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h3>Signup</h3>
      <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            name="username"
            className="form-control" 
            autoComplete="username"
            onChange={handleChange}
            placeholder= {inputs.username}
          />
      </div>
      <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email"
            className="form-control" 
            autoComplete="email"
            onChange={handleChange}
            placeholder={inputs.email} 
          />
      </div>
      <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password"
            className="form-control"
            autoComplete="password"
            onChange={handleChange} 
            placeholder={inputs.password}
          />
      </div>
      <div className="form-group m-1">
          <label htmlFor="confPwd">Confirm Password</label>
          <input 
            type="password" 
            name="confPwd"
            className="form-control"
            onChange={handleChange} 
            placeholder={inputs.confPwd}
          />
      </div>
      <button type="submit" className="btn btn-dark btn-lg btn-block">Submit</button>
    </form>
  );
};

export default SignupForm;
