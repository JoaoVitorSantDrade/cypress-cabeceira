FROM cypress/included:12.12.0

WORKDIR /tests

COPY ./package.json .
COPY ./cypress.config.js .
COPY ./cypress ./cypress

RUN npm install

ENTRYPOINT ["npx", "cypress", "run"]