#!/bin/bash

psql -U $POSTGRES_USER -d $POSTGRES_DB -h $POSTGRES_HOST -a -f reset.sql
psql -U $POSTGRES_USER -d $POSTGRES_DB -h $POSTGRES_HOST -a -f init.sql
