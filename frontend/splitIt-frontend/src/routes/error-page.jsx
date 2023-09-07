import { useRouteError } from "react-router-dom";
import '../index.css'
export default function ErrorPage() {
    const error = useRouteError();
    console.log(error);

    return (
        <div className="error-container">
            <div className="error">
            <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
                <a href = '/'>go back home...</a>
            </div>
        </div>
    );
}

