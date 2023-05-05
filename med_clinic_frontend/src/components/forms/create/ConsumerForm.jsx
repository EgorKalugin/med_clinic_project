import { useState } from "react";
import { ENTITY_TO_URL_MAP_POST } from "../../../models/entities_mappings";
import { useNavigate } from "react-router-dom";

const ConsumerForm = () => {
    const [firstName, setFirstName] = useState();
    const [secondName, SetSecondName] = useState();
    const [lastName, setLastName] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [bio, setBio] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [individualSale, setIndividualSale] = useState();

    const navigate = useNavigate();

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
            individual_sale: individualSale? individualSale : 0,
        }
        fetch(ENTITY_TO_URL_MAP_POST["consumers"], {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }).then((res) => {
            console.log(res);
            if (res.ok) {
                alert("Пациент успешно создан");
                navigate("/consumers");
            } else {
                alert("Произошла ошибка при создании пациента");
            }
        }).catch((err) => {
            console.log(err);
            alert("Произошла ошибка при создании пациента");
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="first_name">Имя</label>
                <input type="text" className="form-control" id="first_name" placeholder="Имя"
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="second_name">Отчество</label>
                <input type="text" className="form-control" id="second_name" placeholder="Отчество"
                    onChange={(e) => SetSecondName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="last_name">Фамилия</label>
                <input type="text" className="form-control" id="last_name" placeholder="Фамилия"
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="date_of_birth">Дата рождения</label>
                <input type="date" className="form-control" id="date_of_birth" placeholder="Дата рождения"
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="bio">Биография</label>
                <input type="text" className="form-control" id="bio" placeholder="Биография"
                    onChange={(e) => setBio(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone_number">Номер телефона</label>
                <input type="number" className="form-control" id="phone_number" placeholder="Номер телефона"
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Электронная почта</label>
                <input type="email" className="form-control" id="email" placeholder="Электронная почта"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="individual_sales">Индивидуальная скидка {"(от 0 до 0.5)"}</label>
                <input type="number" className="form-control" id="individual_sales" placeholder="Индивидуальная скидка"
                    onChange={(e) => setIndividualSale(e.target.value)}
                />
            </div>
            <button type="submit" className="btn-add">Создать</button>
        </form>
    );
}

export default ConsumerForm;