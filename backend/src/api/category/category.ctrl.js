import Category from "../../models/category";

/* 카테고리 추가
POST /api/category
{ 
  "category": "사이트"
}
*/
export const add = async (ctx) => {
  const { category } = ctx.request.body;
  const categories = new Category({
    category,
  });
  try {
    await categories.save();
    ctx.body = categories;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 카테고리 조회
GET /api/category
*/
export const list = async (ctx) => {
  try {
    const categories = await Category.find();
    ctx.body = categories;
  } catch (e) {
    ctx.throw(500, e);
  }
};
