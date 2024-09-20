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
    username: {
      type: String,
      required: [true, 'user is required'],
      unique: [true, 'user not available'],
    },
    password: {
      type: String,
      required: [true, 'El password es obligatorio'],
    },
    // typeDoc: {
    //   type: String,
    //   required: [true, 'El tipo de documento es obligatorio'],
    // },
    // documentNumber: {
    //   type: String,
    //   required: true,
    // },
    photo: {
      type: String,
    },
    sexo: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.methods.toJSON = function () {
  const user = this;
  const useObject = user.toObject();
  delete useObject.password;
  return useObject;
};

module.exports = model('user', UserSchema);
