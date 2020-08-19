import React, { useEffect } from "react";
import styled from "styled-components";
import Image from "./../common/Image";
import Responsive from "./../common/Responsive";
import { DelayLink } from "./../common/DelayLink";

const DesignListBlock = styled.div`
  position: relative;
  padding: 10rem 0;
  background: none;
  color: #c8c9b9;
  overflow: hidden;
  z-index: 1;
  .resposiveBlock {
    max-width: 1500px;
  }

  .writeButtonArea {
    overflow: hidden;
    a {
      float: right;
      font-size: 1rem;
      line-height: 2rem;
      color: #afafaf;
    }
  }
  .designList {
    position: relative;
    margin: 1rem auto 0;
    max-width: 100%;
    ul {
      width: 50%;
      display: inline-block;
      vertical-align: top;
      li {
        margin-bottom: 15vh;
        width: 100%;
        display: inline-block;
        vertical-align: top;
        line-height: 0;
        transform: translate3d(0, 120px, 0);
        opacity: 0;
        transition: all 1.5s;
        &.appear {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
        > div {
          position: relative;
          padding: 5rem;
          min-width: 90%;
          cursor: pointer;
          .buttonBox {
            text-align: right;
            transition: all 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);
            button {
              margin: 1rem 0 1rem 1rem;
              padding: 0.5rem 1rem;
              color: #fff;
              border: 1px solid #525252;
              outline: none;
              background: none;
              cursor: pointer;
            }
          }
          h3 {
            position: absolute;
            top: -0.8rem;
            right: 94%;
            padding-left: 1.1rem;
            font-family: "KoPub Batang", serif;
            font-size: 12px;
            line-height: 18px;
            color: #afafaf;
            white-space: nowrap;
            transform: rotate(-90deg);
            transform-origin: right bottom;
            transition: all 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);
            &:before {
              content: "";
              position: absolute;
              top: 40%;
              left: 0;
              width: 10px;
              height: 1px;
              background: #fff;
            }
            .category {
              padding-right: 0.4rem;
              display: inline-block;
              z-index: 2;
            }
          }

          .imgWrap {
            position: relative;
            display: block;
            max-height: 50vh;
            box-shadow: 0 0 20px #252525;
            overflow: hidden;
            transition: all 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);
            &:before {
              content: "";
              position: absolute;
              top: -10px;
              left: 0;
              width: 100%;
              height: 9rem;
              background-image: linear-gradient(
                0deg,
                rgba(12, 12, 12, 0),
                #292929
              );
              z-index: 1;
              transition: all 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);
            }
            img {
              width: 100%;
              opacity: 0.75;
              filter: grayscale(1);
              transition: all 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);
            }
          }
          &:hover {
            h3 {
              color: #fff;
            }
            .imgWrap {
              &:before {
                opacity: 0;
              }
              img {
                opacity: 1;
              }
            }
          }

          &.active {
            .buttonBox {
              transform: translateY(-1.5rem);
            }
            h3 {
              top: 2.3rem;
              color: #fff;
            }
            .imgWrap {
              max-height: 100vh;
              transform: translateY(-1.5rem);
              &:before {
                opacity: 0;
              }
              img {
                opacity: 1;
                filter: none;
              }
            }
          }
        }
      }
      &:first-child {
        margin-top: 30vh;
        margin-left: -5rem;
      }
      &:last-child {
        margin-right: -5rem;
        float: right;
        text-align: right;
      }
    }
  }
`;

const DesignList = ({
  designList,
  designError,
  designLoading,
  user,
  onEdit,
  onRemove,
}) => {
  const onClick = (e) => {
    e.currentTarget.classList.toggle("active");
  };

  console.log(designList);
  if (designError) {
    return (
      <DesignListBlock>
        <Responsive>에러가 발생했습니다.</Responsive>
      </DesignListBlock>
    );
  }

  if (!designList.length) {
    // 로딩중이면서 포트폴리오가 없을 시
    if (designLoading) {
      return <DesignListBlock />;
    }
    // 로딩중이 아니면서 포트폴리오가 없을 시
    if (!designLoading) {
      return (
        <DesignListBlock>
          <Responsive>
            {user ? (
              <div className="writeButtonArea">
                <DelayLink to="/writeDesign" open="true" className="writeBtn">
                  새 글 작성하기
                </DelayLink>
              </div>
            ) : (
              ""
            )}
            <p>데이터가 없습니다.</p>
          </Responsive>
        </DesignListBlock>
      );
    }
  }

  return (
    <DesignListBlock>
      <Responsive>
        {user ? (
          <div className="writeButtonArea">
            <DelayLink to="/writeDesign" open="true" className="writeBtn">
              새 글 작성하기
            </DelayLink>
          </div>
        ) : (
          ""
        )}
        <div className="designList">
          <ul>
            {designList.map(
              (list, index) =>
                index % 2 === 0 && (
                  <li key={list._id} className={index}>
                    <div onClick={onClick}>
                      {user && (
                        <div className="buttonBox">
                          <button
                            onClick={() => {
                              onEdit(list);
                            }}
                          >
                            수정
                          </button>
                          <button
                            onClick={() => {
                              onRemove(list._id);
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                      <h3>
                        <span className="category">{list.category}.</span>
                        {list.name}
                      </h3>
                      <span className="imgWrap">
                        <Image
                          src={list.designImage.url}
                          alt={list.designImage.name}
                          isLazy
                        />
                      </span>
                    </div>
                  </li>
                )
            )}
          </ul>
          <ul>
            {designList.map(
              (list, index) =>
                index % 2 !== 0 && (
                  <li key={list._id} className={index}>
                    <div onClick={onClick}>
                      {user && (
                        <div className="buttonBox">
                          <button
                            onClick={() => {
                              onEdit(list);
                            }}
                          >
                            수정
                          </button>
                          <button
                            onClick={() => {
                              onRemove(list._id);
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                      <h3>
                        <span className="category">{list.category}.</span>
                        {list.name}
                      </h3>
                      <span className="imgWrap">
                        <Image
                          src={list.designImage.url}
                          alt={list.designImage.name}
                          isLazy
                        />
                      </span>
                    </div>
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="bottomTarget" />
      </Responsive>
    </DesignListBlock>
  );
};

export default DesignList;
