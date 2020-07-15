import Portfolio from "../../models/portfolio";
import Joi from "@hapi/joi";
import fs from "fs";
import path from "path";

// 포트폴리오 뷰페이지 조회시 ctx.state.portfolio에 값 넣기
export const getPortfolioById = async (ctx, next) => {
  const { id } = ctx.params;
  try {
    const portfolio = await Portfolio.findOne({ id: id });
    // 포트폴리오가 존재하지 않을 때
    if (!portfolio) {
      ctx.status = 404;
      return;
    }
    ctx.state.portfolio = portfolio;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* id 값 중복 조회
GET /api/portfolio/idCheck?id=ccej
*/
export const idCheck = async (ctx) => {
  const { id } = ctx.params;
  try {
    const hasId = await Portfolio.findOne({ id: id });
    hasId ? (ctx.body = true) : (ctx.body = false);
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포트폴리오 작성
POST /api/portfolios
{ 
  "id": "singlepage-LGUplus-happybean-2019-2",
  "client": "LGU+",
  "host": "네이버 해피빈",
  "web": false,
  "singlePage": true,
  "pcVer": true,
  "mobileVer": true,
  "responsiveWeb": false,
  "IEVersion": "IE9",
  "skill": "JavaScript, jQuery, HTML5/CSS3",
  "animationEvent": "slider, circle-progress-1.2.2.js",
  "workYear": "2019",
  "workMonth": "2",
  "period": "3 days",
  "worker": "me",
  "url": "https://campaign.happybean.naver.com/lgupluscsr, https://m.campaign.happybean.naver.com/lgupluscsr"
}
*/
export const write = async (ctx) => {
  // 요청된 객체 검증
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    client: Joi.string().required(),
    host: Joi.string(),
    web: Joi.boolean(),
    singlePage: Joi.boolean(),
    pcVer: Joi.boolean(),
    mobileVer: Joi.boolean(),
    responsiveWeb: Joi.boolean(),
    IEVersion: Joi.string(),
    skill: Joi.string().required(),
    animationEvent: Joi.string().required(),
    workYear: Joi.string().required(),
    workMonth: Joi.string().required(),
    period: Joi.string().required(),
    worker: Joi.string().required(),
    url: Joi.string().required(),
  });

  // 검증 실패인 경우 에러 처리
  const requestBody = ctx.request.body;
  const result = schema.validate(requestBody);

  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  // skill, animationEvent, url 배열 만들기
  const makeArray = (data) => {
    let dataArray = [...new Set(data.replace(/ /g, "").split(","))];
    return dataArray;
  };

  const skill = makeArray(requestBody.skill);
  const animationEvent = makeArray(requestBody.animationEvent);
  const url = makeArray(requestBody.url);

  // 파일 객체 담기
  const files = ctx.request.files;

  const generateUrl = (path) => {
    const pathSplit = path.split("\\");
    return pathSplit[pathSplit.length - 1];
  };
  const thumbImage = {
    name: files.thumbImage.name,
    url: generateUrl(files.thumbImage.path),
  };
  const contentImage = {
    name: files.contentImage.name,
    url: generateUrl(files.contentImage.path),
  };

  const portfolio = new Portfolio({
    ...requestBody,
    skill,
    animationEvent,
    url,
    thumbImage,
    contentImage,
  });
  console.log("portfolio ", portfolio);
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
  let skillArray = [];
  if (skill) {
    skillArray = skill.split(",");
  }

  const query =
    skill || web || singlePage
      ? {
          ...(skill && { skill: { $in: skillArray } }),
          $or: [
            web ? { web: true } : { web: false },
            singlePage ? { singlePage: true } : { singlePage: false },
          ],
        }
      : {};

  try {
    const listLimit = 20; // 보이는 개수 설정
    const portfolios = await Portfolio.find(query)
      .sort({ _id: -1 }) // 내림차순 정렬
      .limit(listLimit) // 보이는 개수 제한
      .skip((page - 1) * listLimit) // 계산한 값의 개수를 제외하고 그 다음 데이터 불러옴
      .lean(); // JSON 형태로 조회
    const portfolioList = [];
    portfolios.map((portfolio) => {
      const list = {
        _id: portfolio._id,
        id: portfolio.id,
        client: portfolio.client,
        thumbImage: portfolio.thumbImage,
      };
      portfolioList.push(list);
    });
    const portfolioCount = await Portfolio.countDocuments(query);
    // Last-Page라는 커스텀 HTTP 헤더를 설정
    ctx.set("Last-Page", Math.ceil(portfolioCount / listLimit));
    ctx.body = portfolioList;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포트폴리오 뷰페이지 조회
GET /api/portfolios/id
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
    await Portfolio.deleteOne({ id: id });
    ctx.status = 204; // No Content
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포트폴리오 업데이트
PATCH /api/portfolios/:id
{ 
  "id": "singlepage-LGUplus-happybean-2019-2",
  "client": "LGU+",
  "host": "네이버 해피빈",
  "web": false,
  "singlePage": true,
  "pcVer": true,
  "mobileVer": true,
  "responsiveWeb": false,
  "IEVersion": "IE9",
  "skill": "JavaScript, jQuery, HTML5/CSS3",
  "animationEvent": "slider, circle-progress-1.2.2.js",
  "workYear": "2019",
  "workMonth": "2",
  "period": "3 days",
  "worker": "me",
  "url": "https://campaign.happybean.naver.com/lgupluscsr, https://m.campaign.happybean.naver.com/lgupluscsr"
}
*/
export const update = async (ctx) => {
  const { id } = ctx.params;

  // 요청된 객체 검증
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    client: Joi.string().required(),
    host: Joi.string(),
    web: Joi.boolean(),
    singlePage: Joi.boolean(),
    pcVer: Joi.boolean(),
    mobileVer: Joi.boolean(),
    responsiveWeb: Joi.boolean(),
    IEVersion: Joi.string(),
    skill: Joi.string().required(),
    animationEvent: Joi.string().required(),
    workYear: Joi.string().required(),
    workMonth: Joi.string().required(),
    period: Joi.string().required(),
    worker: Joi.string().required(),
    url: Joi.string().required(),
  });

  // 검증 실패인 경우 에러 처리
  const requestBody = ctx.request.body;
  const result = schema.validate(requestBody);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  // skill, animationEvent, url 배열 만들기
  const makeArray = (data) => {
    let dataArray = [...new Set(data.replace(/ /g, "").split(","))];
    return dataArray;
  };

  const skill = makeArray(requestBody.skill);
  const animationEvent = makeArray(requestBody.animationEvent);
  const url = makeArray(requestBody.url);

  // 파일 객체 담기
  const files = ctx.request.files;
  const addedThumbImage = files.thumbImage;
  const addedContentImage = files.contentImage;

  let generateUrl = (path) => {
    const pathSplit = path.split("\\");
    return pathSplit[pathSplit.length - 1];
  };

  const updatePortfolio = {
    ...requestBody,
    skill,
    animationEvent,
    url,
    ...(addedThumbImage && {
      thumbImage: {
        name: addedThumbImage.name,
        url: generateUrl(addedThumbImage.path),
      },
    }),
    ...(addedContentImage && {
      contentImage: {
        name: addedContentImage.name,
        url: generateUrl(addedContentImage.path),
      },
    }),
  };

  try {
    const originalPortfolio = await Portfolio.findOne({ id: requestBody.id });
    addedThumbImage &&
      fs.unlink(
        path.join(__dirname, "../../uploads", originalPortfolio.thumbImage.url),
        (err) => {
          if (err) throw err;
          console.log("file deleted");
        }
      );

    addedContentImage &&
      fs.unlink(
        path.join(
          __dirname,
          "../../uploads",
          originalPortfolio.contentImage.url
        ),
        (err) => {
          if (err) throw err;
          console.log("file deleted");
        }
      );

    const portfolio = await Portfolio.findOneAndUpdate(
      { id: id },
      updatePortfolio,
      {
        new: true,
      }
    );
    if (!portfolio) {
      ctx.status = 404;
      return;
    }

    console.log("updatePortfolio ", updatePortfolio);
    console.log("portfolio ", portfolio);
    ctx.body = portfolio;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포트폴리오 스킬 조회
GET /api/portfolios/category
*/
export const category = async (ctx) => {
  try {
    let skillArray = [];
    const portfolios = await Portfolio.find();
    portfolios.map((portfolio) => {
      portfolio.skill.map((skill) => {
        skillArray.push(skill);
      });
    });
    const category = [...new Set(skillArray)];
    ctx.body = category;
  } catch (e) {
    ctx.throw(500, e);
  }
};
