'use strict';

const tableName = 'depts'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert(tableName, [
            {
                parent_id: null,
                name: 'admin-root',
                created_at: new Date(),
                updated_at: new Date()
            }
        ], {});
    },

    async down(queryInterface) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete(tableName, null, {});
    }
};
