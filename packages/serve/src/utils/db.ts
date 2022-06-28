import mongoose from 'mongoose'
import Log from './log'
import { AnyObject } from './../types/common'
let isConnect = false
let db
export const ConnectDb = async (uri = '') => {
  try {
    const mongoURI: string = process.env.DATABASE_URL || uri
    const conn = mongoose.connection
    conn.on('disconnected', () => {
      Log.log('MongoDB has Closed')
      isConnect = false
    })
    if (process.env.NODE_ENV === 'test' && !uri) {
      Log.log('MongoDB is in test mode')
    } else {
      console.log(mongoURI, 'mongoURI')
      db = await mongoose.connect(mongoURI)
      isConnect = true
      Log.log('MongoDB Connected')
    }
    return true
  } catch (err) {
    Log.error('ConnectDb', err as AnyObject)
    return Promise.reject(5000)
  }
}
export const CloseDb = async () => {
  await mongoose.connection.close()
  Log.log('MongoDB Closed')
  return true
}
export const IS_CONNECT = isConnect
export const DB = db
