import Koa from "koa";
import router from "./router/routes";
import { getMongoose } from "./database";
import jwtAuthentication, {
  jwtErrorHandler,
} from "./middleware/jwtAuthentication";
import bodyParser from "koa-bodyparser";
import { authRouter } from "./router/routes/auth";
import mount from "koa-mount";
import graphqlApp from "./graphql";
import cors from "@koa/cors";
import { UserModel } from "./database/models/user";
import { MongoServerError, ObjectId } from "mongodb";
import environment from "./lib/environment";
import { EventModel } from "./database/models/event/event";
import { EventAttendeeModel } from "./database/models/eventAttendee";
import * as https from "https";
import * as fs from "fs";
import * as path from "path";

const app = new Koa();

app.use(jwtErrorHandler);
app.use(mount("/rest", cors()));
app.use(jwtAuthentication);
app.use(bodyParser());

app.use(router.routes());
app.use(authRouter.routes());

app.use(mount("/", graphqlApp));

const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, "../certs/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "../certs/cert.pem")),
};

https
  .createServer(sslOptions, app.callback())
  .listen(environment().PORT, async () => {
    getMongoose();

    /**
     * Just for demo purposes, password is always "password"
     */
    try {
      const teamId = new ObjectId();
      const ticketId = new ObjectId();
      const event = await EventModel.create({
        teamId,
        name: "Test Event",
        startDate: new Date(),
        endDate: new Date(),
        venue: "Test Venue",
        description: "Test Description",
        image: "Test Image",
      });
      await UserModel.create({
        name: "Matthew Gould",
        email: "matthew@gould.com",
        teamId,
      });
      await EventAttendeeModel.create({
        eventId: event.id,
        name: "Matthew Gould",
        email: "matthew@gould.com",
        ticketId,
        teamId,
      });
    } catch (err: unknown) {
      if (err instanceof MongoServerError && err.code === 11000) {
        console.log("User already exists");

        // await UserModel.deleteMany({ email: "matthew@gould.com" });
        // await EventModel.deleteMany();
        // await EventAttendeeModel.deleteMany();
      } else {
        throw err;
      }
    }

    console.log(
      `Server running on https://localhost:${environment().PORT}\n`,
      `External IP: https://${process.env.HOST_IP}:${environment().PORT}`
    );
  });

export { router, app };
