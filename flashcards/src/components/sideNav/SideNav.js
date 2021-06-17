import React, { Component } from 'react'

export default class SideNav extends Component
{
    handleCardsChange = (e) =>
    {
        console.log(e);
        //this.props.onSelectCards(e.target.textContent);
    }

    render()
    {
        return (
            <div>
                <h3>{this.props.currentCards}</h3>
                <ul>
                    {/*<li onClick={(e) => this.handleCardsChange(e)}>My cards</li>
                    <li onClick={this.handleCardsChange.bind(this)}>Top cards</li>*/
                    }
                    <li >My cards</li>
                    <li >Top cards</li>
                    <li >Explore cards</li>
                    <li >blah blah</li>
                </ul>
            </div>
        )
    }
}
