enum ScheduleStates {
    DONE = "done",
    CANCELLED = "cancelled",
    IN_PROGRESS = "in_progress",
    NOT_ARRIVED = "not_arrived"
}

class DoctorWithoutId {
    departament_id: number;
    bio?: string;
    first_name: string;
    second_name?: string;
    last_name: string;
    date_of_birth: Date;
}

class DoctorWithId extends DoctorWithoutId {
    id: number;
}

class ServiceWithoutId {
    name: string;
    description?: string;
    price: number;
    default_duration: Date;
}

class ServiceWithId extends ServiceWithoutId {
    id: number
}


class DepartamentWithoutId {
    name: string;
    description?: string;
}


class DepartamentWithId extends DepartamentWithoutId {
    id: number
}


class DoctorServiceWithoutId {
    doctor_id: number;
    service_id: number;
}

class DoctorServiceWithId extends DoctorServiceWithoutId {
    id: number
}


class ConsumerWithoutId {
    bio?: string;
    date_of_birth?: Date;
    first_name: string;
    second_name?: string;
    last_name: string;
    phone_number?: string;
    email?: string;
    individual_sale?: number;
}


class ConsumerWithId extends ConsumerWithoutId {
    id: number
}

class Cabinet {
    number: number;
    description?: string;
    departament_id: number;
}


class AppointmentRecordWithoutId {
    // Сущность записи на прием
    consumer_id: number;
    doctor_id: number;
    service_id: number;
    start_time: Date;
    end_time: Date;
    price: number;
    state: ScheduleStates;
    cabinet_number: number;
}

class AppointmentRecordWithId extends AppointmentRecordWithoutId {
    id: number
}


export const getTsModelByEntity = (entity, withId = true) => {
    switch (entity) {
        case 'doctors':
            return withId ? DoctorWithId : DoctorWithoutId;
        case 'services':
            return withId ? ServiceWithId : ServiceWithoutId;
        case 'departaments':
            return withId ? DepartamentWithId : DepartamentWithoutId;
        case 'doctor_services':
            return withId ? DoctorServiceWithId : DoctorServiceWithoutId;
        case 'consumers':
            return withId ? ConsumerWithId : ConsumerWithoutId;
        case 'appointment_records':
            return withId ? AppointmentRecordWithId : AppointmentRecordWithoutId;
        case 'cabinets':
            return Cabinet;
        default:
            throw new Error(`No such entity ${entity}`)
    }
};
