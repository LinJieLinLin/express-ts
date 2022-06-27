import { connect } from 'mongoose'

export const ConnectDb = async () => {
  try {
    const mongoURI: string = process.env.DATABASE_URL || ''
    await connect(mongoURI)
    console.log('MongoDB Connected')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
