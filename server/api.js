const axios = require('axios')
const { DINGTALK_ROBOT_API, EOS_RAM_API } = require('./config/basic')

const transformResponse = [(data) => {
  try {
    return JSON.parse(data)
  } catch (err) {
    console.log(err)
  }
}]

exports.getGlobalStatus = () => {
  const queryData = { json: 'true', code: 'eosio', scope: 'eosio', table: 'global' }
  return axios.post(EOS_RAM_API, queryData, { transformResponse })
}

exports.getRAMBalance = () => {
  const queryData = { json: 'true', code: 'eosio', scope: 'eosio', table: 'rammarket', limit: '10' }
  return axios.post(EOS_RAM_API, queryData, { transformResponse })
}

exports.getNumberInString = string => {
  return /^[0-9.]+/.exec(string) ? /^[0-9.]+/.exec(string)[0] - 0 : 0
}

const axios_with_header = axios.create({
  headers: {'Content-Type': 'application/json'}
})

exports.sendMessage = (message, isImport = false) => {
  const queryData = {
    msgtype: 'text',
    text: {
      content: message
    },
    at: {
      isAtAll: isImport
    }
  }
  return axios_with_header.post(DINGTALK_ROBOT_API, queryData, { transformResponse })
}