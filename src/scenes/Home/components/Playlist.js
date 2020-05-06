import React from 'react'
import Post from '../../../components/Post'
import { getAllPlaylist } from '../../../services/playlist/api'

class Playlist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playlists: []
        }
        this.loadPlaylist = this.loadPlaylist.bind(this)
    }
    componentDidMount() {
        getAllPlaylist().then(playlists => {
            this.setState({ playlists: [...playlists] })
        })
    }

    loadPlaylist() {
        this.setState({ playlist: posts })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.playlists.map(playlist => (
                    <li>{playlist.name}</li>
                ))}
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