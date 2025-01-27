import Header from "../components/header";
import Main from "../components/main";
import Items from "../components/main/items";

export default () => {
  return (
    <>
      <Header title="sub" />
      <Main>
        <Items />
      </Main>
    </>
  );
};
