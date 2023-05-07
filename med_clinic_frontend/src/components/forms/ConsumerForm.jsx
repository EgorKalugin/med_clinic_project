import { useEffect, useState } from "react";
import { ENTITY_TO_URL_MAP_GET, ENTITY_TO_URL_MAP_POST, ENTITY_TO_URL_MAP_PUT } from "../../models/entities_mappings";
import { useNavigate } from "react-router-dom";

const ConsumerForm = ({ entityId }) => {
    const [firstName, setFirstName] = useState();
    const [secondName, SetSecondName] = useState();
    const [lastName, setLastName] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [bio, setBio] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [individualSale, setIndividualSale] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (entityId) {
            fetch(ENTITY_TO_URL_MAP_GET["consumers"] + entityId).then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    alert("Ошибка получения пациента");
                }
            }).then((res) => {
                setFirstName(res.first_name);
                SetSecondName(res.second_name);
                setLastName(res.last_name);
                setDateOfBirth(res.date_of_birth);
                setBio(res.bio);
                setPhone(res.phone_number);
                setEmail(res.email);
                setIndividualSale(res.individual_sale);
            }).catch((err) => {
                console.log(err);
                alert("Ошибка получения пациента");
            });
        }
    }, [entityId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!firstName) {
            alert("Введите имя");
            return;
        } else if (!lastName) {
            alert("Введите фамилию");
            return;
        } else if (individualSale < 0 || individualSale > 0.5) {
            alert("Некорректная скидка");
            return;
        }
        const data = {
            first_name: firstName,
            second_name: secondName,
            last_name: lastName,
            date_of_birth: dateOfBirth,
            bio: bio,
            phone_number: phone,
            email: email,
            individual_sale: individualSale ? individualSale : 0,
        }
        if (entityId) {
            data.id = entityId;
        }
        let URL = entityId ? ENTITY_TO_URL_MAP_PUT["consumers"] + entityId : ENTITY_TO_URL_MAP_POST["consumers"];
        let method = entityId ? "PUT" : "POST";
        fetch(URL, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }).then((res) => {
            console.log(res);
            if (res.ok) {
                alert("Пациент успешно " + (entityId ? "обновлен" : "создан"));
                navigate("/consumers");
            } else {
                alert("Произошла ошибка при " + (entityId ? "обновлении" : "создании") + " пациента");
            }
        }).catch((err) => {
            console.log(err);
            alert("Произошла ошибка при " + (entityId ? "обновлении" : "создании") + " пациента");
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="first_name">Имя</label>
                <input type="text" className="form-control" id="first_name" placeholder="Имя"
                    defaultValue={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="second_name">Отчество</label>
                <input type="text" className="form-control" id="second_name" placeholder="Отчество"
                    defaultValue={secondName}
                    onChange={(e) => SetSecondName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="last_name">Фамилия</label>
                <input type="text" className="form-control" id="last_name" placeholder="Фамилия"
                    defaultValue={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="date_of_birth">Дата рождения</label>
                <input type="date" className="form-control" id="date_of_birth" placeholder="Дата рождения"
                    defaultValue={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="bio">Биография</label>
                <input type="text" className="form-control" id="bio" placeholder="Биография"
                    defaultValue={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone_number">Номер телефона</label>
                <input type="number" className="form-control" id="phone_number" placeholder="Номер телефона"
                    defaultValue={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Электронная почта</label>
                <input type="email" className="form-control" id="email" placeholder="Электронная почта"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="individual_sales">Индивидуальная скидка {"(от 0 до 0.5)"}</label>
                <input type="number" className="form-control" id="individual_sales" placeholder="Индивидуальная скидка"
                    defaultValue={individualSale}
                    onChange={(e) => setIndividualSale(e.target.value)}
                />
            </div>
            <button type="submit" className="btn-add">{entityId ? "Обновить" : "Создать"}</button>
        </form>
    );
}

export default ConsumerForm;