/* eslint-disable */
exports.up = function(knex) {
    return knex.schema.createTable('finance', function (table) {
        // Could be improved by making ID auto increment or using UUID
        table.bigInteger('id').primary();
        table.date('date').notNullable();
        table.float('commissions_total').defaultTo(0);
        table.integer('clicks').defaultTo(0);

        table.index(['date'], 'finance_date_index');
        table.index(['commissions_total'], 'finance_commissions_total_index');
        table.index(['clicks'], 'finance_clicks_index');
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('finance');
}