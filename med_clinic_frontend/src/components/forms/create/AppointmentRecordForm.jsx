import { useEffect, useState } from "react";
import { ENTITY_TO_URL_MAP_POST, getConsumerFullName, getDoctorFullName } from "../../../models/entities_mappings";
import { fetchCabinets, fetchConsumers, fetchDoctors, fetchServices } from "../../../models/fetch_data";

const AppointmentRecordForm = () => {
    const [consumer_id, setConsumer_id] = useState();
    const [doctor_id, setDoctor_id] = useState();
    const [service_id, setService_id] = useState();
    const [start_time, setStart_time] = useState();
    const [end_time, setEnd_time] = useState();
    const [recomendedEndTime, setRecomendedEndTime] = useState();
    const [price, setPrice] = useState();
    const [recomendedPrice, setRecomendedPrice] = useState();
    const [state, setState] = useState();
    const [cabinet_number, setCabinet_number] = useState();

    const [doctors, setDoctors] = useState([]);
    const [services, setServices] = useState([]);
    const [consumers, setConsumers] = useState([]);
    const [cabinets, setCabinets] = useState([]);

    const getDoctorById = (id) => {
        return doctors.find((doctor) => doctor.id == id);
    };
    const getConsumerById = (id) => {
        return consumers.find((consumer) => consumer.id == id);
    };
    const getServiceById = (id) => {
        return services.find((service) => service.id == id);
    };
    const parseDurationStrToSec = (duration) => {
        const [hours, minutes, sec] = duration.split(":");
        return parseInt(hours) * 60 * 60 + 60 * parseInt(minutes) + parseInt(sec);
    };

    useEffect(() => {
        fetchDoctors().then((data) => setDoctors(data));
        fetchServices().then((data) => setServices(data));
        fetchConsumers().then((data) => setConsumers(data));
        fetchCabinets().then((data) => setCabinets(data));
    }, []);

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
        if (!state) {
            alert("Укажите статус");
            return;
        }
        if (!cabinet_number) {
            alert("Укажите номера кабинета");
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
            "cabinet_numbe": cabinet_number
        };
        console.log(appointmentRecord);
        fetch(ENTITY_TO_URL_MAP_POST["appointment_record"], {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(appointmentRecord),
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="consumer_id">Пациент</label>
                <select className="form-control" id="consumer_id" onChange={(e) => setConsumer_id(e.target.value)}>
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
                <select className="form-control" id="doctor_id" onChange={(e) => setDoctor_id(e.target.value)}>
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
                <select className="form-control" id="service_id" onChange={(e) => {
                    if (start_time) {
                        setRecomendedEndTime(
                            new Date(
                                new Date(start_time).getTime() + (parseDurationStrToSec(getServiceById(e.target.value)?.default_duration))
                            ).toISOString().slice(11, 19)
                            // TODO: fix time zone
                        );
                    }
                    setService_id(e.target.value)
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
                <input type="datetime-local" className="form-control" id="start_time" onChange={(e) => setStart_time(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="end_time">Время окончания</label>
                <input type="datetime-local" className="form-control" id="end_time" onChange={(e) => setEnd_time(e.target.value)} />
                {recomendedEndTime && <small className="form-text text-muted">Рекомендуемое время окончания: {recomendedEndTime}</small>}
            </div>
            <div className="form-group">
                <label htmlFor="price">Цена</label>
                <input type="number" className="form-control" id="price" onChange={(e) => setPrice(e.target.value)} />
                {recomendedPrice && <small className="form-text text-muted">Рекомендуемая цена: {recomendedPrice}</small>}
            </div>
            <div className="form-group">
                <label htmlFor="state">Статус</label>
                <select className="form-control" id="state" onChange={(e) => setState(e.target.value)}>
                    <option hidden value={undefined}>Выберите статус</option>
                    {/* {ScheduleStates.map((state) => {
                        return (
                            <option key={state} value={state}>{state}</option>
                        )
                    }
                    )} */}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="cabinet_number">Номер кабинета</label>
                <input type="number" className="form-control" id="cabinet_number" onChange={(e) => setCabinet_number(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    );
}

export default AppointmentRecordForm;