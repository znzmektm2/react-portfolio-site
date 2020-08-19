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

const DesignCategory = () => {
  return (
    <DesignCategoryBlock>
      <Responsive>
        <ul>
          <li>
            <input
              type="radio"
              name="category"
              value="Photoshop"
              defaultChecked="true"
            />
            <label htmlFor="Photoshop">Photoshop</label>
          </li>
          <li>
            <input type="radio" name="category" value="Illustration" />
            <label htmlFor="Illustration">Illustration</label>
          </li>
          <li>
            <input type="radio" name="category" value="Corelldraw" />
            <label htmlFor="Corelldraw">Corelldraw</label>
          </li>
          <li>
            <input type="radio" name="category" value="Drawing" />
            <label htmlFor="Drawing">Drawing</label>
          </li>
          <li>
            <input type="radio" name="category" value="Foodstyling" />
            <label htmlFor="Foodstyling">Foodstyling</label>
          </li>
          <li>
            <input type="radio" name="category" value="ETC" />
            <label htmlFor="ETC">ETC</label>
          </li>
        </ul>
      </Responsive>
    </DesignCategoryBlock>
  );
};

export default DesignCategory;
