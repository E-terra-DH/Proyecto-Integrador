const db = require('../../../database/models');

const apiUsersController = {
    list: async (req, res) => {

        const users = await db.User.findAll({
            attributes: [
                'id', 'name', 'email']
        });
        // detail: "http://localhost:3006/api/users/" + {users.id}

        res.json({
            status: 200,
            count: users.length,
            users: users.map(user => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    detail: "http://localhost:3006/api/users/" + user.id
                }
            })
        });
    },

    detail: async (req, res) => {

        const user = await db.User.findByPk(req.params.id);
        res.json({
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
            avatar: "http://localhost:3006/Images/" + user.avatar

        })

    }
}


module.exports = apiUsersController;