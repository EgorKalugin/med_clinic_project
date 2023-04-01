FROM postgres:15.2

COPY sql/* /docker-entrypoint-initdb.d/
RUN chown postgres:postgres /var/log/postgresql/