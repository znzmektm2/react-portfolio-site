import Portfolio from "../../models/portfolio";

/* 포스트 작성
POST /api/portfolios
{ 
  "id": "singlepage-LGUplus-happybean-2019-2",
  "client": "LGU+",
  "host": "네이버 해피빈",
  "type": {
    "web": false,
    "singlePage": true
  },
  "version": {
    "pc": true,
    "mobile": true
  },
  "responsiveWeb": false,
  "IEVersion": "IE9",
  "skill": ["JavaScript","jQuery","HTML5/CSS3"],
  "animationEvent": ["slider","circle-progress-1.2.2.js"],
  "startDate": {
      "year": "2019",
      "month": "2"
    },
  "period": "3 days",
  "worker": "me",
  "url": ["https://campaign.happybean.naver.com/lgupluscsr","https://m.campaign.happybean.naver.com/lgupluscsr"]
}
*/
export const write = async (ctx) => {
  const portfolioAdd = ctx.request.body;
  const portfolio = new Portfolio(portfolioAdd);
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
