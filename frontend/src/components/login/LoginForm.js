import React from "react";

const LoginForm = ({ password, onChange, onSubmit, error }) => {
  if (error) {
    console.log(error);
  }
  return (
    <div>
      <div>login</div>
      <form onSubmit={onSubmit}>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={onChange}
          value={password}
        />
        <br />
        {error && <div>{error}</div>}
        <button>로그인</button>
      </form>
    </div>
  );
};

export default LoginForm;
