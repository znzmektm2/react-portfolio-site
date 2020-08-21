import React from "react";
import styled from "styled-components";
import Image from "./../common/Image";
import Responsive from "./../common/Responsive";
import { DelayLink } from "./../common/DelayLink";
import Button from "./../common/Button";

const DesignListBlock = styled.div`
  position: relative;
  padding: 10rem 0;
  min-height: 100vh;
  background: none;
  color: #c8c9b9;
  overflow: hidden;
  z-index: 1;

  .writeButtonArea {
    overflow: hidden;
    a {
      padding: 0.3rem;
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
      li {
        padding: 0 5rem;
        width: 100%;
        display: inline-block;
        vertical-align: top;
        line-height: 0;
        transform: translate3d(0, 120px, 0);
        opacity: 0;
        transition: all 1.5s;
        &:nth-child(even) {
          text-align: right;
          .wrap {
            h3 {
              right: auto;
              left: calc(100% + 4rem);
              top: -4rem;
              transform-origin: left top;
              transform: rotate(90deg);
            }
            &.active {
              h3 {
                top: 0.1rem;
              }
            }
          }
        }
        &.appear {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
        .wrap {
          position: relative;
          transition: all 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);
          h3 {
            position: absolute;
            top: -5rem;
            right: calc(100% + 4rem);
            padding-left: 1.1rem;
            font-family: "KoPub Batang", serif;
            font-size: 0.75rem;
            line-height: 1rem;
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
          .buttonImgWrap {
            display: inline-block;
            position: relative;
            width: 40%;
            max-width: 100%;
            transition: all 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);
            cursor: pointer;
            .buttonBox {
              text-align: right;
              transition: all 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);
              button {
                margin: 0 0 1rem 1rem;
                color: #fff;
              }
            }

            .imgWrap {
              position: relative;
              display: block;
              width: 100%;
              max-height: 50vh;
              box-shadow: 0 0 40px -10px #292929;
              overflow: hidden;
              transition: all 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);

              &:before {
                content: "";
                position: absolute;
                top: -10px;
                left: -1%;
                right: -1%;
                width: 102%;
                height: 9rem;
                background-image: linear-gradient(
                  0deg,
                  rgba(0, 0, 0, 0),
                  #000000bf
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
            .index {
              display: inline-block;
              font-family: "KoPub Batang", serif;
              color: #e0e0dc;
              font-size: 0.75rem;
              line-height: 1rem;
              margin-top: 0.5rem;
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
          }
          &.active {
            margin: 4rem 0;
            h3 {
              top: -1.1rem;
              color: #fff;
            }
            .buttonImgWrap {
              width: 100%;
              .imgWrap {
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
    const buttonImgWrap = e.currentTarget;
    const imgWrap = buttonImgWrap.childNodes[1];
    const wrapWidth =
      imgWrap.parentNode.parentNode.parentNode.childNodes[0].clientWidth;
    const img = imgWrap.childNodes[0];
    const imgNaturalWidth = img.naturalWidth;
    const imgNaturalHeight = img.naturalHeight;
    const calcHeight = (wrapWidth * imgNaturalHeight) / imgNaturalWidth;

    buttonImgWrap.parentNode.classList.toggle("active");

    if (buttonImgWrap.parentNode.className === "wrap active") {
      if (wrapWidth > imgNaturalWidth) {
        buttonImgWrap.style.width = imgNaturalWidth + "px";
        imgWrap.style.maxHeight = img.naturalHeight + "px";
      } else {
        imgWrap.style.maxHeight = calcHeight + "px";
      }
    } else {
      buttonImgWrap.style.removeProperty("width");
      imgWrap.style.removeProperty("max-height");
    }
  };

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
            {designList.map((list, index, array) => (
              <li key={list._id}>
                <div className="wrap">
                  <h3>
                    <span className="category">{list.category}.</span>
                    {list.name}
                  </h3>
                  <div className="buttonImgWrap" onClick={onClick}>
                    {user && (
                      <div className="buttonBox">
                        <Button
                          onClick={() => {
                            onEdit(list);
                          }}
                        >
                          수정
                        </Button>
                        <Button
                          onClick={() => {
                            onRemove(list._id, list.category);
                          }}
                        >
                          삭제
                        </Button>
                      </div>
                    )}

                    <div className="imgWrap">
                      <Image
                        src={list.designImage.url}
                        alt={list.designImage.name}
                        isLazy
                      />
                    </div>
                    <span className="index">{array.length - index}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bottomTarget" />
      </Responsive>
    </DesignListBlock>
  );
};

export default DesignList;
