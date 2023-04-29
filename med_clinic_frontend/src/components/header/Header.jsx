import { BrowserRouter, Link } from "react-router-dom";

import { entities } from "../../constants/entities";
import "../../styles/header.css";

const Header = () => {
    return (
        <BrowserRouter>
            <div id="header">
                {entities.map((entity, idx) => <Link reloadDocument to={"/" + entity} className="header-link" key={idx}>{entity}</Link>)}
            </div>
        </BrowserRouter>
    );
}

export default Header;