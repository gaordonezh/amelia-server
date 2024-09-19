const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
    },
    lastName: {
      type: String,
      required: [true, 'El apellido es obligatorio'],
    },
    dateBirth: {
      type: Date,
    },
    email: {
      type: String,
      required: [false, 'El email es obligatorio'],
    },
    address: {
      type: String,
    },
    phone: {
      type: Number,
    },
    user: {
      type: String,
      // required: [true, 'El user es obligatoria'],
    },
    password: {
      type: String,
      // required: [true, 'El password es obligatorio'],
    },
    typeDoc: {
      type: String,
      // required: [true, 'El tipo de documento es obligatorio'],
    },
    documentNumber: {
      type: String,
      // required: true,
    },
    photo: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sexo: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model('user', UserSchema);
