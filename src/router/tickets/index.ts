import Router from "@koa/router";
import { generateTicketModel } from "src/database/models/event/ticket/generate";
import routerHandler from "../lib/handler";
import { TicketModel } from "src/database/models/event/ticket";

export const ticketsRouter = new Router({
  prefix: "/tickets",
});

ticketsRouter.use(async (ctx, next) => {
  console.log("router based", ctx.body);
  await next();
  console.log("router based", ctx.body);
});

const addTicket: Router.Middleware = async (ctx) => {
  const ticket = generateTicketModel();
  await ticket.save();
  ctx.body = ticket.toJSON();
};

const getTickets: Router.Middleware = async (ctx) => {
  const tickets = await TicketModel.find();
  ctx.body = {
    total: tickets.length,
    tickets,
  };
};

ticketsRouter.get("/", routerHandler(getTickets));

ticketsRouter.post("/", routerHandler(addTicket));
