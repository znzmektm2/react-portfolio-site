import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countDesign } from "../../modules/design";
import { countPortfolio } from "../../modules/portfolios";
import MenuText from "./../../components/common/MenuText";

const MenuTextContainer = React.memo(() => {
  const dispatch = useDispatch();
  const { designNumber, portfolioNumber } = useSelector(
    ({ design, portfolios }) => ({
      designNumber: design.countDesign,
      portfolioNumber: portfolios.countPortfolio,
    })
  );
  useEffect(() => {
    // 디자인 카운트 API 호출
    dispatch(countDesign());

    // 포트폴리오 카운트 API 호출
    dispatch(countPortfolio());
  }, [dispatch]);

  return (
    <MenuText designNumber={designNumber} portfolioNumber={portfolioNumber} />
  );
});

export default MenuTextContainer;
