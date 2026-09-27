const { Datatypes, Model } = require('sequelize')
const db = require('.src/config/database')

class User extends Model {
    static id
    static name
    static email
    static password
}

User.init ({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize: db,
    modelName:'User',
    tableName: 'user',
    timestamps: true,
    paranoid: true
})

User.prototype.toJSON = function () {
    const { password, ...user } = this.get()
    delete user.password
    return user
}

module.exports = User