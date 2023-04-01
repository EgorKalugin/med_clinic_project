\set  passwd  `echo  "'${MED_CLINIC_USER_PASSWORD}'"`

CREATE DATABASE med_clinic;

CREATE USER med_clinic_user WITH PASSWORD :passwd;

CREATE USER docker;
CREATE DATABASE docker;
GRANT ALL PRIVILEGES ON DATABASE med_clinic TO docker;


CREATE TABLE test_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);