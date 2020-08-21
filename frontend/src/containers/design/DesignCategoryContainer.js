import React, { useEffect, useState, useCallback } from "react";
import qs from "qs";
import DesignCategory from "./../../components/design/DesignCategory";
import { useSelector, useDispatch } from "react-redux";
import { category } from "../../modules/design";
import { withRouter } from "react-router-dom";

const DesignCategoryContainer = ({ history, location }) => {
  const dispatch = useDispatch();
  const [designRadiobox, setDesignRadiobox] = useState(null);
  const { categories, error, loading } = useSelector(({ design, loading }) => ({
    categories: design.category,
    error: design.error,
    loading: loading["design/CATEGORY"],
  }));

  // 디자인 라디오박스 클릭 이벤트
  const clickDesignRadiobox = useCallback((e) => {
    // 디자인 라디오박스 클릭시 useState에 배열 넣기
    setDesignRadiobox(e.target.value);
  }, []);

  // 카테고리 API 호출
  useEffect(() => {
    dispatch(category());
  }, [dispatch]);

  // 라디오박스 클릭시 URL 이동
  useEffect(() => {
    !!designRadiobox && history.push(`/design?category=${designRadiobox}`);
  }, [history, designRadiobox]);

  // URL query에 따라 체크박스 유지하기
  useEffect(() => {
    const { category } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const designInputArr = Array.from(
      document.getElementsByClassName("designInput")
    );

    designInputArr.map((input) => {
      input.checked = false;
      return (() => {
        if (input.value === category) {
          input.checked = true;
        }
      })();
    });
  });

  return (
    <DesignCategory
      categories={categories}
      error={error}
      loading={loading}
      clickDesignRadiobox={clickDesignRadiobox}
    />
  );
};

export default withRouter(DesignCategoryContainer);
