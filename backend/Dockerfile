FROM alpine:latest

WORKDIR /opt/ultra-task

COPY . .

RUN chmod +x install.sh start.sh \
    && ./install.sh

EXPOSE 8080

CMD ["./start.sh"]