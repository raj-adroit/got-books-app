module.exports = function(sequelize, Sequalize) {
    var ReviewSchema = sequelize.define("Review", {
    	bookId: Sequalize.INTEGER,
        message: Sequalize.STRING
    },{
        timestamps: false
    });
    return ReviewSchema;
}