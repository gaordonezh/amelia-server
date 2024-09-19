const { Schema, model } = require('mongoose');

const DeviceSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    serialNumber: {
      type: String,
      required: [true, 'serial number is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'company',
      required: [true, 'user es requerido'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model('device', DeviceSchema);
