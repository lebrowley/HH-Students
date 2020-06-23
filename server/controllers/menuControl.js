module.exports = {
    getMenus: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.get_menus()
        .then(menus => res.status(200).send(menus))
        .catch(err => res.status(500).send(err))
    },

    getMenu: (req, res) => {
        const dbInstance = req.app.get('db')
        const {menuId} = req.params

        dbInstance.get_menu_info([menuId])
        .then(menu => res.status(200).send(menu))
        .catch(err => res.status(500).send(err))
    }, 

    getMenuItems: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.get_menu_items()
        .then(items => res.status(200).send(items))
        .catch(err => res.status(500).send(err))
    }
}