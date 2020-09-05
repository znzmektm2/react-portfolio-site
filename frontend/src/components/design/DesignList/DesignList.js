import React from "react";
import "./DesignList.scss";
import Image from "./../../common/Image";
import { DelayLink } from "./../../common/DelayLink";
import Button from "./../../common/Button";

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
    const listWrapWidth = buttonImgWrap.clientWidth;
    const imgWrap = buttonImgWrap.childNodes[1];
    const img = imgWrap.childNodes[0].childNodes[0].childNodes[0];
    const imgNaturalWidth = img.naturalWidth;
    const imgNaturalHeight = img.naturalHeight;
    const calcHeight = (listWrapWidth * imgNaturalHeight) / imgNaturalWidth;

    buttonImgWrap.parentNode.classList.toggle("active");

    console.log(imgNaturalWidth);
    console.log(imgNaturalHeight);
    if (buttonImgWrap.parentNode.className === "listWrap active") {
      // 이미지 가로 사이즈가 .listWrap 가로 사이즈보다 작을 때
      if (listWrapWidth > imgNaturalWidth) {
        imgWrap.style.width = imgNaturalWidth + "px";

        if (navigator.userAgent.match(/Trident\/7\./)) {
          imgWrap.style.maxHeight = "none";
          imgWrap.style.height = img.naturalHeight + "px";
        } else {
          imgWrap.style.maxHeight = img.naturalHeight + "px";
        }
      } else {
        imgWrap.style.width = "100%";

        if (navigator.userAgent.match(/Trident\/7\./)) {
          imgWrap.style.maxHeight = "none";
          imgWrap.style.height = calcHeight + "px";
        } else {
          imgWrap.style.maxHeight = calcHeight + "px";
        }
      }
    } else {
      imgWrap.style.removeProperty("width");
      imgWrap.style.removeProperty("height");
      imgWrap.style.removeProperty("max-height");
    }
  };

  if (designError) {
    return (
      <div className="designListBlock">
        <div className="wrap">에러가 발생했습니다.</div>
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
          <div className="wrap">
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
          </div>
        </div>
      );
    }
  }

  return (
    <div className="designListBlock">
      <div className="wrap">
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
                <div className="listWrap">
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
                        design
                        index={index}
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
      </div>
    </div>
  );
};

export default DesignList;
