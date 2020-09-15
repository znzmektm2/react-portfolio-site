import React, { useEffect, useState, useCallback } from "react";
import DesignCategory from "./../../components/design/DesignCategory";
import { useSelector, useDispatch } from "react-redux";
import { category } from "../../modules/design";
import { withRouter } from "react-router-dom";
import qs from "qs";

const DesignCategoryContainer = ({ history, location }) => {
  const dispatch = useDispatch();
  const [designRadiobox, setDesignRadiobox] = useState(null);
  const { categories, error, loading } = useSelector(({ design, loading }) => ({
    categories: design.category,
    error: design.error,
    loading: loading["design/CATEGORY"],
  }));

  // 디자인 라디오박스 클릭시 클릭된 값 저장하는 이벤트
  const clickDesignRadiobox = useCallback((e) => {
    setDesignRadiobox(e.target.value);
  }, []);

  // URL query에 따라 체크박스 유지하는 함수
  const designInputCheckedByUrl = useCallback(
    (value) => {
      const { category } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      return value === category || false;
    },
    [location.search]
  );

  // 카테고리 API 호출
  useEffect(() => {
    dispatch(category());
  }, [dispatch]);

  // 라디오박스 클릭시 URL 이동
  useEffect(() => {
    !!designRadiobox && history.push(`/design?category=${designRadiobox}`);
  }, [history, designRadiobox]);

  // 라디오박스 체크 초기화
  useEffect(() => {
    const { category } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    if (category === "Photoshop") {
      const designInput = Array.from(
        document.getElementsByClassName("designInput")
      );
      designInput.map((i) => (i.checked = i.value === "Photoshop" || false));
    }
  }, [location.search]);

  return (
    <DesignCategory
      categories={categories}
      error={error}
      loading={loading}
      clickDesignRadiobox={clickDesignRadiobox}
      designRadiobox={designRadiobox}
      designInputCheckedByUrl={designInputCheckedByUrl}
    />
  );
};

export default withRouter(DesignCategoryContainer);
