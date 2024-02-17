import { Button } from "@mantine/core";
import { useLinkClickHandler, useRouteError } from "react-router-dom";
import { PictoLogoLargeComponent } from "../_icons/IconComponents";

export default function ErrorPage() {
  const error = useRouteError();
  let displayError = undefined;

  if (error.status && error.statusText) {
    displayError = `${error.status}: ` + `${error.statusText}`;
  } else if (error) {
    const maxLength = 75;
    const string = `${error}`;
    displayError =
      string.length > maxLength
        ? string.substring(0, maxLength - 3).concat("...")
        : string;
  }

  return (
    <div id="error-page">
      <div>
        <PictoLogoLargeComponent />
      </div>
      <h1>Oof</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{displayError}</i>
      </p>
      <Button onClick={useLinkClickHandler("/")}>Return Home</Button>
    </div>
  );
}
