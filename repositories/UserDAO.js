'use strict';

require('../models/User.js');
const mongoose = require('mongoose');
const userModel = mongoose.model('User');

const bcrypt = require("bcrypt")
const saltRounds = 10

class User {
  // adicionando produto
  static async create(data) {
    //const tags = data.tag.split(',');
    var obj = {};
    obj.name = data.name;
    obj.birthDate = data.birthDate;
    obj.email = data.email;

    obj.password = this.encryptPassword(data.password);

    obj.photo = data.photo;
    obj.active = data.active;
    return await userModel(obj).save();
  }

  static encryptPassword(text) {
    var salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(text, salt);
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

  static async getLast() {
    var users = await this.getAll();
    return users[users.length - 1];
  }

  // verificando se o produto já existe
  static async verifyProduct(data) {
    return await userModel.findOne(data);
  }
}

module.exports = User;