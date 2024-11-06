const sanitizeHtml = require('sanitize-html');

const marked = require('marked');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ministration.ministration', ({ strapi }) => ({
    async find(ctx) {
        const result = await super.find(ctx);
        result.data = result.data.map(ministration => {
            ministration.attributes.content = sanitizeHtml(marked.parse(ministration.attributes.content));
            const date = new Date(ministration.attributes.date);
            const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
            ministration.attributes.date = utcDate.toLocaleDateString('pt-BR');
          return ministration
        });
    
        return result;
      },
      async findOne(ctx) {
        const result = await super.findOne(ctx);
        result.data.attributes.content = sanitizeHtml(marked.parse(result.data.attributes.content));
        const date = new Date(result.data.attributes.date);
        const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
        result.data.attributes.date = utcDate.toLocaleDateString('pt-BR');
        return result;
      }
  
  }))
