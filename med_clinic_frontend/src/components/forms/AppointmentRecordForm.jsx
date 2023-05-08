import { useEffect, useState } from "react";
import { ENTITY_TO_URL_MAP_GET, ENTITY_TO_URL_MAP_POST, getConsumerFullName, getDoctorFullName, translateState } from "../../models/entities_mappings";
import { fetchCabinets, fetchConsumers, fetchDoctors, fetchServices } from "../../models/fetch_data";
import { ScheduleStates } from "../../models/models.ts";
import { useNavigate } from "react-router-dom";

const AppointmentRecordForm = ({ entityId }) => {
    const [consumer_id, setConsumerId] = useState();
    const [doctor_id, setDoctorId] = useState();
    const [service_id, setServiceId] = useState();
    const [start_time, setStartTime] = useState();
    const [end_time, setEndTime] = useState();
    const [recomendedEndTime, setRecomendedEndTime] = useState();
    const [price, setPrice] = useState();
    const [recomendedPrice, setRecomendedPrice] = useState();
    const [state, setState] = useState();
    const [cabinet_number, setCabinetNumber] = useState();

    const [doctors, setDoctors] = useState([]);
    const [services, setServices] = useState([]);
    const [consumers, setConsumers] = useState([]);
    const [cabinets, setCabinets] = useState([]);

    const navigate = useNavigate();

    const getServiceById = (id) => {
        return services.find((service) => parseInt(service.id) === parseInt(id));
    };
    const parseDurationStrToSec = (duration) => {
        const [hours, minutes, sec] = duration.split(":");
        return parseInt(hours) * 60 * 60 + 60 * parseInt(minutes) + parseInt(sec);
    };

    const getConsumerById = (id) => {
        return consumers.find((consumer) => parseInt(consumer.id) === parseInt(id));
    };

    useEffect(() => {
        fetchDoctors().then((data) => setDoctors(data));
        fetchServices().then((data) => setServices(data));
        fetchConsumers().then((data) => setConsumers(data));
        fetchCabinets().then((data) => setCabinets(data));
        if (entityId) {
            fetch(ENTITY_TO_URL_MAP_GET["appointment_records"] + entityId)
                .then((res) => res.json())
                .then((data) => {
                    setConsumerId(data.consumer_id);
                    setDoctorId(data.doctor_id);
                    setServiceId(data.service_id);
                    setStartTime(data.start_time);
                    setEndTime(data.end_time);
                    setPrice(data.price);
                    setState(data.state);
                    setCabinetNumber(data.cabinet_number);
                });
        }
    }, [entityId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!consumer_id) {
            alert("Выберите пациента");
            return;
        }
        if (!doctor_id) {
            alert("Выберите врача");
            return;
        }
        if (!service_id) {
            alert("Выберите услугу");
            return;
        }
        if (!start_time) {
            alert("Выберите время начала");
            return;
        }
        if (!end_time) {
            alert("Выберите время окончания");
            return;
        }
        if (!price) {
            alert("Укажите цену");
            return;
        }
        if (price < 0) {
            alert("Цена не может быть отрицательной");
            return;
        }
        if (price > 1000000) {
            alert("Цена не может быть больше 10^6");
            return;
        }
        if (!state) {
            alert("Укажите статус");
            return;
        }
        if (!cabinet_number) {
            alert("Укажите номера кабинета");
            return;
        }
        if (new Date(start_time) > new Date(end_time)) {
            alert("Время начала не может быть позже времени окончания");
            return;
        }
        if (cabinets.find((cabinet) => parseInt(cabinet.number) === parseInt(cabinet_number)) === undefined) {
            alert("Кабинет с таким номером не существует");
            return;
        }
        const appointmentRecord = {
            "consumer_id": consumer_id,
            "doctor_id": doctor_id,
            "service_id": service_id,
            "start_time": start_time,
            "end_time": end_time,
            "price": price,
            "state": state,
            "cabinet_number": cabinet_number
        };
        if (entityId) {
            appointmentRecord["id"] = entityId;
        }
        console.log(JSON.stringify(appointmentRecord));
        let method = entityId ? "PUT" : "POST";
        let URL = entityId ? ENTITY_TO_URL_MAP_POST["appointment_records"] + entityId : ENTITY_TO_URL_MAP_POST["appointment_records"];
        fetch(URL, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(appointmentRecord),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Запись на прием успешно " + (entityId ? "добавлена" : "создана"));
                    navigate("/appointment_records");
                }
                else {
                    alert("Ошибка при " + (entityId ? "добавлении" : "создании") + " записи на прием");
                }
            })
            .catch((error) => {
                console.log(error)
                alert("Ошибка при " + (entityId ? "добавлении" : "создании") + " записи на прием");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="consumer_id">Пациент</label>
                <select className="form-control" id="consumer_id"
                    value={consumer_id}
                    onChange={(e) => {
                        setConsumerId(e.target.value)
                        if (recomendedPrice) {
                            let consumer_sale = getConsumerById(e.target.value).individual_sale;
                            setRecomendedPrice(recomendedPrice * (1 - consumer_sale));
                        }
                    }}>
                    <option hidden value={undefined}>Выберите пациента</option>
                    {consumers.map((consumer) => {
                        return (
                            <option key={consumer.id} value={consumer.id}>{getConsumerFullName(consumer)}</option>
                        )
                    }
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="doctor_id">Доктор</label>
                <select className="form-control" id="doctor_id"
                    value={doctor_id}
                    onChange={(e) => setDoctorId(e.target.value)}
                >
                    <option hidden value={undefined}>Выберите врача</option>
                    {doctors.map((doctor) => {
                        return (
                            <option key={doctor.id} value={doctor.id}>{getDoctorFullName(doctor)}</option>
                        )
                    }
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="service_id">Услуга</label>
                <select className="form-control" id="service_id"
                    value={service_id}
                    onChange={(e) => {
                        let tmpServiceId = e.target.value;
                        let tmpRecPrice = getServiceById(tmpServiceId).price;
                        setServiceId(tmpServiceId);
                        if (tmpRecPrice) {
                            if (consumer_id) {
                                let consumer_sale = getConsumerById(consumer_id).individual_sale;
                                tmpRecPrice = tmpRecPrice * (1 - consumer_sale);
                            }
                            setRecomendedPrice(tmpRecPrice);
                        }
                        if (start_time) {
                            setRecomendedEndTime(
                                new Date(
                                    new Date(start_time).getTime() + (parseDurationStrToSec(getServiceById(tmpServiceId)?.default_duration) * 1000) - new Date(start_time).getTimezoneOffset() * 60 * 1000
                                ).toUTCString()
                            );
                        }
                        if (!end_time && recomendedEndTime) {
                            setEndTime(recomendedEndTime);
                        }
                    }}>
                    <option hidden value={undefined}>Выберите услугу</option>
                    {services.map((service) => {
                        return (
                            <option key={service.id} value={service.id}>{service.name}</option>
                        )
                    }
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="start_time">Время начала</label>
                <input type="datetime-local" className="form-control" id="start_time"
                    defaultValue={start_time}
                    onChange={(e) => {
                        let tmpStartTime = e.target.value;
                        setStartTime(tmpStartTime)
                        if (service_id) {
                            setRecomendedEndTime(
                                new Date(
                                    new Date(tmpStartTime).getTime() + (parseDurationStrToSec(getServiceById(service_id)?.default_duration) * 1000) - new Date(tmpStartTime).getTimezoneOffset() * 60 * 1000
                                ).toUTCString()
                            );
                        }
                    }} />
            </div>
            <div className="form-group">
                <label htmlFor="end_time">Время окончания</label>
                <input type="datetime-local" className="form-control" id="end_time"
                    defaultValue={end_time}
                    onChange={(e) => setEndTime(e.target.value)}
                />
                {recomendedEndTime && <small className="form-text text-muted">Рекомендуемое время окончания: {recomendedEndTime}</small>}
            </div>
            <div className="form-group">
                <label htmlFor="price">Цена</label>
                <input type="number" className="form-control" id="price"
                    defaultValue={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                {recomendedPrice && <small className="form-text text-muted">Рекомендуемая цена: {recomendedPrice}</small>}
            </div>
            <div className="form-group">
                <label htmlFor="state">Статус</label>
                <select className="form-control" id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                >
                    <option hidden value={undefined}>Выберите статус</option>
                    {Object.values(ScheduleStates).map((state) => {
                        return (
                            <option key={state} value={state}>{translateState(state)}</option>
                        )
                    }
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="cabinet_number">Номер кабинета</label>
                <input type="number" className="form-control" id="cabinet_number"
                    defaultValue={cabinet_number}
                    onChange={(e) => setCabinetNumber(e.target.value)}
                />
            </div>
            <button type="submit" className="btn-add">{entityId ? "Обновить" : "Создать"}</button>
        </form>
    );
}

export default AppointmentRecordForm;