import client from "./client";

//로그인
export const login = (password) => client.post("/api/auth/login", { password });

// 로그인 상태 확인
export const check = () => client.get("/api/auth/check");

// 로그아웃
export const logout = () => client.post("/api/auth/logout");
