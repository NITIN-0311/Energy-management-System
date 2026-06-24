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
import AuthAdmin from 'App/Middleware/AuthAdmin';

/*
Main module resposnible for routing the APIs Hits to the right controller

*/
Route.get('/', async () => {
  return { hello: 'world' }
})
/*
Route.post('user/register','AuthController.registerUser');
Route.post('admin/register','AuthController.registerAdmin');
Route.post('user/login', 'AuthController.login');
*/
/*
Route.post('/test', async ({ auth }) => {
  console.log(auth.use('admin').user)
});
*/
Route.post('/admin/register','AuthController.registerAdmin');
Route.post('/user/register','AuthController.registerUser');
Route.post('/user/login','AuthController.userLogin');
Route.post('/admin/login','AuthController.adminLogin');
Route.get('/accessthirdparty','ThirdPartiesController.accessThirdParty')

Route.group(()=>{
    Route.post('/buildings','BuildingsController.store');
    Route.patch('/buildings/update/:id','BuildingsController.updateById');
    Route.delete('/buildings/delete/:id','BuildingsController.deleteById');
}).middleware('AuthAdmin');

Route.group(()=>{
    Route.get('/buildings','BuildingsController.fetchall');
    Route.get('/buildings/:id','BuildingsController.filter');
    Route.get('/buildings/buildingtype/:type','BuildingsController.fetchByType');
    Route.get('/buildings/area/:total_area_sqft','BuildingsController.fetchByArea');
}).middleware('AdminOrUser').middleware('CustomAuth');

//Routes for
//Route.delete('/electrical_assests','ElectricalAssetsController.list');

/*

Route.post('/buildings', async () => {
  return {
    success: true,
  }
})
 */



