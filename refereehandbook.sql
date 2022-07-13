\echo "Delete and recreate referee's handbook db?"
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE refereehandbook;
CREATE DATABASE refereehandbook;
\connect refereehandbook;

\i refereehandbook-schema.sql