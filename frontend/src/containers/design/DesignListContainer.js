import React, { useEffect, useCallback } from "react";
import qs from "qs";
import { withRouter } from "react-router-dom";
import DesignList from "../../components/design/DesignList";
import { useDispatch, useSelector } from "react-redux";
import useIO from "./../../lib/useIO";
import { design, currentPage, initializeDesign } from "../../modules/design";
import { setOriginalDesign } from "../../modules/writeDesign";
import { removeDesign } from "./../../lib/api/design";

const DesignListContainer = ({ location, history }) => {
  const dispatch = useDispatch();
  const [observer, setElements, entries] = useIO({
    threshold: 0,
    root: null,
  });
  const {
    designList,
    designError,
    designLoading,
    page,
    lastPage,
    user,
  } = useSelector(({ design, loading, user }) => ({
    designList: design.design,
    designError: design.designError,
    designLoading: loading["design/DESIGN"],
    page: design.currentPage,
    lastPage: design.lastPage,
    user: user.user,
  }));

  const onEdit = (design) => {
    dispatch(setOriginalDesign(design));
    history.push("/writeDesign");
  };

  const onRemove = async (id, category) => {
    try {
      await removeDesign(id);
      dispatch(initializeDesign());
      history.push(`/design?category=${category}`);
    } catch (e) {
      console.log(e);
    }
  };

  const loadDesign = useCallback(
    (page) => {
      const { category } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      dispatch(
        design({
          category,
          page,
        })
      );
    },
    [dispatch, location.search]
  );

  const searchDesign = useCallback(() => {
    // 포트폴리오 리스트, currentPage 초기화
    dispatch(initializeDesign());
    // 디자인 API 호출 이벤트
    loadDesign();
  }, [dispatch, loadDesign]);

  // 다음 페이지 디자인 API 호츌 이벤트
  const loadMoreDesign = useCallback(async () => {
    if (designList.length > 0) {
      dispatch(currentPage(page + 1));
      loadDesign(page + 1);
    }
  }, [dispatch, designList.length, page, loadDesign]);

  // 스크롤 타겟 관리(img, .bottomTarget)
  useEffect(() => {
    if (!designLoading && designList) {
      const img = document.querySelectorAll(".lazy");
      const bottomTarget = document.getElementsByClassName("bottomTarget");
      const array = [...img, ...bottomTarget];
      setElements(array);
    }
  }, [designLoading, designList, setElements]);

  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 이미지에 appear 클래스 추가
        let target = entry.target;
        if (target.tagName === "IMG") {
          target.src = target.dataset.src;
          target.classList.remove("lazy");
          target.parentNode.parentNode.parentNode.parentNode.classList.add(
            "appear"
          );
          observer.unobserve(target);
        }

        // 리스트를 끝까지 내렸을 때 다음 페이지 API 호출
        if (!designLoading && page < lastPage) {
          loadMoreDesign();
        }
      }
    });
  }, [entries, observer, designLoading, page, lastPage, loadMoreDesign]);

  // 디자인 메뉴 클릭시 디자인 초기화
  useEffect(() => {
    if (!location.search && history.action === "PUSH") {
      dispatch(initializeDesign());
    }
  }, [location.search, history.action, dispatch]);

  // 첫번째 카테고리 API 호출
  useEffect(() => {
    if (location.search === "") {
      history.push("/design?category=Photoshop");
    } else {
      searchDesign();
    }
  }, [location, history, searchDesign]);

  // header와 footer에 클래스 dark 추가
  useEffect(() => {
    const header = document.getElementsByTagName("header")[0];
    const footer = document.getElementsByClassName("footer")[0];

    if (location.pathname === "/design") {
      header.classList.add("dark");
      footer.classList.add("dark");
    }
    return () => {
      header.classList.remove("dark");
      footer.classList.remove("dark");
    };
  }, [location]);

  return (
    <>
      <DesignList
        designList={designList}
        designError={designError}
        designLoading={designLoading}
        user={user}
        onEdit={onEdit}
        onRemove={onRemove}
      />
    </>
  );
};

export default withRouter(DesignListContainer);
