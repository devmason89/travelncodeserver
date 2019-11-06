module.exports = (sequelize, DataTypes) => {
    const Office = sequelize.define('office', {        //define mappings between attribute and the table
        name: {
            type: DataTypes.STRING,
            allowNull: false                    
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        freeWifi: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        freeRestroom: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        
        },
        comments: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    })
    return Office;                              
}                               