# p2-iproject-server

Individual Portfolio Server

## sequelize model

sequelize model:generate --name User --attributes username:String,email:String,password:String,phoneNumber:String,address:String,profilePict:string
sequelize model:generate --name Animal --attributes name:String,type:String,imageUrl:String,UserId:Integer
sequelize model:generate --name Chat --attributes RoomId:Integer,messages:String,AnimalId:Integer,UserId:Integer

## seed

sequelize seed:generate --name insertAllUser
sequelize seed:generate --name insertAllAnimal
sequelize seed:generate --name insertAllChat
