// import modules
const assert = require("assert")

// import classes
const { Transaction, BankAccount } = require("../index.js")
// declare and define variables

// const readline = require("linebyline")
// const rl = readline.createInterface({
// input: process.stdin,
// output: process.stdout,
// })

// 1. Should create Bank account: account number, name, transactions
// 2. Should deposit correctly
// 3. Should create Transaction: is date defined, payee, amount
// 4. Should deduct/charge correctly
// 5. Should return correct balance
// 6. Should prevent overdraft
// 7. Should not allow negative deposit
// 8. Should track multiple deposits and return accurate balance
// 9. Also, 8. should track multiple charges and return accurate balance

if (typeof describe === "function") {
  describe("BankAccount", () => {
    it("Should create Bank account: account number, name, transactions", () => {
      const michael = new BankAccount("000001", "M. Scoggins")
      assert.equal(michael.accountNumber, "000001")
      assert.equal(michael.owner, "M. Scoggins")
      assert.equal(michael.transactions.length, 0)
    })
    it("Should deposit correctly", () => {
      const michael = new BankAccount("000001", "M. Scoggins")
      michael.deposit(100)
      assert.equal(michael.transactions[0].amount, 100)
      michael.deposit(50)
      assert.equal(michael.transactions[1].amount, 50)
    })
    it("Should deduct/charge correctly", () => {
      const michael = new BankAccount("000001", "M. Scoggins")
      michael.deposit(100)
      michael.charge("Jimmy Johns", 11)
      assert.equal(michael.transactions[0].amount, 100)
      assert.equal(michael.transactions[1].amount, -11)
      assert.equal(michael.transactions[1].payee, "Jimmy Johns")
      michael.charge("PopCopy", 8)
      assert.equal(michael.transactions[2].amount, -8)
      assert.equal(michael.transactions[2].payee, "PopCopy")
    })
    it("Should return correct balance after charge", () => {
      const steveBalmer = new BankAccount("001003", "S. Balmer")
      steveBalmer.deposit(3000000)
      steveBalmer.charge("Fine Autos, Inc.", 2500000)
      assert.equal(steveBalmer.balance(), 500000)
      steveBalmer.charge("Mcdonalds", 5)
      assert.equal(steveBalmer.balance(), 499995)
    })
    it("Should prevent overdraft", () => {
      const newAccount = new BankAccount("001003", "Jack")
      newAccount.deposit(50)
      newAccount.charge("Wal-Mart", 100)
      assert.equal(
        newAccount.charge("Wal-Mart", 100),
        "Why don't you get a job?"
      )
      assert.equal(newAccount.balance(), 50)
    })
    it("Should not allow negative deposit", () => {
      const crystalAccount = new BankAccount("001002", "Crystal")
      crystalAccount.deposit(100)
      crystalAccount.deposit(-1)
      assert.equal(crystalAccount.deposit(-1), "Am I a joke to you?")
      assert.equal(crystalAccount.balance(), 100)
    })
    it("Should return correct balance after multiple deposits", () => {
      const newAccount = new BankAccount("001003", "Jack")
      newAccount.deposit(200)
      assert.equal(newAccount.balance(), 200)
      newAccount.deposit(40)
      newAccount.deposit(50)
      newAccount.deposit(50)
      assert.equal(newAccount.balance(), 340)
    })
    it("Should return correct balance after multiple charges", () => {
      const michael = new BankAccount("000001", "M. Scoggins")
      michael.deposit(900)
      michael.charge("Vandelay Industries", 150)
      michael.charge("Crutchfield Audio", 450)
      michael.charge("24hr Fitness", 30)
      assert.equal(michael.balance(), 270)
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
