const schedule = require('node-schedule')
const { getGlobalStatus, getRAMBalance, getNumberInString, sendMessage } = require('./api')
const { setThreshold } = require('./handle')

const canSendMessage = setThreshold(0.005)

const getRAMPrice = (state) => {
  getRAMBalance().then(({ data }) => {
    const ramBaseBalance = getNumberInString(data.rows[0].base.balance)
    const ramQuoteBalance = getNumberInString(data.rows[0].quote.balance)
    const ramPriceEos = ((ramQuoteBalance / ramBaseBalance) * 1024).toFixed(8)
    const printMsg = `当前内存使用率：${(state * 100).toFixed(2)} % \n报价：${ramPriceEos} EOS/kb \n\n ${(new Date()).toLocaleString()}\n-----------`
    console.log(printMsg)
    if (canSendMessage(state)) {
      sendMessage(`当前内存使用率：${(state * 100).toFixed(2)} % \n报价：${ramPriceEos} EOS/kb`) 
    }
  })
}

const getRAMStatus = () => {
  getGlobalStatus().then(({ data }) => {
    const { total_ram_bytes_reserved, max_ram_size } = data['rows'][0]
    const state = total_ram_bytes_reserved / max_ram_size
    const seconds = (new Date()).getSeconds()
    // console.log(`当前内存使用率：${(state * 100).toFixed(2)} %`)
    getRAMPrice(state)
  })
}

setInterval(getRAMStatus, 60000)
