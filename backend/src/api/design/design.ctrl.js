import Design from "../../models/design";
import Joi from "@hapi/joi";
import fs from "fs";
import path from "path";

// 이미지명 추출하기
const generateUrl = (imgPath) => {
  const pathSplit = imgPath.split(path.sep);
  return pathSplit[pathSplit.length - 1];
};

// 디자인 아이디 조회시
export const getDesignById = async (ctx, next) => {
  const { id } = ctx.params;
  console.log(id);
  try {
    const design = await Design.findOne({ _id: id });
    // 디자인 존재하지 않을 때
    if (!design) {
      ctx.status = 404;
      return;
    }
    ctx.state.design = design;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 디자인 페이지 읽기
GET /api/design/:id
*/
export const read = async (ctx, next) => {
  ctx.body = ctx.state.design;
};

/* 디자인 리스트 조회
GET /api/design?category=Photoshop
*/
export const list = async (ctx) => {
  const page = parseInt(ctx.query.page || "1", 10);

  if (page < 1) {
    ctx.status = 400; // Bad Request
    return;
  }

  const { category } = ctx.query;
  const query = { category: category };

  try {
    const listLimit = 2; // 보이는 개수 설정
    const design = await Design.find(query)
      .sort({ _id: -1 }) // 내림차순 정렬
      .limit(listLimit) // 보이는 개수 제한
      .skip((page - 1) * listLimit) // 계산한 값의 개수를 제외하고 그 다음 데이터 불러옴
      .lean(); // JSON 형태로 조회
    const designList = [];

    design.map((d) => {
      const list = {
        _id: d._id,
        category: d.category,
        name: d.name,
        designImage: d.designImage,
      };
      designList.push(list);
    });
    const countDesign = await Design.countDocuments(query);
    // Last-Page라는 커스텀 HTTP 헤더를 설정
    ctx.set("Last-Page", Math.ceil(countDesign / listLimit));
    ctx.body = designList;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 디자인 작성
POST /api/design
{ 
  "category": "photoshop",
  "name": "영어캠프 팝업창1"
}
*/
export const write = async (ctx) => {
  // 요청된 객체 검증
  const schema = Joi.object().keys({
    category: Joi.string().required(),
    name: Joi.string().required(),
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

  // 파일 객체 담기
  const files = ctx.request.files;
  const designImageFile = files.designImage;

  console.log("designImageFile ", designImageFile);

  const designImage = {
    name: designImageFile.name,
    url: generateUrl(designImageFile.path),
  };

  const design = new Design({
    ...requestBody,
    designImage,
  });

  console.log("write design ", design);
  try {
    await design.save();
    ctx.body = design;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 디자인 업데이트
PATCH /api/design/:id
{ 
  "id": "",
  "name": "팝업창",
}
*/
export const update = async (ctx) => {
  const { id } = ctx.params;

  // 요청된 객체 검증
  const schema = Joi.object().keys({
    category: Joi.string().required(),
    name: Joi.string().required(),
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

  // 파일 객체 담기
  const files = ctx.request.files;
  const updateDesignImage = files.designImage;

  const updateDesign = {
    ...requestBody,
    ...(updateDesignImage && {
      designImage: {
        name: updateDesignImage.name,
        url: generateUrl(updateDesignImage.path),
      },
    }),
  };

  try {
    const originalDesign = await Design.findOne({
      _id: id,
    });

    updateDesignImage &&
      fs.unlink(
        path.join(__dirname, "../../uploads", originalDesign.designImage.url),
        (err) => {
          if (err) throw err;
          console.log(
            "designImage -",
            originalDesign.designImage.url,
            "deleted"
          );
        }
      );

    const design = await Design.findOneAndUpdate(
      { _id: id },
      { $set: updateDesign },
      {
        new: true,
      }
    );
    if (!design) {
      ctx.status = 404;
      return;
    }

    console.log("updated design", design);
    ctx.body = design;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 디자인 삭제
DELETE /api/design/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  console.log(id);
  try {
    const originalDesign = await Design.findOne({ _id: id });

    fs.unlink(
      path.join(__dirname, "../../uploads", originalDesign.designImage.url),
      (err) => {
        if (err) throw err;
        console.log("designImage -", originalDesign.designImage.url, "deleted");
      }
    );

    await Design.deleteOne({ _id: id });

    ctx.status = 204; // No Content
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 디자인 스킬 카테고리 조회
GET /api/design/category
*/
export const category = async (ctx) => {
  try {
    let categoryArray = [];
    const design = await Design.find();
    console.log(design);
    design.map((d) => {
      categoryArray.push(d.category);
    });
    const category = [...new Set(categoryArray)];
    categoryArray.length === 0 ? (ctx.body = null) : (ctx.body = category);
    console.log("category", category);
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 디자인 개수 조회
GET /api/design/countDesign
*/
export const countDesign = async (ctx) => {
  try {
    const design = await Design.find();
    console.log("디자인 개수", design.length);
    ctx.body = design.length;
  } catch (e) {
    ctx.throw(500, e);
  }
};
