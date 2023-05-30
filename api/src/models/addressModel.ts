import mongoose, { Document, ObjectId, Schema } from 'mongoose'

export interface AddressDocument extends Document {
  user: ObjectId
  city: string
  country: string
  state: string
  street: string
  postalCode: string
}

const AddressSchema = new Schema<AddressDocument>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    // It needs to be unique to prevent users from creating more than 1 address
    unique: true,
    ref: 'User'
  },
  city: {
    type: String,
    required: [true, 'Please, add city!']
  },
  country: {
    type: String,
    required: [true, 'Please, add country!'],
  },
  state: {
    type: String,
  },
  street: {
    type: String,
    required: [true, 'Please, add street!'],
  },
  postalCode: {
    type: String,
    required: [true, 'Please, add postal code!'],
  }
})

const Address = mongoose.model<AddressDocument>('Address', AddressSchema)
export default Address
