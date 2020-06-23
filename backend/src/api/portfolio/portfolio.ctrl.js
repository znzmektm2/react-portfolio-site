import Portfolio from "../../models/portfolio";

/* 포스트 작성
POST /api/portfolios
{ 
  "title": "웹사이트",
  "body": "웹사이트 입니다",
  "category": "사이트"
}
*/
export const write = async (ctx) => {
  const { title, body, category } = ctx.request.body;
  const portfolio = new Portfolio({
    title,
    body,
    category,
  });
  try {
    await portfolio.save();
    ctx.body = portfolio;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포스트 조회
GET /api/portfolios
*/
export const list = async (ctx) => {
  try {
    const portfolios = await Portfolio.find();
    ctx.body = portfolios;
  } catch (e) {
    ctx.throw(500, e);
  }
};
