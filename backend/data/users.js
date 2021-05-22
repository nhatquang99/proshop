import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Quang',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Will Smith',
        email: 'smith@gmail.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Tom Hardy',
        email: 'tom@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users