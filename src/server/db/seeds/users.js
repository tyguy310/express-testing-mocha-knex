exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({username: 'huey', email: 'huey@gmail.com'}),
        knex('users').insert({username: 'duey', email: 'duey@gmail.com'}),
        knex('users').insert({username: 'looey', email: 'looey@gmail.com'})
      ]);
    });
};
