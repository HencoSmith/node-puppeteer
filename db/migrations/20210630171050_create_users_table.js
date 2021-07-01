/* eslint-disable */
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.bigInteger('id').primary();
        table.string('email', '256').notNullable();
        table.string('first_name', 32).notNullable();
        table.string('last_name', 32).notNullable();
        table.text('avatar');

        // Could be improved by adding indices on fields
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('users');
}