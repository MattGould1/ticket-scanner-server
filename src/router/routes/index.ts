import Router from "@koa/router";
import qrcode from "qrcode";

const router = new Router({
  prefix: "/rest/auth",
});

router.get("/", async (ctx) => {
  const qr = await qrcode.toDataURL("679c448e471d4d80ca6a781c");

  ctx.body = `
  <html>
    <body>
      <img width="400px" src="${qr}" />
    </body>
  </html>
  `;
});

export default router;
