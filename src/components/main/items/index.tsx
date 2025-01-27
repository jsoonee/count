import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "./Header";
import { useItem } from "../../../context/ItemContext";
import Cards from "./Cards";

export default () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { list } = useItem();
  const items = id && list.find((sub) => sub.subjectId === id);
  useEffect(() => {
    if (!items) navigate("/");
  });
  return (
    <>
      <Header id={id} />
      <Cards id={id} />
    </>
  );
};
