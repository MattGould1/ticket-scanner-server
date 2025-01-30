import dotenv from "dotenv";

dotenv.config();

export enum Environment {
  PORT = "PORT",
  MONGODB_URI = "MONGODB_URI",
  JWT_SECRET = "JWT_SECRET",
  NODE_ENV = "NODE_ENV",
  BASE_URL = "BASE_URL",
}

const environment = () => {
  const keys = Object.values(Environment);

  return keys.reduce<Record<keyof typeof Environment, string>>(
    (prev, curr) => {
      if (process.env[curr] === undefined) {
        throw new Error(`${curr} is not set`);
      }

      prev[curr as keyof typeof Environment] = process.env[curr];

      return prev;
    },
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
    {} as Record<keyof typeof Environment, string>
  );
};

export default environment;
