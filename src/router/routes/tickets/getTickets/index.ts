import { RouterMiddlewareWithBody } from "../../../lib/handler";
import { TicketModel } from "src/database/models/event/ticket";

const getTicketsHandler: RouterMiddlewareWithBody = async (ctx) => {
  const tickets = await TicketModel.find();
  ctx.body = {
    total: tickets.length,
    tickets,
  };
};

export default getTicketsHandler;
