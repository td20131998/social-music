import React from 'react'

class PopularList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <ul>
                    <li>Popular 1</li>
                    <li>Popular 2</li>
                    <li>Popular 3</li>
                </ul>
            </div>
        )
    }
}

export default PopularList