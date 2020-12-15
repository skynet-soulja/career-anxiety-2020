"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services["comment"].search(ctx.query);
    } else {
      entities = await strapi.services["comment"].find(ctx.query, [
        "name",
        "content",
        "created_at",
      ]);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models["comment"] })
    );
  },
};
