import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CategoryBlock = styled.div`
  margin-bottom: -1px;
  padding: 1rem;
  border: 1px solid #aaa;

  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    li {
      margin: 1rem;
      a {
        padding: 0.5rem 1rem;
        color: #fff;
        background: #555;
      }
    }
  }
`;

const Category = ({ categories, error, loading }) => {
  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <>
      <CategoryBlock>
        {!loading && categories && (
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <Link to={`/portfolios?skill=${category}`}>{category}</Link>
              </li>
            ))}
          </ul>
        )}
      </CategoryBlock>
      <CategoryBlock>
        <ul>
          <li key="web">
            <Link to={"/portfolios?web=true"}>WEB</Link>
          </li>
          <li key="singlepage">
            <Link to={"/portfolios?singlePage=true"}>SinglePage</Link>
          </li>
        </ul>
      </CategoryBlock>
    </>
  );
};

export default Category;
