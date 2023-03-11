'use strict';

require('../models/User.js');
const mongoose = require('mongoose');
const userModel = mongoose.model('User');

class User {
  // adicionando produto
  static async create(data) {
    //const tags = data.tag.split(',');
    var obj = {};
    obj.name = data.name;
    obj.birthDate = data.birthDate;
    obj.email = data.email;
    obj.password = data.password;
    obj.photo = data.photo;
    obj.active = data.active;
    return await userModel(obj).save();
    //await userModel.insertMany(tags);
    //return await userModel.save();
  }

  // atualizando produto
  static async update(id, data) {
    return await userModel.findOneAndUpdate(id, { $set: data });
  }

  // deletando produto
  static async delete(id) {
    return await userModel.findByIdAndRemove(id);
  }

  // buscando
  static async getAll() {
    return await userModel.find({});
  }

  // verificando se o produto já existe
  static async verifyProduct(data) {
    return await userModel.findOne(data);
  }
}

module.exports = User;