import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import AdminForm from "../../components/admin/AdminForm";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, login } from "../../modules/auth";
import { check } from "../../modules/user";
import { logout } from "../../modules/user";

const AdminContainer = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { password, authError, auth, user } = useSelector(({ auth, user }) => ({
    password: auth.password,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = (e) => {
    const password = e.target.value;
    dispatch(changeField(password));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(password));
  };

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(initializeForm());
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log("오류발생 ");
      console.log(authError);
      setError("로그인 실패");
      return;
    }
    if (auth) {
      console.log("로그인 성공");
      dispatch(check());
    }
  }, [authError, auth, dispatch]);

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        console.log("localStorage is not working");
      }
    }
  }, [history, user]);

  return (
    <AdminForm
      password={password}
      onChange={onChange}
      onSubmit={onSubmit}
      onLogout={onLogout}
      user={user}
      error={error}
    />
  );
};

export default withRouter(AdminContainer);
