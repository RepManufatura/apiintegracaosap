import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('Ordens', 'OrdensController')
    .apiOnly()
    .middleware({
      store: ['auth'],
    })
}).prefix('api')