const assert = require("assert")
// const readline = require("linebyline")
// const rl = readline.createInterface({
// input: process.stdin,
// output: process.stdout,
// })
// let balance

class BankAccount {
  constructor(accountNumber, owner) {
    this.accountNumber = accountNumber
    this.owner = owner
    this.transactions = []
    // this.balance = 0
  }

  balance() {
    let total = 0
    let len = this.transactions.length
    for (let i = 0; i != len; i++) {
      total += this.transactions[i].amount
    }
    return total
  }

  deposit(payee, amt) {
    if (amt > 0) {
      this.transactions.push(new Transaction(amt, payee))
      // this.balance += amt
    } else {
      return "Am I a joke to you?"
    }
  }

  charge(payee, amt) {
    if (this.balance() - amt < 0) {
      return "Why don't you get a job?"
    } else if (this.balance() - amt > 0) {
      this.transactions.push(new Transaction(amt, payee))
      // this.balance -= amt
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

if (typeof describe === "function") {
  describe("BankAccount", () => {
    it("Should create Bank account: account number, name, transactions", () => {
      const bankAccount1 = new BankAccount("900-300-200", "Bob Dylan")
      assert.equal(bankAccount1.accountNumber, "900-300-200")
      assert.equal(bankAccount1.owner, "Bob Dylan")
      assert.equal(bankAccount1.transactions.length, 0)
    })
    it("Should deposit correctly", () => {
      const myAccount = new BankAccount("001002", "Michael")
      myAccount.deposit("Flounder", 1)
      assert.equal(myAccount.transactions[0].amount, 1)
      assert.equal(myAccount.transactions[0].payee, "Flounder")
      myAccount.deposit("Sebastian", 10)
      assert.equal(myAccount.transactions[1].amount, 10)
      assert.equal(myAccount.transactions[1].payee, "Sebastian")
    })
    it("Should deduct/charge correctly", () => {
      const newAccount = new BankAccount("001003", "Jack")
      newAccount.balance = 51
      newAccount.charge("Jack", 50)
      assert.equal(newAccount.transactions[0].amount, 50)
      assert.equal(newAccount.transactions[0].payee, "Jack")
      newAccount.balance = 101
      newAccount.charge("Beatrice", 100)
      assert.equal(newAccount.transactions[1].amount, 100)
      assert.equal(newAccount.transactions[1].payee, "Beatrice")
    })
    it("Should return correct balance after charge", () => {
      const newAccount = new BankAccount("001003", "Jack")
      newAccount.balance = 51
      newAccount.charge("Jack", 50)
      assert.equal(newAccount.balance, 1)
    })
    it("Should prevent overdraft", () => {
      const newAccount = new BankAccount("001003", "Jack")
      newAccount.balance = 49
      newAccount.charge("Jack", 50)
      assert.equal(newAccount.balance, 49)
    })
    it("Should not allow negative deposit", () => {
      const myAccount = new BankAccount("001002", "Michael")
      myAccount.balance = 20
      myAccount.deposit("Jordan", -1)
      assert.equal(myAccount.balance, 20)
    })
    it("Should return correct balance after multiple deposits", () => {
      const newAccount = new BankAccount("001003", "Jack")
      newAccount.balance = 200
      newAccount.charge("Jack", 50)
      newAccount.charge("Jack", 50)
      newAccount.charge("Jack", 50)
      assert.equal(newAccount.balance, 50)
    })
    it("Should return correct balance after multiple charges", () => {
      const newAccount = new BankAccount("001003", "Jack")
      newAccount.balance = 200
      newAccount.deposit("Jack", 50)
      newAccount.deposit("Jack", 50)
      newAccount.deposit("Jack", 50)
      assert.equal(newAccount.balance, 350)
    })
  })
}

describe("Transaction", function () {
  it("Should have date, payee, amount", function () {
    const transaction1 = new Transaction(50, "Dob Bylan")
    assert.equal(transaction1.amount, 50)
    assert.equal(transaction1.payee, "Dob Bylan")
    assert.notEqual(transaction1.date, null)
    assert.notEqual(transaction1.date, undefined)
  })
})

// 1. Should create Bank account: account number, name, transactions
// 2. Should deposit correctly
// 3. Should create Transaction: is date defined, payee, amount
// 4. Should deduct/charge correctly
// 5. Should return correct balance
// 6. Should prevent overdraft
// 7. Should not allow negative deposit
/////////////////////////////////////
// 8. Should track multiple deposits and return accurate balance
// 9. Also, 8. should track multiple charges and return accurate balance
