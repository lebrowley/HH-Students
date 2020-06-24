import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../redux/authReducer';
import MenuItems from './MenuItems';

class Menu extends Component {
    constructor() {
        super()

        this.state = {
            menu: [], //item_name, item_price, item_description
            title: ''  //menu_name
        }

        this.getMenu = this.getMenu.bind(this)
    }

    componentDidMount() {
        this.props.getUser()
        this.getMenu()
    }

    getMenu() {
        const { match: { params } } = this.props

        axios.get(`/api/menu/${params.menuId}`)
            .then(res => {
                this.setState({ menu: res.data, title: res.data[0].menu_name })
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div className='menu-component'>
                <h1>{this.state.title}</h1>
                <p>menu description</p>

                <div className="menu-items-container">
                    {this.state.menu.map(item => (
                        <MenuItems
                            key={item.item_id}
                            itemId={item.item_id}
                            itemName={item.item_name}
                            itemPrice={item.item_price}
                            itemDesc={item.item_description} />
                    ))}
                </div>

            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, {getUser})(Menu);
