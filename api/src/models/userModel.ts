import mongoose, { Document, ObjectId, Schema } from 'mongoose'

export interface UserDocument extends Document {
  firstname: string
  lastname: string
  username: string
  email: string
  password: string
  rights: "admin" | "user"
  address: ObjectId
  reviews: ObjectId[]
}

const UserSchema = new Schema<UserDocument>(
  {
    firstname: {
      type: String,
      required: [true, 'Add name!']
    },
    lastname: {
      type: String,
      required: [true, 'Please, add the lastname']
    },
    username: {
      type: String,
      required: [true, 'Please, add a username'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Add email!'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Add password']
    },
    // This field is not required to set everyone to users
    // The only unique way to have rights as admin is to send an explicit request not using the forms from UI
    rights: {
      type: String,
      required: false
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Address'
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
        required: true,
      },
    ],
  },
  {
    timestamps: true
  }
)

const User = mongoose.model<UserDocument>('User', UserSchema)
export default User