'use strict';

/**
 * nortification service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::nortification.nortification');
