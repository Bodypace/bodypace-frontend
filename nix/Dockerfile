FROM node:latest
WORKDIR /source
RUN --mount=type=bind,target=. npx playwright install
RUN --mount=type=bind,target=. npx playwright install-deps
CMD ["bash"]
EXPOSE 6006
