import { ENTITY_TO_URL_MAP_GET } from "./entities_mappings"

export const fetchDepartments = async () => {
    const CONST_URL = ENTITY_TO_URL_MAP_GET["departments"];
    const response = await fetch(CONST_URL, { "amount": 1000 });
    const data = await response.json();
    const departments = data.map((department) => {
        return {
            id: department.id,
            name: department.name,
            description: department.description,
        };
    });
    return departments;
}

export const fetchDoctors = async () => {
    const CONST_URL = ENTITY_TO_URL_MAP_GET["doctors"];
    const response = await fetch(CONST_URL, { "amount": 10000 });
    const data = await response.json();
    const doctors = data.map((doctor) => {
        return {
            id: doctor.id,
            first_name: doctor.first_name,
            second_name: doctor.second_name,
            last_name: doctor.last_name,
            department_id: doctor.department_id,
            date_of_birth: doctor.date_of_birth,
            bio: doctor.bio,
        };
    });
    return doctors;
}

export const fetchServices = async () => {
    const CONST_URL = ENTITY_TO_URL_MAP_GET["services"];
    const response = await fetch(CONST_URL, { "amount": 10000 });
    const data = await response.json();
    const services = data.map((service) => {
        return {
            id: service.id,
            name: service.name,
            description: service.description,
            price: service.price,
            default_duration: service.default_duration,
        };
    });
    return services;
}

export const fetchConsumers = async () => {
    const CONST_URL = ENTITY_TO_URL_MAP_GET["consumers"];
    const response = await fetch(CONST_URL, { "amount": 10000 });
    const data = await response.json();
    const consumers = data.map((consumer) => {
        return {
            id: consumer.id,
            first_name: consumer.first_name,
            second_name: consumer.second_name,
            last_name: consumer.last_name,
            date_of_birth: consumer.date_of_birth,
            phone_number: consumer.phone_number,
            email: consumer.email,
        };
    });
    return consumers;
}

export const fetchCabinets = async () => {
    const CONST_URL = ENTITY_TO_URL_MAP_GET["cabinets"];
    const response = await fetch(CONST_URL, { "amount": 10000 });
    const data = await response.json();
    const cabinets = data.map((cabinet) => {
        return {
            number: cabinet.number,
            description: cabinet.description,
            departament_id: cabinet.departament_id,
        };
    });
    return cabinets;
}
