const db = require('../../../database/models');

const apiUsersController = {
    list: async (req, res) => {

        const users = await db.User.findAll();
        res.json({
            status: 200,
            count: users.length,
            users: users,
            
            // {[
            //     users.id,
            //     users.name,
            //     users.email
            //     detail: "http://localhost:3006/api/users/" + {users.id}
            // ]}
        });
    },

    detail: async (req, res) => {

        const user = await db.User.findByPk(req.params.id);
        res.json({
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone
        })
    }
}


module.exports = apiUsersController;