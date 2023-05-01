import { BrowserRouter, Link } from "react-router-dom";

import { entities, translateEntityPlural } from "../../models/entities_mappings";
import "../../styles/header.css";

const createHeader = (entities) => {
    let path = window.location.pathname;
    if (path[path.length - 1] === "/") path = path.slice(0, path.length - 1);
    return (
        entities.map((entity, idx) => {
            if (path === "/" + entity) return;
            return <Link reloadDocument to={"/" + entity} className="header-link" key={idx}>{translateEntityPlural(entity)}</Link>
        })
    );
};

const Header = () => {
    return (
        <BrowserRouter>
            <div id="header">
                {createHeader(entities)}
            </div>
        </BrowserRouter>
    );
};

export default Header;