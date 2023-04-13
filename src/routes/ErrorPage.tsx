import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
        <h1>No way!</h1>
        <div>Sorry, an unexpected error has occurred.</div>
        <div>
            <i>{error.statusText || error.message}</i>
        </div>
    </div>
  );
}