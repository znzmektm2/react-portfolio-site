import Portfolio from "../../models/portfolio";
import Joi from "@hapi/joi";
import fs from "fs";
import path from "path";

// 포트폴리오 아이디 조회시
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

/* 포트폴리오 페이지 읽기
GET /api/portfolios/:id
*/
export const read = async (ctx, next) => {
  ctx.body = ctx.state.portfolio;
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
    const listLimit = 4; // 보이는 개수 설정
    const portfolios = await Portfolio.find(query)
      .sort({ workYear: -1 }) // 년도 내림차순 정렬
      .sort({ workMonth: -1 }) // 월 내림차순 정렬
      .limit(listLimit) // 보이는 개수 제한
      .skip((page - 1) * listLimit) // 계산한 값의 개수를 제외하고 그 다음 데이터 불러옴
      .lean(); // JSON 형태로 조회
    const portfolioList = [];
    portfolios.map((portfolio) => {
      const list = {
        _id: portfolio._id,
        id: portfolio.id,
        client: portfolio.client,
        web: portfolio.web,
        singlePage: portfolio.singlePage,
        thumbImage: portfolio.thumbImage,
      };
      portfolioList.push(list);
    });
    const countPortfolio = await Portfolio.countDocuments(query);
    // Last-Page라는 커스텀 HTTP 헤더를 설정
    ctx.set("Last-Page", Math.ceil(countPortfolio / listLimit));
    ctx.body = portfolioList;
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
    workYear: Joi.string().required(),
    workMonth: Joi.string().required(),
    period: Joi.string().required(),
    worker: Joi.string().required(),
    url: Joi.string().required(),
  });

  // 검증 실패인 경우 에러 처리
  const requestBody = ctx.request.body;
  const result = schema.validate(requestBody);

  console.log("requestBody ", requestBody);
  console.log("result ", result);

  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  // skill, url 배열 만들기
  const makeArray = (data) => {
    let dataArray = [...new Set(data.replace(/ /g, "").split(","))];
    return dataArray;
  };

  const skill = makeArray(requestBody.skill);
  const url = makeArray(requestBody.url);

  // 파일 객체 담기
  const files = ctx.request.files;
  const thumbImageFile = files.thumbImage;
  const clientImageFile = files.clientImage;
  const contentImageFile = files.contentImage;

  console.log("thumbImageFile ", thumbImageFile);
  console.log("clientImageFile ", clientImageFile);
  console.log("contentImageFile ", contentImageFile);

  const generateUrl = (portfolioPath) => {
    const pathSplit = portfolioPath.split(path.sep);
    return pathSplit[pathSplit.length - 1];
  };

  const thumbImage = {
    name: thumbImageFile.name,
    url: generateUrl(thumbImageFile.path),
  };
  const clientImage = clientImageFile
    ? {
        name: clientImageFile.name,
        url: generateUrl(clientImageFile.path),
      }
    : "";

  const array = new Array();
  let contentImage;
  Array.isArray(contentImageFile)
    ? contentImageFile.map((contImg) => {
        array.push({
          name: contImg.name,
          url: generateUrl(contImg.path),
        });
        contentImage = array;
      })
    : (contentImage = {
        name: contentImageFile.name,
        url: generateUrl(contentImageFile.path),
      });

  const portfolio = new Portfolio({
    ...requestBody,
    skill,
    url,
    thumbImage,
    clientImage,
    contentImage,
  });

  console.log("write portfolio ", portfolio);
  try {
    await portfolio.save();
    ctx.body = portfolio;
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
    workYear: Joi.string().required(),
    workMonth: Joi.string().required(),
    period: Joi.string().required(),
    worker: Joi.string().required(),
    url: Joi.string().required(),
  });

  // 검증 실패인 경우 에러 처리
  const requestBody = ctx.request.body;
  const result = schema.validate(requestBody);

  console.log("requestBody ", requestBody);
  console.log("result ", result);

  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  // skill, url 배열 만들기
  const makeArray = (data) => {
    let dataArray = [...new Set(data.replace(/ /g, "").split(","))];
    return dataArray;
  };

  const skill = makeArray(requestBody.skill);
  const url = makeArray(requestBody.url);

  // 파일 객체 담기
  const files = ctx.request.files;
  const updateThumbImage = files.thumbImage;
  const updateClientImage = files.clientImage;
  const updateContentImage = files.contentImage;

  console.log("updateThumbImage ", updateThumbImage);
  console.log("updateClientImage ", updateClientImage);
  console.log("updateContentImage ", updateContentImage);

  // 이미지명 추출하기
  let generateUrl = (path) => {
    const pathSplit = path.split("\\");
    return pathSplit[pathSplit.length - 1];
  };

  // 업로드 이미지가 배열일 경우
  let updateCntImg = [];
  updateContentImage &&
    Array.isArray(updateContentImage) &&
    updateContentImage.map((contImg) => {
      updateCntImg.push({
        name: contImg.name,
        url: generateUrl(contImg.path),
      });
    });

  const updatePortfolio = {
    ...requestBody,
    skill,
    url,
    ...(updateThumbImage && {
      thumbImage: {
        name: updateThumbImage.name,
        url: generateUrl(updateThumbImage.path),
      },
    }),
    ...(updateClientImage && {
      clientImage: {
        name: updateClientImage.name,
        url: generateUrl(updateClientImage.path),
      },
    }),
    ...(updateContentImage && {
      contentImage: Array.isArray(updateContentImage)
        ? updateCntImg
        : {
            name: updateContentImage.name,
            url: generateUrl(updateContentImage.path),
          },
    }),
  };

  try {
    const originalPortfolio = await Portfolio.findOne({
      id: id,
    });

    updateThumbImage &&
      fs.unlink(
        path.join(__dirname, "../../uploads", originalPortfolio.thumbImage.url),
        (err) => {
          if (err) throw err;
          console.log(
            "ThumbImage -",
            originalPortfolio.thumbImage.url,
            "deleted"
          );
        }
      );

    updateClientImage &&
      originalPortfolio.clientImage.name !== undefined &&
      fs.unlink(
        path.join(
          __dirname,
          "../../uploads",
          originalPortfolio.clientImage.url
        ),
        (err) => {
          if (err) throw err;
          console.log(
            "ClientImage -",
            originalPortfolio.clientImage.url,
            "deleted"
          );
        }
      );

    updateContentImage &&
      (Array.isArray(originalPortfolio.contentImage)
        ? originalPortfolio.contentImage.map((contImg) => {
            console.log("contImg ", contImg);
            fs.unlink(
              path.join(__dirname, "../../uploads", contImg.url),
              (err) => {
                if (err) throw err;
                console.log("ContentImag - ", contImg.url, "deleted");
              }
            );
          })
        : fs.unlink(
            path.join(
              __dirname,
              "../../uploads",
              originalPortfolio.contentImage.url
            ),
            (err) => {
              if (err) throw err;
              console.log(
                "ContentImag - ",
                originalPortfolio.contentImage.url,
                "deleted"
              );
            }
          ));

    const portfolio = await Portfolio.findOneAndUpdate(
      { id: id },
      { $set: updatePortfolio },
      {
        new: true,
      }
    );
    if (!portfolio) {
      ctx.status = 404;
      return;
    }

    console.log("updated portfolio", updatePortfolio);
    ctx.body = portfolio;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* Client Image 삭제
DELETE /api/portfolios/:id
*/
export const removeClientImage = async (ctx) => {
  const { id } = ctx.params;
  try {
    const originalPortfolio = await Portfolio.findOne({ id: id });

    if (originalPortfolio.clientImage) {
      console.log(1);
    }

    const clientImageUrl = originalPortfolio.clientImage.url;

    fs.unlink(path.join(__dirname, "../../uploads", clientImageUrl), (err) => {
      if (err) throw err;
      console.log("clientImage -", clientImageUrl, "deleted");
    });

    console.log(1, originalPortfolio.clientImage);
    originalPortfolio.clientImage = null;
    console.log(2, originalPortfolio.clientImage);

    const portfolio = await Portfolio.findOneAndUpdate(
      { id: id },
      { $set: originalPortfolio },
      {
        new: true,
      }
    );

    ctx.body = portfolio;
    console.log(portfolio);
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포트폴리오 삭제
DELETE /api/portfolios/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    const originalPortfolio = await Portfolio.findOne({ id: id });

    fs.unlink(
      path.join(__dirname, "../../uploads", originalPortfolio.thumbImage.url),
      (err) => {
        if (err) throw err;
        console.log(
          "ThumbImage -",
          originalPortfolio.thumbImage.url,
          "deleted"
        );
      }
    );

    originalPortfolio.contentImage.map((contImg) => {
      fs.unlink(path.join(__dirname, "../../uploads", contImg.url), (err) => {
        if (err) throw err;
        console.log("ContentImage -", contImg.url, "deleted");
      });
    });

    await Portfolio.deleteOne({ id: id });

    ctx.status = 204; // No Content
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포트폴리오 스킬 카테고리 조회
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
    skillArray.length === 0 ? (ctx.body = null) : (ctx.body = category);
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 디자인 개수 조회
GET /api/portfolio/countPortfolio
*/
export const countPortfolio = async (ctx) => {
  try {
    const portfolio = await Portfolio.find();
    console.log("포트폴리오 개수", portfolio.length);
    ctx.body = portfolio.length;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* Clients 로고 조회
GET /api/portfolio/clients
*/
export const clients = async (ctx) => {
  try {
    const portfolio = await Portfolio.find()
      .sort({ workYear: -1 })
      .sort({ workMonth: -1 });

    const clientsList = [];

    portfolio.map((portfolio) => {
      if (portfolio.clientImage.name === undefined) {
        return;
      }

      const list = {
        clientImage: portfolio.clientImage,
        url: portfolio.url[0],
      };

      clientsList.push(list);
    });

    // console.log("Clients 로고 조회", clientsList);
    ctx.body = clientsList;
  } catch (e) {
    ctx.throw(500, e);
  }
};
