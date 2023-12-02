import { useRouteError } from "react-router-dom";
import logo from "/assets/picto.svg";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <div>
        <img id="logo" className="disableSelect" src={logo} draggable="false" />
      </div>
      <h1>Oof</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{`${error.status}`.concat(" ", `${error.statusText}`)}</i>
      </p>
    </div>
  );
}
