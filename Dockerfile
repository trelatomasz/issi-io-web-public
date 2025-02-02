FROM node:18 AS frontend-deps
COPY projects/ui/package.json /var/app/ui/package.json
COPY projects/ui/package-lock.json /var/app/ui/package-lock.json
WORKDIR /var/app/ui
RUN npm ci

FROM frontend-deps as frontend
COPY projects/ui/node_modules /var/app/ui/node_modules
COPY projects/ui/src /var/app/ui/src
COPY projects/ui/public /var/app/ui/public
RUN npm run build

FROM python:3.9 as backend-deps
COPY projects/movies-rest/requirements.txt /var/app/api/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /var/app/api/requirements.txt
RUN  pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
RUN  pip install transformers tqdm numpy scikit-learn scipy nltk sentencepiece
RUN  pip  install --no-deps sentence-transformers


FROM python:3.9 as backend
COPY --from=backend-deps /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY --from=frontend /var/app/ui/build /var/app/ui/public
WORKDIR /var/app/api
COPY projects/movies-rest /var/app/api
CMD ["python", "-m", "uvicorn", "main:app", "--port", "80", "--host", "0.0.0.0"]
