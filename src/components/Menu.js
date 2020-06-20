import React, { Component } from 'react';
import axios from 'axios';
// import { connect } from 'react-redux';
// import { getUser } from '../redux/reducer';

class Menu extends Component {
    constructor() {
        super()

        this.state = {
            menu: []
        }

        this.getMenu = this.getMenu.bind(this)
    }

    componentDidMount() {
        // this.props.getUser()
        this.getMenu()
    }

    getMenu() {
        axios.get('/api/menu')
            .then(res => {
                this.setState({ menu: res.data })
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div className='menu-component'>
                <h1>Menu component</h1>

                {/* <h1>Feeling Hungry Hungry?</h1>
                <h4>Check out our current food truck options</h4>

                <div className="food-trucks-container">
                    {this.state.menus.map(menu => (
                        <Bubble
                            key={menu.menu_id}
                            menuId={menu.menu_id}
                            menuName={menu.menu_name} />
                    ))}
                </div> */}

            </div>
        )
    }
}

// const mapStateToProps = reduxState => reduxState
// // const mapDispatchToProps = { getUser }
// export default connect(mapStateToProps)(Dashboard);

export default Menu;