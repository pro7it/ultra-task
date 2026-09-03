FROM alpine:latest

WORKDIR /opt/ultra-task

COPY . .

RUN chmod +x install.sh start.sh \
    && ./install.sh

EXPOSE 5173

CMD ["./start.sh"]