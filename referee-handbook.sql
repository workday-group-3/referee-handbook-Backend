\echo "Delete and recreate referee's handbook db?"
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE referee-handbook;
CREATE DATABASE referee-handbook;
\connect referee-handbook;

\i referee-handbook-schema.sql