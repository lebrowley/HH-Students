import React, { Component } from 'react';
import axios from 'axios';
// import { connect } from 'react-redux';
// import { getUser } from '../redux/reducer';
import Items from './MenuItems';

class Menu extends Component {
    constructor() {
        super()

        this.state = {
            menu: [] //menu_name, item_name, item_price, item_description
        }

        this.getMenu = this.getMenu.bind(this)
    }

    componentDidMount() {
        // this.props.getUser()
        this.getMenu()
    }

    getMenu() {
        const {match: {params}} = this.props

        axios.get(`/api/menu/${params.menuId}`)
            .then(res => {
                this.setState({ menu: res.data })
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div className='menu-component'>
                <h2>menu name</h2>
                <h3>menu description</h3>
                {/* <h1>{this.state.menu.menu_name}</h1>
                <h4>{this.state.menu.menu_description}</h4> */}

                <div className="menu-items-container">
                    {this.state.menu.map(item => (
                        <Items
                            key={item.item_id}
                            itemName={item.item_name}
                            itemPrice={item.item_price}
                            itemDesc={item.item_description} />
                    ))}
                </div>

            </div>
        )
    }
}

// const mapStateToProps = reduxState => reduxState
// // const mapDispatchToProps = { getUser }
// export default connect(mapStateToProps)(Dashboard);

export default Menu;