import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Category from "./../../components/portfoilos/Category";
import { category } from "../../modules/portfolios";

const CategoryContainer = () => {
  const dispatch = useDispatch();
  const { categories, error, loading } = useSelector(
    ({ portfolios, loading }) => ({
      categories: portfolios.category,
      error: portfolios.error,
      loading: loading["portfolios/CATEGORY"],
    })
  );

  useEffect(() => {
    dispatch(category());
  }, [dispatch]);

  return <Category categories={categories} error={error} loading={loading} />;
};

export default CategoryContainer;
