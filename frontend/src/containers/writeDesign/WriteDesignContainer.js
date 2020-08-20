import React, { useCallback, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  changeField,
  writeDesign,
  initializeWrite,
  updateDesign,
} from "../../modules/writeDesign";
import { withRouter } from "react-router-dom";
import WriteDesign from "./../../components/writeDesign/WriteDesign";
import { initializeDesign } from "../../modules/design";

const WriteDesignContainer = ({ history }) => {
  const dispatch = useDispatch();
  const designImageRef = useRef(null);
  const {
    id,
    category,
    name,
    designImage,
    user,
    design,
    designError,
  } = useSelector(({ writeDesign, user }) => ({
    id: writeDesign.id,
    category: writeDesign.category,
    name: writeDesign.name,
    designImage: writeDesign.designImage,
    user: user.user,
    design: writeDesign.design,
    designError: writeDesign.designError,
  }));

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch]
  );

  const onPublish = () => {
    const formData = new FormData();

    formData.append("category", category);
    formData.append("name", name);

    designImageRef.current !== null &&
      formData.append("designImage", designImageRef.current);

    // 업데이트
    if (id) {
      dispatch(updateDesign({ id, formData }));
      return;
    }

    // 포트폴리오 작성
    dispatch(writeDesign(formData));
  };

  useEffect(() => {
    if (!user) {
      history.go(-1);
    }

    if (!id && !designError) {
      dispatch(initializeWrite());
    }

    if (design) {
      dispatch(initializeDesign());
      history.push(`/design?category=${design.category}`);
    }

    if (designError) {
      console.log(designError);
    }

    return () => {
      if (design && !designError) {
        dispatch(initializeWrite());
      }
    };
  }, [dispatch, user, history, design, designError, id]);

  return (
    <WriteDesign
      onChangeField={onChangeField}
      onPublish={onPublish}
      id={id}
      category={category}
      name={name}
      designImage={designImage}
      designImageRef={designImageRef}
      designError={designError}
      user={user}
    />
  );
};

export default withRouter(WriteDesignContainer);
