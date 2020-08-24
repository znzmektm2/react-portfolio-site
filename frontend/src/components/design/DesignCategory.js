import React from "react";
import Responsive from "./../common/Responsive";
import Category from "./../common/Category";

const DesignCategory = ({
  categories,
  error,
  loading,
  clickDesignRadiobox,
}) => {
  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (!categories) {
    // 로딩중이면서 카테고리가 없을 시
    if (loading) {
      return null;
    }
    // 로딩중이 아니면서 카테고리가 없을 시
    if (!loading) {
      return (
        <Category>
          <Responsive>
            <ul>
              <li>데이터가 없습니다.</li>
            </ul>
          </Responsive>
        </Category>
      );
    }
  }

  return (
    <Category>
      <Responsive>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <input
                type="radio"
                name="category"
                value={category}
                defaultChecked={category === "Photoshop" && "true"}
                onClick={clickDesignRadiobox}
                className="designInput"
              />
              <label htmlFor={category}>{category}</label>
            </li>
          ))}
        </ul>
      </Responsive>
    </Category>
  );
};

export default DesignCategory;
