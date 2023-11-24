FROM cypress/included:12.12.0

WORKDIR /tests

COPY ./package.json .
COPY ./cypress.config.js .
COPY ./cypress ./cypress

RUN npm install

CMD ["npx", "cypress", "run", "--browser", "chrome", "--headed"]
