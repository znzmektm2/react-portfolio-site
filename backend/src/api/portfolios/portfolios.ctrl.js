import Portfolio from "../../models/portfolio";
import mongoose from "mongoose";
import Joi from "@hapi/joi";

// 포트폴리오 뷰페이지 조회시 ctx.state.portfolio에 값 넣기
export const getPortfolioById = async (ctx, next) => {
  const { id } = ctx.params;
  try {
    const portfolio = await Portfolio.find({ id: id });
    // 포트폴리오가 존재하지 않을 때
    if (!portfolio) {
      ctx.status = 404;
      return;
    }
    ctx.state.portfolio = portfolio;
    return next();
  } catch (e) {
    throw (500, e);
  }
};

/* 포트폴리오 작성
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
  // 요청된 객체 검증
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    client: Joi.string().required(),
    host: Joi.string(),
    type: {
      web: Joi.boolean(),
      singlePage: Joi.boolean(),
    },
    version: {
      pc: Joi.boolean(),
      mobile: Joi.boolean(),
    },
    responsiveWeb: Joi.boolean(),
    IEVersion: Joi.string(),
    skill: Joi.array().items(Joi.string()).required(),
    animationEvent: Joi.array().items(Joi.string()),
    startDate: {
      year: Joi.string().required(),
      month: Joi.string().required(),
    },
    period: Joi.string().required(),
    worker: Joi.string().required(),
    url: Joi.array().items(Joi.string()),
  });

  // 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const portfolioAdd = ctx.request.body;
  const portfolio = new Portfolio(portfolioAdd);
  try {
    await portfolio.save();
    ctx.body = portfolio;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포트폴리오 리스트 조회
GET /api/portfolios?skill=JavaScript&web=true
*/
export const list = async (ctx) => {
  const page = parseInt(ctx.query.page || "1", 10);

  if (page < 1) {
    ctx.status = 400; // Bad Request
    return;
  }

  const { skill, web, singlePage } = ctx.query;
  const query = {
    ...(skill ? { skill: skill } : {}),
    ...(web ? { "type.web": web } : {}),
    ...(singlePage ? { "type.singlePage": singlePage } : {}),
  };

  try {
    const listLimit = 10; // 보이는 개수 설정
    const portfolios = await Portfolio.find(query)
      .sort({ _id: -1 }) // 내림차순 정렬
      .limit(listLimit) // 보이는 개수 제한
      .skip((page - 1) * 10) // 계산한 값의 개수를 제외하고 그 다음 데이터 불러옴
      .lean(); // JSON 형태로 조회

    const portfolioCount = await Portfolio.countDocuments(query);
    ctx.body = portfolios;
    // Last-Page라는 커스텀 HTTP 헤더를 설정
    ctx.set("Last-Page", Math.ceil(portfolioCount / listLimit));
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포트폴리오 뷰페이지 조회
GET /api/portfolios/singlepage-LGUplus-happybean-2019-2
*/
export const read = async (ctx, next) => {
  ctx.body = ctx.state.portfolio;
};

/* 포트폴리오 삭제
DELETE /api/portfolios/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Portfolio.remove({ id: id });
    ctx.status = 204; // No Content
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포트폴리오 업데이트
PATCH /api/portfolios/5ef3ba9708f6897274b83b0d
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
export const update = async (ctx) => {
  const { id } = ctx.params;

  // 요청된 객체 검증
  const schema = Joi.object().keys({
    id: Joi.string(),
    client: Joi.string(),
    host: Joi.string(),
    type: {
      web: Joi.boolean(),
      singlePage: Joi.boolean(),
    },
    version: {
      pc: Joi.boolean(),
      mobile: Joi.boolean(),
    },
    responsiveWeb: Joi.boolean(),
    IEVersion: Joi.string(),
    skill: Joi.array().items(Joi.string()),
    animationEvent: Joi.array().items(Joi.string()),
    startDate: {
      year: Joi.string(),
      month: Joi.string(),
    },
    period: Joi.string(),
    worker: Joi.string(),
    url: Joi.array().items(Joi.string()),
  });

  // 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { id: id },
      ctx.request.body,
      {
        returnNewDocument: true,
      }
    );
    if (!portfolio) {
      ctx.status = 404;
      return;
    }
    ctx.body = portfolio;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포트폴리오 스킬 조회
GET /api/portfolios/category
*/
export const category = async (ctx) => {
  let skillList = [];
  try {
    const portfolios = await Portfolio.find();
    portfolios.map((portfolio) => {
      portfolio.skill.map((skill) => {
        skillList.push(skill);
      });
    });
    const category = [...new Set(skillList)];
    ctx.body = category;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포트폴리오 이름 조회
GET /api/portfolios/client
*/
export const client = async (ctx) => {
  let clientList = [];
  try {
    const portfolios = await Portfolio.find();
    portfolios.map((portfolio) => {
      clientList.push(portfolio.client);
    });
    ctx.body = clientList;
  } catch (e) {
    ctx.throw(500, e);
    3;
  }
};
