
const { DataTypes } = require('sequelize')

const tableName = 'admins'

const baseFileds = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
    },
    name: {
        type: DataTypes.STRING,
        comment: '用户名'
    },
    password: {
        type: DataTypes.STRING,
        comment: '密码'
    },
    head_pic: {
        type: DataTypes.STRING,
        comment: '头像'
    },
    role_id: {
        type: DataTypes.BIGINT,
        comment: '角色id'
    },
    dept_id: {
        type: DataTypes.BIGINT,
        comment: '部门id'
    },
    phone_number: {
        type: DataTypes.BIGINT,
        comment: '手机号'
    },
    email: {
        type: DataTypes.STRING,
        comment: '邮箱'
    },
    status: {
        type: DataTypes.TINYINT,
        comment: '状态，0：禁用，1：正常'
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
        await queryInterface.createTable(tableName, baseFileds);
    },
    async down(queryInterface) {
        await queryInterface.dropTable(tableName);
    }
};