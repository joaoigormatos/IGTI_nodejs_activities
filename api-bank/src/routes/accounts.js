const express = require('express')

const router = express.Router()

const { addAccount, getAccounts, getOneAccount, deleteAccount, updateAccount, deposit, transaction } = require('../controller/accountController')

router.post('/account', addAccount)
router.get('/account', getAccounts)
router.get('/account/:id', getOneAccount)
router.delete('/account/:id', deleteAccount)
router.put('/account/', updateAccount)
router.post('/account/deposit', deposit)
router.post('/account/transaction', transaction)

module.exports = router