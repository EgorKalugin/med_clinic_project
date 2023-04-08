\set  user  `echo  ${MED_CLINIC_USER}`
\set  passwd  `echo  "'${MED_CLINIC_USER_PASSWORD}'"`
\set  med_cl_db_name  `echo  ${MED_CLINIC_DB_NAME}`

CREATE DATABASE :med_cl_db_name;

\c :med_cl_db_name postgres;

CREATE USER :user WITH ENCRYPTED PASSWORD :passwd SUPERUSER;

SET ROLE :user;

-- create extension
CREATE EXTENSION btree_gist; -- for EXCLUDE constraint

-- create tables
CREATE TABLE Consumers(
    id SERIAL NOT NULL PRIMARY KEY,
    bio TEXT NULL,
    date_of_birth TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    first_name VARCHAR(30) NOT NULL,
    second_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NOT NULL,
    individual_sale DECIMAL(8, 2) NOT NULL,
    phone_number VARCHAR(15) NULL,
    email VARCHAR(255) NULL
);

CREATE TABLE Services(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    description TEXT NULL,
    price DECIMAL(8, 2) NOT NULL,
    default_duration TIME(0) WITHOUT TIME ZONE NOT NULL
);

CREATE TABLE Departaments(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NULL
);

CREATE TABLE Cabinets(
    number INTEGER NOT NULL PRIMARY KEY,
    description TEXT NULL,
    departament_id INTEGER NULL REFERENCES Departaments(id)
);

CREATE TABLE Doctors(
    id SERIAL NOT NULL PRIMARY KEY,
    departament_id INTEGER NOT NULL REFERENCES Departaments(id),
    bio TEXT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    second_name VARCHAR(30) NULL,
    date_of_birth TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);

CREATE TABLE AppointmentRecords(
    id SERIAL NOT NULL PRIMARY KEY,
    consumer_id INTEGER NOT NULL REFERENCES Consumers(id),
    doctor_id INTEGER NOT NULL REFERENCES Doctors(id),
    service_id INTEGER NOT NULL REFERENCES Services(id),
    start_time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    end_time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    price DECIMAL(8, 2) NOT NULL,
    state VARCHAR(50) NOT NULL DEFAULT 'not_arrived' CHECK(state IN ('done', 'cancelled', 'in_progress', 'not_arrived')),
    cabinet_number INTEGER NOT NULL REFERENCES Cabinets(number),
    EXCLUDE USING gist (doctor_id WITH =, tsrange(start_time, end_time) WITH &&),
    EXCLUDE USING gist (consumer_id WITH =, tsrange(start_time, end_time) WITH &&),
    EXCLUDE USING gist (cabinet_number WITH =, tsrange(start_time, end_time) WITH &&),
    CONSTRAINT start_time_before_end_time CHECK (start_time < end_time),
    CONSTRAINT price_is_positive CHECK (price >= 0)
);

CREATE TABLE DoctorServices(
    id SERIAL NOT NULL PRIMARY KEY,
    doctor_id INTEGER NOT NULL REFERENCES Doctors(id),
    service_id INTEGER NOT NULL REFERENCES Services(id)
);