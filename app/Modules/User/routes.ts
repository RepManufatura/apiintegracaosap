import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('user/{Id}', 'UsersController')
    .apiOnly()
    .middleware({
      index: ['auth'],
      show: ['auth'],
      store: ['auth'],
      update: ['auth'],
      destroy: ['auth'],
    })
}).prefix('api')