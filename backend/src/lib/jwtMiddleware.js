import jwt from "jsonwebtoken";
import GenerateToken from "./generateToken";

const jwtMiddleware = (ctx, next) => {
  const token = ctx.cookies.get("rps_access_token");
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.admin = {
      admin: decoded.admin,
    };

    // 토큰의 남은 유효 기간이 3.5일 미만이면 재발급
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const token = GenerateToken();
      ctx.cookies.set("rps_access_token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }
    return next();
  } catch (e) {
    // 토큰 검증 실패
    return next();
  }
};

export default jwtMiddleware;
