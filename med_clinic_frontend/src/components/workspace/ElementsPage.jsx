import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ENTITY_TO_URL_MAP_GET, translateEntityPlural } from "../../models/entities_mappings";
import "../../styles/ElementsPage.css";
import ElementCart from "./ElementCart";


const ElementsPage = (props) => {
    const entity = props.entity;

    const [data, setData] = useState();

    const navigate = useNavigate();

    const renderElements = (entity) => {
        const dataFetch = async () => {
            let url = ENTITY_TO_URL_MAP_GET[entity];
            if (url === undefined) {
                setData(<div>URL NOT FOUND</div>);
                return;
            }
            try {
                const res = await fetch(
                    url
                )
                if (res.status !== 200) {
                    switch (res.status) {
                        case 404:
                            setData(<div id='element-page-404'>Записи отсутствуют</div>);
                            break;
                        default:
                            setData(<div>Status: {res.status}</div>);
                    }
                    return;
                }
                const res_json = await (res).json();
                setData(res_json.map((data, idx) => <ElementCart key={idx} data={data} entity={entity} />));
            } catch (e) {
                console.log(e);
                setData(<div>Ошибка сервера</div>);
            }
        };
        if (entity in ENTITY_TO_URL_MAP_GET === false) {
            setData("404")
        } else { dataFetch(); }
    }

    const renderButton = (entity) => {
        if (entity in ENTITY_TO_URL_MAP_GET === false) {
            return;
        }
        return <button className="element-page-button" onClick={() => {
            navigate("/" + entity + "/add");
        }
        }> +</button >;
    }

    useEffect(() => {
        renderElements(entity);
    }, [entity]);

    return (
        <div id="workspace">
            <div id="section-title">
                <div id="section-title-text">
                    {translateEntityPlural(entity)}
                </div>
                {renderButton(entity)}
            </div>
            {data}
        </div>
    );
}

export default ElementsPage;