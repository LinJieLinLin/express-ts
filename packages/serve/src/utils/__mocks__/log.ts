const Log = {
  log: (msg: string, obj?: object) => {
    if (!msg) console.log(msg || obj)
  },
  info: (msg: string, obj?: object) => {
    console.log(msg || obj)
  },
  warn: (msg: string, obj?: object) => {
    console.log(msg || obj)
  },
  error: (msg: string, obj?: object) => {
    console.log(msg || obj)
  },
  debug: (msg: string, obj?: object) => {
    console.log(msg || obj)
  },
  silly: (msg: string, obj?: object) => {
    console.log(msg || obj)
  },
}

export default Log
