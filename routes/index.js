const productsRouter = require('./productRoutes');

const routers = (app) => {
    app.use('/api/products', productsRouter);
}

module.exports = routers;