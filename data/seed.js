const faker = require("faker")
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('data/db.json')
const db = low(adapter)

let posts = []

for (let i = 0; i <= 30; i++) {
  posts.push({
    id: faker.random.uuid(),
    title: faker.lorem.words(),
    body: faker.lorem.text(),
  })
}

let users = [{
  id: faker.random.uuid(),
  fullName: 'Administrator',
  email: faker.internet.email(),
  username: 'admin',
  password: '1234'
}]

for (let i = 0; i <= 30; i++) {
  users.push({
    id: faker.random.uuid(),
    fullName: `${faker.name.firstName()} ${faker.name.lastName()}}`,
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password()
  })
}

db.defaults({ posts, users }).write()
