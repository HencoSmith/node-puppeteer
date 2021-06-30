exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.bigInteger('id').primary();
        table.string('email', '256').notNullable();
        table.string('first_name', 32).notNullable();
        table.string('last_name', 32).notNullable();
        table.text('avatar');
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
}