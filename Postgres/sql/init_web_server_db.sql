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
CREATE TABLE consumers(
    id SERIAL NOT NULL PRIMARY KEY,
    bio TEXT NULL,
    date_of_birth TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    first_name VARCHAR(30) NOT NULL,
    second_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NOT NULL,
    individual_sale DECIMAL(1, 2) NOT NULL DEFAULT 0 CHECK (individual_sale >= 0 AND individual_sale <= 0.5),
    phone_number VARCHAR(15) NULL,
    email VARCHAR(255) NULL
);

CREATE TABLE services(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    description TEXT NULL,
    price DECIMAL(8, 2) NOT NULL,
    default_duration TIME(0) WITHOUT TIME ZONE NOT NULL
);

CREATE TABLE departaments(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NULL
);

CREATE TABLE cabinets(
    number INTEGER NOT NULL PRIMARY KEY,
    description TEXT NULL,
    departament_id INTEGER NULL REFERENCES Departaments(id)
);

CREATE TABLE doctors(
    id SERIAL NOT NULL PRIMARY KEY,
    departament_id INTEGER NOT NULL REFERENCES Departaments(id),
    bio TEXT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    second_name VARCHAR(30) NULL,
    date_of_birth TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);

CREATE TABLE appointment_records(
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

CREATE TABLE doctor_services(
    id SERIAL NOT NULL PRIMARY KEY,
    doctor_id INTEGER NOT NULL REFERENCES Doctors(id),
    service_id INTEGER NOT NULL REFERENCES Services(id)
);

-- Stored Procedures
CREATE OR REPLACE PROCEDURE set_appointment_record_done_if_time(
        appointment_record_id Int, end_time TIMESTAMP(0)
    )
language plpgsql
as $$
begin
    IF end_time > now()::timestamp THEN
        UPDATE appointment_records
        SET state = 'done'
        WHERE id = appointment_record_id;
    END IF;

    commit;
end;
$$;

CREATE OR REPLACE PROCEDURE set_appointment_record_price(
        appointment_record_id Int,
        consumer_id Int,
        service_id Int
    ) 
language plpgsql
as $$
declare
    service_price DECIMAL(8,2) := (SELECT price
                                    FROM services
                                    WHERE id = service_id);

    appointment_price DECIMAL(8,2) := (SELECT price
                                    FROM appointment_records
                                    WHERE id = appointment_record_id);

    consumer_sale DECIMAL(1,2) := ((SELECT individual_sale
                                    FROM Consumers
                                    WHERE id = consumer_id));

begin
    IF appointment_price < service_price * (1-consumer_sale) THEN
        UPDATE appointment_records
        SET PRICE = service_price * (1-consumer_sale)
        WHERE id = appointment_record_id;
    END IF;

    commit;
end;
$$;

-- Triggers
CREATE OR REPLACE TRIGGER trg_appointment_records
   AFTER INSERT OR UPDATE ON appointment_records
   FOR EACH ROW
   BEGIN
        IF :new.end_time > now() THEN
            set_appointment_record_done(:new.ID);
        END IF;
        set_appointment_record_price(:new.ID, :new.consumer_id,:new.service_id)
   END;