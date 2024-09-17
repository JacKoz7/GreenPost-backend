module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        title: { // colum number one in our database
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: { // colum number two
            type: DataTypes.STRING,
            allowNull: false,
        },
        Username: { // colum number three 
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Posts;
};