import React from 'react'
import Post from '../../../../components/Post'


class Playlist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playlist: []
        }
        this.loadPlaylist = this.loadPlaylist.bind(this)
    }
    componentDidMount() {
        this.loadPlaylist()
    }

    loadPlaylist() {
        this.setState({ playlist: posts })
    }

    render() {
        console.log('111: ', this.props)
        return (
            <React.Fragment>
                {this.state.playlist.map(post => (<Post key={post.id} info={post} />))}
            </React.Fragment>
        )
    }
}

const posts = [
    {
        id: 0,
        author: 'author 0',
        love: true,
        playlist: [],
        comments: []
    },
    {
        id: 1,
        author: 'author 1',
        love: false,
        playlist: [],
        comments: []
    },
    {
        id: 2,
        author: 'author 2',
        love: true,
        playlist: [],
        comments: []
    },
    {
        id: 3,
        author: 'author 3',
        love: false,
        playlist: [],
        comments: []
    }
]
export default Playlist