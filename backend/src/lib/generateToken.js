import jwt from "jsonwebtoken";

// 토큰 만들기
const generateToken = function () {
  const token = jwt.sign(
    // 첫번째 파라미터에는 넣고 싶은 데이터
    {
      admin: "전애란",
    },
    // 두번째 파라미터에는 JWT 암호
    process.env.JWT_SECRET,
    {
      expiresIn: "7d", // 7일 동안 유효
    }
  );
  return token;
};

export default generateToken;
