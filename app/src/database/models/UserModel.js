const { BaseModel, EDatabaseTypes } = require('promisedb');

class UserModel extends BaseModel {
  constructor() {
    super({
      id: {
        type: EDatabaseTypes.UINT,
        primaryKey: true,
        autoIncrement: true,
        maxSize: 999
      },
      name: {
        type: EDatabaseTypes.STRING,
        maxSize: 50
      },
      email: {
        type: EDatabaseTypes.STRING,
        maxSize: 100,
        unique: true
      },
      phone: {
        type: EDatabaseTypes.STRING,
        maxSize: 15,
        unique: true
      },
      address: {
        type: EDatabaseTypes.STRING,
        maxSize: 200
      }
    });
  }
}

module.exports = UserModel;
