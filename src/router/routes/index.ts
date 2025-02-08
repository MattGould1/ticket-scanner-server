import Router from "@koa/router";
import qrcode from "qrcode";
import { EventAttendeeModel } from "src/database/models/eventAttendee";

const router = new Router({
  prefix: "/rest/auth",
});

router.get("/", async (ctx) => {
  const model = await EventAttendeeModel.findOne().where({
    email: "matthew@gould.com",
  });

  if (!model) {
    ctx.body = `Could not find model for attendee, oops`;
    return;
  }

  const qr = await qrcode.toDataURL(model.id);

  ctx.body = `
  <html>
    <body>
      <img width="400px" src="${qr}" />
    </body>
  </html>
  `;
});

export default router;
