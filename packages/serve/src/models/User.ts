import { Schema, model } from 'mongoose'

export interface IUser {
  username: string
  password: string
  ip?: string
  createTime?: number
  updateTime?: number
  lastLogin?: number
}
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
  },
  updateTime: {
    type: Date,
    default: Date.now(),
  },
  createTime: {
    type: Date,
    default: Date.now(),
  },
  lastLogin: {
    type: Date,
    default: Date.now(),
  },
})
const User = model<IUser>('User', userSchema)
export default User
