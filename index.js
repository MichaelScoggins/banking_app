class BankAccount {
  constructor(accountNumber, owner) {
    this.accountNumber = accountNumber
    this.owner = owner
    this.transactions = []
  }

  balance() {
    let total = 0
    let len = this.transactions.length
    for (let i = 0; i != len; i++) {
      total += this.transactions[i].amount
    }
    return total
  }

  deposit(amt) {
    if (amt > 0) {
      return this.transactions.push(new Transaction(amt, "__DEPOSIT__"))
    } else {
      return "Am I a joke to you?"
    }
  }

  charge(payee, amt) {
    if (this.balance() - amt < 0) {
      return "Why don't you get a job?"
    } else if (this.balance() - amt > 0) {
      return this.transactions.push(new Transaction(-amt, payee))
    }
  }
}

class Transaction {
  constructor(amount, payee) {
    this.date = new Date()
    this.amount = amount
    this.payee = payee
  }
}

// const getPrompt = () => {
//   printStacks()
//   rl.question("start stack: ", (startStack) => {
//     rl.question("end stack: ", (endStack) => {
//       towersOfHanoi(startStack, endStack)
//       getPrompt()
//     })
//   })
// }

module.exports = {
  BankAccount,
  Transaction,
}
