import React from "react";
import Category from "./../../common/Category";

const DesignCategory = React.memo(
  ({
    categories,
    error,
    loading,
    clickDesignRadiobox,
    designInputCheckedByUrl,
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
            <div className="wrap">
              <ul>
                <li>데이터가 없습니다.</li>
              </ul>
            </div>
          </Category>
        );
      }
    }

    return (
      <Category>
        <div className="wrap">
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <input
                  type="radio"
                  name="category"
                  value={category}
                  defaultChecked={designInputCheckedByUrl(category)}
                  onClick={clickDesignRadiobox}
                  className="designInput"
                />
                <label htmlFor={category}>{category}</label>
              </li>
            ))}
          </ul>
        </div>
      </Category>
    );
  }
);

export default DesignCategory;
