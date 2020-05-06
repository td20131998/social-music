import React from 'react'

class LikedList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <li>Liked 1</li>
                <li>Liked 2</li>
                <li>Liked 3</li>
            </div>
        )
    }
}

export default LikedList