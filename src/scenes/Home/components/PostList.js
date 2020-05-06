import React from 'react'
import Post from '../../../components/Post'
import { getListPost } from '../../../services/posts/api'

class PostList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            // index: 0
        }
    }
    
    componentDidMount() {
        getListPost(1).then(posts => this.setState({ posts: [...posts]}))
    }

    render() {
        return (
            <React.Fragment>
                {this.state.posts.map(post => (<Post key={post._id} info={post} />))}
            </React.Fragment>
        )
    }
}

export default PostList