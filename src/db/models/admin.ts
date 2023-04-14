import { Sequelize, Model } from 'sequelize';
import { baseFileds } from '../migrations/create-admins'

class Admin extends Model {
    declare id: number
    declare name: string
    declare password: string
    declare head_pic: string
    declare role_id: string
    declare dept_id: string
    declare phone_number: number
    declare email: string
    declare status: number
    declare created_at:string
    declare updated_at:string
}

const tableName = 'depts'

export default (sequelize: Sequelize): typeof Admin => {
    Admin.init(
        {
            ...baseFileds
        },
        {
            tableName: tableName,
            timestamps:false,
            sequelize, // passing the `sequelize` instance is required
        },
    );
    return Admin
}