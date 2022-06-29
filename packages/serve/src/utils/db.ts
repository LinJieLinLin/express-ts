import mongoose from 'mongoose'
import Log from './log'
import { AnyObject } from './../types/common'
let db
export const ConnectDb = async (uri = '') => {
  try {
    const mongoURI: string = uri || process.env.DATABASE_URL || ''
    const conn = mongoose.connection
    conn.on('disconnected', () => {
      Log.log('MongoDB has Closed')
    })
    if (process.env.NODE_ENV === 'test' && !uri) {
      Log.log('MongoDB is in test mode')
    } else {
      db = await mongoose.connect(mongoURI)
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
export const DB = db
