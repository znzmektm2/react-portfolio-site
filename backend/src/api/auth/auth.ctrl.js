import GenerateToken from "../../lib/generateToken";

export const login = (ctx) => {
  const { password } = ctx.request.body;
  // password가 없으면 에러 처리
  if (!password) {
    ctx.status = 401; // Unauthorized
    return;
  }
  // password 확인 후 응답
  if (process.env.ADMIN_PASSWORD === password) {
    ctx.body = {
      LoginSuccess: true,
    };
    const token = GenerateToken();
    ctx.cookies.set("rps_access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } else {
    ctx.status = 401; // Unauthorized
  }
};

export const check = (ctx) => {
  const { admin } = ctx.state;
  if (!admin) {
    // 로그인 중 아님
    ctx.status = 401; // Unauthorized
    return;
  }
  ctx.body = admin;
};

export const logout = (ctx) => {
  ctx.cookies.set("rps_access_token");
  ctx.status = 204; // No Content
};
