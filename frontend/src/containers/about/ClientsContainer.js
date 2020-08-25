import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clients } from "../../modules/portfolios";
import Clients from "./../../components/about/Clients";

const ClientsContainer = () => {
  const dispatch = useDispatch();
  const { clientsList } = useSelector(({ portfolios }) => ({
    clientsList: portfolios.clients,
  }));

  useEffect(() => {
    dispatch(clients());
  }, [dispatch]);

  return <Clients clientsList={clientsList} />;
};

export default ClientsContainer;
