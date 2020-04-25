import React from 'react'
import { Layout, Avatar, Col, Row } from 'antd'
import './styles.css'
import Post from '../../components/Post'
import request from '../../services/api/request'
import InfiniteScroll from '../../components/InfiniteScroll'
import LeftSider from './components/LeftSider'
import RightSider from './components/RightSider'

const { Sider, Content } = Layout

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

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: posts,
            index: 0
        }
        this.loadPost = this.loadPost.bind(this)
    }

    componentDidMount() {
        // request('https://5e88875d19f5190016fed58c.mockapi.io/LoadingPost')
        // .then(res => {
        //     this.setState({ posts: [...this.state.posts, ...res]})
        // })
        
        this.loadPost()
    }

    loadPost() {
        // this.setState(
        //     { 
        //         posts: [
        //             ...this.state.posts, 
        //             {
        //                 id: this.state.index++,
        //                 author: `author ${this.state.index ++}`,
        //                 love: true,
        //             }
        //         ],
        //         index: this.state.index++
        // })
        return new Promise((resolve, reject) => resolve([...posts, ...posts]))
    }

    render() {
        return (
            <div className="home">
                <Row>
                    <Col xs={0} md={4} lg={4} xl={5} className="home-left">
                        <LeftSider />
                    </Col>

                    <Col xs={24} md={15} lg={15} xl={14} className="home-content">
                        {/* <InfiniteScroll loadData={this.loadPost} component={Post} /> */}
                        {this.state.posts.map(post => (<Post key={post.id} info={post} />))}
                    </Col>
                    
                    <Col xs={0} md={5} lg={5} xl={5} className="home-right">
                        <RightSider />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home