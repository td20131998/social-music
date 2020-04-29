import React from 'react'
import Post from '../../../../components/Post'

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

class PostList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            // index: 0
        }
        this.loadPostList = this.loadPostList.bind(this)
    }
    componentWillMount() {
        this.loadPostList()
    }

    componentDidMount() {
        this.loadPostList()
    }

    // componentDidUpdate() {
    //     this.loadPost()
    // }
    
    loadPostList() {
        console.log('PostList')
        this.setState({posts: posts})
    }

    render() {
        return (
            <React.Fragment>
                {this.state.posts.map(post => (<Post key={post.id} info={post} />))}
            </React.Fragment>
        )
    }
}

export default PostList