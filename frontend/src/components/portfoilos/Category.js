import React from "react";
import styled from "styled-components";

const CategoryBlock = styled.div`
  ul {
    &:first-child {
      border-top: 1px solid #aaa;
    }
    border-bottom: 1px solid #aaa;
    display: flex;
    align-items: center;
    justify-content: center;
    li {
      position: relative;
      margin: 1rem 2rem;
      padding-left: 40px;
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        opacity: 0;
        z-index: 1;
      }
      label {
        display: inline-block;
        padding: 0 1rem;
        font-size: 1rem;
        line-height: 2.5rem;
        vertical-align: middle;
        color: #fff;
        background: #555;
      }
      label:before {
        content: "";
        position: absolute;
        top: 5px;
        left: 0;
        width: 30px;
        height: 30px;
        background: url(/images/icon_img.png) 0 -31px no-repeat;
        background-size: 30px 61px;
      }
      input:checked + label:before {
        background-position: 0 0;
      }
    }
  }
`;

const Category = ({
  categories,
  error,
  loading,
  clickSkillCheckbox,
  clickTypeCheckbox,
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
      return <div>데이터가 없습니다.</div>;
    }
  }

  document.getElementsByClassName("lazy");

  return (
    <>
      <CategoryBlock>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <input
                type="checkbox"
                name={category}
                value={`${category}`}
                onClick={clickSkillCheckbox}
                className="skillInput"
              />
              <label htmlFor={category}>{category}</label>
            </li>
          ))}
        </ul>
        <ul>
          <li key="web">
            <input
              type="checkbox"
              name="web"
              value="web"
              onClick={clickTypeCheckbox}
              className="typeInput"
            />
            <label htmlFor="web">Web</label>
          </li>
          <li key="singlepage">
            <input
              type="checkbox"
              name="singlePage"
              value="singlePage"
              onClick={clickTypeCheckbox}
              className="typeInput"
            />
            <label htmlFor="singlePage">SinglePage</label>
          </li>
        </ul>
      </CategoryBlock>
    </>
  );
};

export default Category;
