import "../../styles/Element.css"

import { ENTITY_TO_URL_MAP_DELETE, getDoctorFullName, translateEntityFields, translateState } from "../../models/entities_mappings";
import { useNavigate } from "react-router-dom";


const Element = ({ entity, data, doctorsCahce, servicesCahce }) => {

    let navigate = useNavigate();

    const createComponentUpdateDeleteButtons = (entity, id) => {
        return (
            <div className="element-buttons">
                id: {id}
                <div className="element-buttons-separator">
                    <button className="element-button btn-with-margin" onClick={() => navigate("/" + entity + "/update/" + id)}>Обновить</button>
                    <button className="element-button" onClick={() => onClickDelete(entity, id)}>Удалить</button>
                </div>
            </div>
        );
    };

    const onClickDelete = (entity, id) => {
        sendDeleteRequest(entity, id).then(() => {
            window.location.reload();
        }).catch((e) => {
            alert("Ошибка при удалении");
        });
    }

    const sendDeleteRequest = async (entity, id) => {
        const url = ENTITY_TO_URL_MAP_DELETE[entity];
        const response = await fetch(url + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(response.text);
        }
        const res = await response.text()
        return res;
    }

    const createComponent = (entity, data, doctorsCahce, servicesCahce) => {
        if (entity === "doctor_services") {
            let doctor_name, service_name;
            try {
                let doctor = doctorsCahce[data.doctor_id];
                doctor_name = getDoctorFullName(doctor);
            } catch (e) {
                console.log(e);
            }
            try {
                service_name = servicesCahce[data.service_id].name;
            } catch (e) {
                console.log(e);
            }

            return (
                <div>
                    <div>Доктор: {doctor_name ? doctor_name : data.doctor_id}</div>
                    <div>Услуга: {service_name ? service_name : data.service_id}</div>
                </div>
            );
        } else {
            return (Object.entries(data).map(([key, value], i) => {
                if (key === "id") return;
                if (key === "price") value = value + " руб.";
                if (entity === "appointment_records" && key === "state") return <div key={i} >{translateEntityFields(entity, key)}: {translateState(value)}</div>;
                if (entity === "consumers" && key === "individual_sale") return <div key={i} >{translateEntityFields(entity, key)}: {value * 100} % </div>;
                return <div key={i} >{translateEntityFields(entity, key)}: {value}</div>;
            }
            ));
        }
    };

    return (
        <div className="element">
            {createComponent(entity, data, doctorsCahce, servicesCahce)}
            {createComponentUpdateDeleteButtons(entity, (entity === "cabinets" ? data.number : data.id))}
        </div>
    );
}

export default Element;