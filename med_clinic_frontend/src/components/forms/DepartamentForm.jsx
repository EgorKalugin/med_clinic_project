import { useNavigate } from "react-router-dom";
import { ENTITY_TO_URL_MAP_GET, ENTITY_TO_URL_MAP_POST, ENTITY_TO_URL_MAP_PUT } from "../../models/entities_mappings";
import { useEffect, useState } from "react";


const DepartamentForm = ({ entityId }) => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (entityId) {
            fetch(ENTITY_TO_URL_MAP_GET["departments"] + entityId).then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    alert("Ошибка получения отделения");
                }
            }).then((res) => {
                setName(res.name);
                setDescription(res.description);
            }).catch((err) => {
                console.log(err);
                alert("Ошибка получения отделения");
            });
        }
    }, [entityId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name) {
            alert("Введите название отделения");
            return;
        }
        const data = {
            name: name,
            description: description,
        }
        if (entityId) {
            data.id = entityId;
        }
        let URL = entityId ? ENTITY_TO_URL_MAP_PUT["departments"] + entityId : ENTITY_TO_URL_MAP_POST["departments"];
        let method = entityId ? "PUT" : "POST";
        fetch(URL, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.ok) {
                alert("Отделение " + (entityId ? "обновлено" : "создано"));
                navigate("/departments");
            } else {
                alert("Ошибка " + (entityId ? "обновления" : "создания") + " отделения");
            }
        }
        ).catch((err) => {
            console.log(err);
            alert("Ошибка " + (entityId ? "обновления" : "создания") + " отделения");
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Название отделения</label>
                <input type="text" className="form-control" id="name"
                    defaultValue={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Описание отделения</label>
                <input type="text" className="form-control" id="description"
                    defaultValue={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">{entityId ? "Обновить" : "Создать"}</button>
        </form>
    );
}

export default DepartamentForm;