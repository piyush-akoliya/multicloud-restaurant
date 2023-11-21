#Stage-1

FROM node:17-alpine as builder
WORKDIR /app
COPY ./PartnerApp/Frontend/package.json .
COPY ./PartnerApp/Frontend/package-lock.json .
RUN npm cache clean --force
RUN npm install
COPY ./PartnerApp/Frontend/ .
RUN npm run build
EXPOSE 3003
CMD ["npm", "start"]
