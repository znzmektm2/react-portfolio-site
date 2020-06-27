import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField } from "./../modules/auth";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { password } = useSelector(({ auth }) => ({
    password: auth.password,
  }));

  console.log(password);
  const onChange = (e) => {
    const password = e.target.value;
    dispatch(changeField(password));
  };
  return (
    <div>
      <div>login</div>
      <input
        type="text"
        name="password"
        placeholder="password"
        onChange={onChange}
        value={password}
      />
      <br />
      <button type="submit">보내기</button>
    </div>
  );
};

export default LoginPage;
