"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    let entity;

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services["requests-personal"].create(data, {
        files,
      });
    } else {
      entity = await strapi.services["requests-personal"].create(
        ctx.request.body
      );
    }

    console.log(entity);

    // await strapi.services["requests-personal"].triageRequest(entity);

    return sanitizeEntity(entity, {
      model: strapi.models["requests-personal"],
    });
  },
};
