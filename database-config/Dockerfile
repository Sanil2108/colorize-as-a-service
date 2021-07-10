FROM postgres:13

WORKDIR /database-config

RUN apt-get update
RUN apt-get install -y python3

CMD ["python3", "/docker-utils/wait-for.py", "pg_isready -h $POSTGRES_HOST -d $POSTGRES_DB -U $POSTGRES_USER", "/database-config/setupdb.sh"]