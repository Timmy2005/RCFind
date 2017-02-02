web: gunicorn app:app
init: python db_start.py
upgrade: python create.py
migrate: gunicorn  db:migrate