import { generateTicketModel } from "src/database/models/event/ticket/generate";
import { RouterMiddlewareWithBody } from "../../../lib/handler";

const addTicketHandler: RouterMiddlewareWithBody = async (ctx) => {
  const ticket = generateTicketModel();
  await ticket.save();
  ctx.body = ticket.toJSON();
};

export default addTicketHandler;
