// module.exports = function(sequelize, DataTypes) {
//   var MatchList = sequelize.define("MatchList", {
//     id: {type: DataTypes.INTEGER,
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey:true
//     },
//     user_id: {type: DataTypes.INTEGER,
//         allowNull: false,
//         REFERENCES: {model: "user",
//                         key: "id"}
//     },
//     match: {type: DataTypes.STRING,
//         allowNull: false
//     },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
    
//   });
//   return MatchList;
// };