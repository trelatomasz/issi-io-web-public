FROM node:18 AS frontend
COPY projects/movies-react/package.json /var/app/ui/package.json
COPY projects/movies-react/package-lock.json /var/app/ui/package-lock.json
WORKDIR /var/app/ui
RUN npm ci
COPY projects/movies-react/ui/src /var/app/ui/src
COPY projects/movies-react/public /var/app/ui/public
RUN npm run build

FROM python:3.9
COPY --from=frontend /var/app/ui/build /var/app/ui/build
COPY projects/movies-rest/requirements.txt /var/app/api/requirements.txt
WORKDIR /var/app/api
RUN pip install --no-cache-dir --upgrade -r /var/app/api/requirements.txt
COPY projects/movies-rest /var/app/api
CMD ["uvicorn", "main:app", "--port", "80", "--host", "0.0.0.0"]
