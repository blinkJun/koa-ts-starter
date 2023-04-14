const {DataTypes} = require('sequelize')

const tableName = 'depts'

const baseFileds = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
    },
    parent_id: {
        type: DataTypes.BIGINT,
        comment: '父级id'
    },
    name: {
        type: DataTypes.STRING,
        comment: '名称'
    },
    created_at: {
        type: DataTypes.DATE
    },
    updated_at: {
        type: DataTypes.DATE
    }
}

exports.baseFileds = baseFileds

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    baseFileds,
    async up(queryInterface) {
        await queryInterface.createTable(tableName,baseFileds );
    },
    async down(queryInterface) {
        await queryInterface.dropTable(tableName);
    }
};