import { useEffect, useState } from 'react';

import ElementCart from "./ElementCart";

import { ENTITY_TO_URL_MAP } from "../../constants/entities";

const ElementsPage = (props) => {
    const [data, setData] = useState();
    let entity = props.entity;

    useEffect(() => {
        const dataFetch = async () => {
            let url;
            try {
                url = ENTITY_TO_URL_MAP[entity];
            } catch (e) {
                console.log(e);
            }
            if (url == undefined) {
                console.log("404");
                setData(<div>404</div>);
                return;
            }
            try {
                const res = await (
                    await fetch(
                        url
                    )
                ).json();
                setData(res.map((data, idx) => <ElementCart key={idx} product={data} />));
            } catch (e) {
                console.log(e);
                setData(<div>500</div>);
            }
        };

        if (entity in ENTITY_TO_URL_MAP == false) {
            setData("404")
        } else { dataFetch(); }
    }, []);

    return (
        <div id="workspace">
            <div id="section-title">
                Element Page Text
            </div>
            {data}
        </div>
    );
}

export default ElementsPage;