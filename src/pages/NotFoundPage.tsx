import {FC} from "react";
import {Link} from "react-router-dom";

const NotFoundPage: FC = () => {
    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "24px",
        }}>
            <h1 style={{fontSize: "4rem", margin: 0}}>404</h1>
            <p style={{fontSize: "1.2rem", margin: "16px 0"}}>
                Сторінку не знайдено / Page not found
            </p>
            <Link to="/" style={{textDecoration: "underline"}}>
                На головну / Back home
            </Link>
        </div>
    );
};

export {NotFoundPage};
