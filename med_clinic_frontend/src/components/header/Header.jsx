import { BrowserRouter, Link } from "react-router-dom";

import { entities, translateEntityPlural } from "../../models/entities_mappings";
import "../../styles/header.css";

const createHeader = (entities) => {
    let path = window.location.pathname.split("/")[1];
    return (
        entities.map((entity, idx) => {
            let className = "header-link";
            if (path === entity) className = className + " active-header-link";
            return <Link reloadDocument to={"/" + entity} className={className} key={idx}>{translateEntityPlural(entity)}</Link>
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