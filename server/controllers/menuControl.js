module.exports = {
    getMenus: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.get_menus()
        .then(menus => res.status(200).send(menus))
        .catch(err => res.status(500).send(err))
    },

    getMenu: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.get_menu_info()
        .then(menu => res.status(200).send(menu))
        .catch(err => res.status(500).send(err))
    }
}