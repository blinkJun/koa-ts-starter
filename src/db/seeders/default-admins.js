'use strict';

const tableName = 'admins'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert(tableName, [
            {
                name: 'admin',
                password: 'admin',
                head_pic: 'https://pic1.zhimg.com/80/v2-37ca81c5f2cb001cad9cd11616c74bd7_720w.jpg?source=1940ef5c',
                role_id: 1,
                dept_id: 1,
                phone_number: 18520879544,
                email: '530080147@qq.com',
                status: 1,
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
