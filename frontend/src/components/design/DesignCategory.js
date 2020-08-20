import React from "react";
import styled from "styled-components";
import Responsive from "./../common/Responsive";

const DesignCategoryBlock = styled.div`
  position: relative;
  margin: 0 -1px;
  padding: 1rem 0;

  color: #e0e0dc;
  border: 1px solid #1b1b1b;
  z-index: 1;
  ul {
    display: flex;
    justify-content: center;
    li {
      position: relative;
      margin: 1rem 2rem;
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 1;
        cursor: pointer;
      }
      label {
        display: inline-block;
        padding: 0.3rem 1rem;
        font-family: "KoPub Batang", serif;
      }
      input:checked + label {
        border-bottom: 1px solid #e0e0dc;
      }
    }
  }
`;

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
      return <div>데이터가 없습니다.</div>;
    }
  }

  return (
    <DesignCategoryBlock>
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
    </DesignCategoryBlock>
  );
};

export default DesignCategory;
