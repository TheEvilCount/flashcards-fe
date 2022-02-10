import React from 'react'

export default function SideNav(props)
{
    const handleCardsChange = (e) =>
    {
        console.log(e);
        //this.props.onSelectCards(e.target.textContent);
    }

    return (
        <div>
            <h3>{props.currentCards}</h3>
            <ul>
                {/*<li onClick={(e) => this.handleCardsChange(e)}>My cards</li>
                    <li onClick={this.handleCardsChange.bind(this)}>Top cards</li>*/
                }
                <li>My collections</li>
                <li>Top collections</li>
                <li>Explore collections</li>
                <li>blah blah</li>
            </ul>
        </div>
    )
}
