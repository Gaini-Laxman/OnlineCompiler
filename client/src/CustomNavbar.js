export default function CustomNavbar(props) {
  return (
    <nav
      className="navbar navbar-light align-items-center"
      style={{
        backgroundColor: props.dark ? "rgb(39,39,39)" : "#f9f9f9",
        borderBottom: props.dark
          ? "1px solid #343a40"
          : "1px solid rgb(222,222,222)",
        height: "59px",
        alignItems: "center",
      }}
    >
      <div className="container-fluid">
        <a
          href="/"
          className="navbar-brand"
          style={{
            color: props.dark ? "white" : "black",
            fontSize: "19.9px",
            paddingLeft: "0.8vw",
            fontWeight: "normal",
          }}
        >
          <span
            style={{
              color: props.dark ? "#616161" : "#a7a0a0",
              fontWeight: "bold",
              marginRight: "7px",
              marginTop: "-3px",
            }}
          >
            &#60;/&#62;
          </span>
          OnlineCompiler
        </a>
        <div style={{ display: "flex", flexDirection: "row" }}></div>
      </div>
    </nav>
  );
}
