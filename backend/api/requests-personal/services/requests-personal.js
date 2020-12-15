"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async triageRequest(entity) {
    let to;

    if (entity.recipient === "General") {
      const writers = await strapi.services.writers.find({}, ["email"]);

      to = writers.map((author) => author.email);
    } else {
      const { email } = await strapi.services.writers.findOne(
        { name: entity.recipient },
        ["email"]
      );

      to = email;
    }

    await strapi.plugins["email"].services.email.send({
      template_id: "d-53204f16a8d4447fb3e5d050e39c70c6",
      to,
      dynamic_template_data: entity,
    });
  },
};
