import Router from "@koa/router";
import routerHandler from "../../lib/handler";
import getTicketsHandler from "./getTickets";
import addTicketHandler from "./addTicket";

export const ticketsRouter = new Router({
  prefix: "/tickets",
});

ticketsRouter.use(async (ctx, next) => {
  console.log("router based", ctx.body);
  await next();
  console.log("router based", ctx.body);
});

ticketsRouter.get("/", routerHandler(getTicketsHandler));

ticketsRouter.post("/", routerHandler(addTicketHandler));
