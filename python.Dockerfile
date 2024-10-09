FROM python:latest
WORKDIR /app
COPY app.py /app
RUN pip install --no-cache-dir gunicorn flask flask_cors
CMD ["gunicorn", "-w", "4", "app:app"]