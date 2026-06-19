/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

/*
Main module resposnible for routing the APIs Hits to the right controller

*/
Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/buildings','BuildingsController.store');
Route.get('/buildings','BuildingsController.list');

/*

Route.post('/buildings', async () => {
  return {
    success: true,
  }
})
 */



