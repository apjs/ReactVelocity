FROM godronus/ubuntu-csx
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build



#FROM mhart/alpine-node
#RUN yarn global add serve
#WORKDIR /app
#COPY --from=0 /app/build .
#CMD [“serve”, “-p 80”, “-s”, “.”]
EXPOSE 8080
EXPOSE 3000
CMD ["npm", "start" ]
