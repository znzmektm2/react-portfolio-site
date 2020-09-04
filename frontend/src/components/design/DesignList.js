import React from "react";
import "./DesignList.scss";
import Image from "./../common/Image";
import Responsive from "./../common/Responsive";
import { DelayLink } from "./../common/DelayLink";
import Button from "./../common/Button";

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
      <div className="designListBlock">
        <Responsive>에러가 발생했습니다.</Responsive>
      </div>
    );
  }

  if (!designList.length) {
    // 로딩중이면서 포트폴리오가 없을 시
    if (designLoading) {
      return <div className="designListBlock" />;
    }
    // 로딩중이 아니면서 포트폴리오가 없을 시
    if (!designLoading) {
      return (
        <div className="designListBlock">
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
        </div>
      );
    }
  }

  return (
    <div className="designListBlock">
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
                          className="removeBtn"
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
    </div>
  );
};

export default DesignList;
