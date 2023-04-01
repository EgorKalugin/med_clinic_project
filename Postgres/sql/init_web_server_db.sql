\set  user  `echo  ${MED_CLINIC_USER}`
\set  passwd  `echo  "'${MED_CLINIC_USER_PASSWORD}'"`
\set  med_cl_db_name  `echo  ${MED_CLINIC_DB_NAME}`

CREATE DATABASE :med_cl_db_name;

\c :med_cl_db_name postgres;

CREATE USER :user WITH ENCRYPTED PASSWORD :passwd SUPERUSER;

SET ROLE :user;

-- create tables
CREATE TABLE Consumers(
    id INTEGER NOT NULL,
    bio TEXT NULL,
    date_of_birth TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    second_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NOT NULL,
    individual_sale DECIMAL(8, 2) NOT NULL,
    phone_number VARCHAR(15) NULL,
    email VARCHAR(255) NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Services(
    id INTEGER NOT NULL,
    name VARCHAR(30) NOT NULL,
    description TEXT NULL,
    price DECIMAL(8, 2) NOT NULL,
    default_duration TIME(0) WITHOUT TIME ZONE NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Departaments(
    id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Cabinets(
    number INTEGER NOT NULL,
    description TEXT NULL,
    departament_id INTEGER NULL,
    PRIMARY KEY(number),
    CONSTRAINT cabinets_departament_id_foreign FOREIGN KEY(departament_id) REFERENCES Departaments(id)
);

CREATE TABLE Doctors(
    id INTEGER NOT NULL,
    departament_id INTEGER NOT NULL,
    bio TEXT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    second_name VARCHAR(30) NULL,
    date_of_birth TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT doctors_departament_id_foreign FOREIGN KEY(departament_id) REFERENCES Departaments(id)
);

CREATE TABLE ConsumersSchedule(
    id INTEGER NOT NULL,
    consumer_id INTEGER NOT NULL,
    doctor_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    start_time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    end_time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    price DECIMAL(8, 2) NOT NULL,
    state VARCHAR(50) NOT NULL DEFAULT 'not_arrived' CHECK(state IN ('done', 'cancelled', 'in_progress', 'not_arrived')),
    cabinet_number INTEGER NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT consumersschedule_consumer_id_foreign FOREIGN KEY(consumer_id) REFERENCES Consumers(id),
    CONSTRAINT consumersschedule_service_id_foreign FOREIGN KEY(service_id) REFERENCES Services(id),
    CONSTRAINT consumersschedule_doctor_id_foreign FOREIGN KEY(doctor_id) REFERENCES Doctors(id),
    CONSTRAINT consumersschedule_cabinet_number_foreign FOREIGN KEY(cabinet_number) REFERENCES Cabinets(number),
    CONSTRAINT consumersschedule_consumer_id_service_id_start_time_unique UNIQUE(consumer_id, service_id, start_time),
    CONSTRAINT consumersschedule_doctor_id_service_id_start_time_unique UNIQUE(doctor_id, service_id, start_time),
    CONSTRAINT consumersschedule_cabinet_number_start_time_unique UNIQUE(cabinet_number, start_time)
);

-- TODO: add AND update constraints
COMMENT
ON COLUMN
    ConsumersSchedule.end_time IS 'start_time + services.default_time';
COMMENT
ON COLUMN
    ConsumersSchedule.price IS 'service.price*(1-individual_sale)';

CREATE TABLE DoctorServices(
    id INTEGER NOT NULL,
    doctor_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT doctorservices_doctor_id_foreign FOREIGN KEY(doctor_id) REFERENCES Doctors(id),
    CONSTRAINT doctorservices_service_id_foreign FOREIGN KEY(service_id) REFERENCES Services(id)
);