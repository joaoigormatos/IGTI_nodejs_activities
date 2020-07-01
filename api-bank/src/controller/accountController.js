const { readFile, writeFile } = require('fs').promises
const path = require('path')

const addAccount = async (req, res) => {
  const { name, ballance } = req.body

  try {
    const { nextId, accounts } = JSON.parse(await readFile(path.resolve(__dirname, '../', 'data', global.fileName), "utf-8"))
    const account = {
      id: nextId + 1,
      name,
      ballance
    }

    accounts.push(account)

    await writeFile(path.resolve(__dirname, '../', 'data', global.fileName), JSON.stringify({ nextId: nextId + 1, accounts }))
    global.logger.info(`POST /account - ${JSON.stringify(account)}`)

  }
  catch (err) {
    global.logger.error(`POST /account - ${JSON.stringify(err.message)}`)
    return res.status(400).json({ message: err.message })

  }
  return res.json({ "hello": "world" })
}

const getAccounts = async (_, res) => {
  try {
    let accounts = JSON.parse(await readFile(path.resolve(__dirname, '../', 'data', global.fileName), "utf-8"))
    delete accounts.nextId;
    global.logger.info(`GET /account - ${JSON.stringify(accounts)}`)

    return res.json(accounts)
  }
  catch (err) {
    global.logger.error(`GET /account/:id - ${JSON.stringify(err.message)}`)
    return res.status(500).json({ message: "internal serve error" })
  }
}

const getOneAccount = async (req, res) => {
  try {
    const { id } = req.params
    let { accounts } = JSON.parse(await readFile(path.resolve(__dirname, '../', 'data', global.fileName), "utf-8"))
    const account = accounts.find(account => {
      return account.id === parseInt(id)
    })

    if (account) {
      global.logger.info(`GET /account - ${JSON.stringify(account)}`)

      return res.json(account)
    }
    throw new Error(`id ${id} not found`)
  } catch (err) {
    global.logger.error(`GET /account/:id - ${JSON.stringify(err.message)}`)

    return res.status(400).json({ message: err.message })
  }
}
const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params
    let resultSet = JSON.parse(await readFile(path.resolve(__dirname, '../', 'data', global.fileName), "utf-8"))

    if (!resultSet.accounts.find(item => item.id === parseInt(id))) {
      throw new Error(`id ${id} not found`)
    }
    const accounts = resultSet.accounts.filter(account => account.id !== parseInt(id))

    await writeFile(path.resolve(__dirname, '../', 'data', global.fileName), JSON.stringify({ nextId: resultSet.nextId + 1, accounts }))
    global.logger.info(`DELETE /account - ${JSON.stringify(account)}`)

    return res.send({ message: `the account with id ${id} has been deleted successfully` })


  }
  catch (err) {

    global.logger.error(`DELETE /account - ${JSON.stringify(err.message)}`)
    return res.status(400).json({ message: err.message })

  }
}
const updateAccount = async (req, res) => {
  try {
    const account = req.body
    let resultSet = JSON.parse(await readFile(path.resolve(__dirname, '../', 'data', global.fileName), "utf-8"))
    console.log(account)
    const oldIndex = resultSet.accounts.findIndex(item => item.id === parseInt(account.id))

    if (!oldIndex) {
      throw new Error(`id ${account.id} not found`)
    }


    resultSet.accounts[oldIndex] = account
    await writeFile(path.resolve(__dirname, '../', 'data', global.fileName), JSON.stringify({ nextId: resultSet.nextId + 1, accounts: resultSet.accounts }))
    //writing log
    global.logger.info(`PUT /account - ${JSON.stringify(account)}`)

    return res.send({ message: `the account with id ${account.id} has been updated successfully` })

  }
  catch (err) {
    global.logger.error(`PUT /account - ${JSON.stringify(err.message)}`)

    return res.status(400).json({ message: err.message })
  }
}

const deposit = async (req, res) => {
  try {
    const { id, value } = req.body
    let resultSet = JSON.parse(await readFile(path.resolve(__dirname, '../', 'data', global.fileName), "utf-8"))
    const index = resultSet.accounts.findIndex(item => item.id === parseInt(id))

    if (!index) {
      throw new Error(`id ${id} not found`)
    }


    resultSet.accounts[index].ballance += value
    await writeFile(path.resolve(__dirname, '../', 'data', global.fileName), JSON.stringify({ nextId: resultSet.nextId + 1, accounts: resultSet.accounts }))

    global.logger.info(`POST /deposit - ${JSON.stringify(err.message)}`)


    return res.send({ message: `new ballace is ${resultSet.accounts[index].ballance}` })

  }
  catch (err) {
    global.logger.error(`POST /deposit - ${JSON.stringify(err.message)}`)

    return res.status(400).json({ message: err.message })
  }
}

const transaction = async (req, res) => {
  try {
    const { id, value } = req.body
    let resultSet = JSON.parse(await readFile(path.resolve(__dirname, '../', 'data', global.fileName), "utf-8"))
    const index = resultSet.accounts.findIndex(item => item.id === parseInt(id))

    if (!index) {
      throw new Error(`id ${id} not found`)
    }
    if (resultSet.accounts[index].ballance < parseFloat(value))
      throw new Error(`you have ${resultSet.accounts[index].ballance} and you want to take that ${value}`)

    resultSet.accounts[index].ballance -= value
    await writeFile(path.resolve(__dirname, '../', 'data', global.fileName), JSON.stringify({ nextId: resultSet.nextId + 1, accounts: resultSet.accounts }))
    global.logger.info(`POST /transaction - ${JSON.stringify(err.message)}`)

    return res.send({ message: `new ballace is ${resultSet.accounts[index].ballance}` })

  }
  catch (err) {
    global.logger.error(`POST /transaction - ${JSON.stringify(err.message)}`)
    return res.status(400).json({ message: err.message })
  }
}



exports.addAccount = addAccount
exports.getAccounts = getAccounts
exports.getOneAccount = getOneAccount
exports.deleteAccount = deleteAccount
exports.updateAccount = updateAccount
exports.deposit = deposit
exports.transaction = transaction