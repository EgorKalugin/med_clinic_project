import { useEffect, useState } from 'react';

import ElementCart from "./ElementCart";

import { ENTITY_TO_URL_MAP } from "../../constants/entities";

const ElementsPage = (props) => {
    const [data, setData] = useState();
    let entity = props.entity;

    useEffect((entity) => {
        const dataFetch = async () => {
            let url = ENTITY_TO_URL_MAP[entity];
            if (url === undefined) {
                setData(<div>URL NOT FOUND</div>);
                return;
            }
            try {
                console.log(url);
                const res = await fetch(
                    url
                )
                if (res.status !== 200) {
                    setData(<div>Status: {res.status}</div>);
                    return;
                }
                const res_json = await (res).json();
                console.log(res_json);
                setData(res_json.map((data, idx) => <ElementCart key={idx} data={data} />));
            } catch (e) {
                console.log(e);
                setData(<div>500</div>);
            }
        };

        if (entity in ENTITY_TO_URL_MAP === false) {
            setData("404")
        } else { dataFetch(); }
    }, []);

    return (
        <div id="workspace">
            <div id="section-title">
                Element Page Text {entity}
            </div>
            {data}
        </div>
    );
}

export default ElementsPage;