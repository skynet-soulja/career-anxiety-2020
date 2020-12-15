"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    console.log("create");
    let entity;

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services["requests-newsletter"].create(data, {
        files,
      });
    } else {
      console.log(ctx.request.body);
      entity = await strapi.services["requests-newsletter"].create(
        ctx.request.body
      );
    }

    console.log(entity);

    // const status = await strapi.services[
    //   "requests-newsletter"
    // ].addContactToSendgridList(entity);

    return sanitizeEntity(entity, {
      model: strapi.models["requests-newsletter"],
    });
  },
};
