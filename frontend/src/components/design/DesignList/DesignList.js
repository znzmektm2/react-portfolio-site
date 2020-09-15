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
    const imgBox = e.currentTarget;
    const contWrap = imgBox.parentNode;
    const listWrap = imgBox.parentNode.parentNode;
    const listWrapWidth = listWrap.clientWidth;
    const imgDiv = imgBox.childNodes[0];
    const img = imgDiv.childNodes[0].childNodes[0];
    const imgNaturalWidth = img.naturalWidth;
    const imgNaturalHeight = img.naturalHeight;
    const calcHeight = (listWrapWidth * imgNaturalHeight) / imgNaturalWidth;

    listWrap.classList.toggle("active");

    if (listWrap.className === "listWrap active") {
      // 이미지 가로 사이즈가 .listWrap 가로 사이즈보다 작을 때
      if (listWrapWidth > imgNaturalWidth) {
        contWrap.style.width = imgNaturalWidth + "px";
        imgBox.style.maxHeight = img.naturalHeight + "px";
      } else {
        contWrap.style.width = "100%";
        imgBox.style.maxHeight = calcHeight + "px";
      }
    } else {
      contWrap.style.removeProperty("width");
      imgBox.style.removeProperty("max-height");
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
                  <div className="contWrap">
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
                            onRemove(list._id);
                          }}
                          className="removeBtn"
                        >
                          삭제
                        </Button>
                      </div>
                    )}
                    <div className="imgBox" onClick={onClick}>
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
                  <h3>
                    <span className="category">{list.category}.</span>
                    {list.name}
                  </h3>
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
