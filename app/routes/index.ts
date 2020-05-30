import paymentRouter from './paymentRoute';
import { Request, Response } from 'express';
import { context } from '../context';
import { handle } from '../services/errorHandler';
import { MongoDbProvider } from '../database/mongoDbProvider';
import { PostgreSqlProvider } from '../database/postgreSqlProvider';

export module Routes {
 export function mount(app) {
   const mongoDbProvider = new MongoDbProvider();
   const postgreSqlProvider = new PostgreSqlProvider();

   postgreSqlProvider.preload();
   mongoDbProvider.preload();

   // INFO: Keep this method at top at all times
   app.all('/*', async (req: Request, res: Response, next) => {
      try {
         // create context
         let dbProviders = {
            mongoDbProvider: mongoDbProvider,
            postgreSqlProvider: postgreSqlProvider
         }
         res.locals.ctx = await context(req, dbProviders);

         next();
      } catch (e) {
         let error = handle(e);
         res.status(error.code).send({message: error.message});
      }
   });

   // TODO: Add your routes here
   app.use('/payment', paymentRouter);

   // Use for error handling
   app.use(function (err, req, res, next) {
      let error = handle(err);
      console.log(err);
      res.status(error.code).send({message: error.message});
   });

 }
}
