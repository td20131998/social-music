import React from 'react'
import { Card, Avatar, List } from 'antd'
import { SaveOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons'
import Heart from '../Heart'
import Comment from '../Comment'
import request from '../../services/api/request'

const { Meta } = Card
const { Item } = List

let info = {
    author: 'Tungduong',
    avatarSrc: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    comment: 'Duong dep trai'
}

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    toggleLove() {
        // request('https://5e88875d19f5190016fed58c.mockapi.io/LoadingPost').then(res => {
        //     console.log(res)
        // })
    }

    render() {
        let { info } =  this.props
        return (
            <div>
                <Card
                    style={{ width: '100%' }}
                    hoverable={true}
                    loading={false}
                    actions={[
                        <Heart 
                            love={info.love} 
                            onClick={this.toggleLove()}
                        />,
                        <SaveOutlined key="save" />,
                        // <CommentOutlined key="comment" />,
                        // <ShareAltOutlined key="share" />
                    ]}
                    // extra={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                >
                    {/* <div> */}
                        <div style={{display: 'inline-block', width: '10%'}}>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div>{info.author}</div>
                        </div>
                        <div style={{display: 'inline-block', width: '90%'}}>
                            <List>
                                <Item>
                                    <audio controls>
                                       <source src="https://cdns-preview-1.dzcdn.net/stream/c-13039fed16a173733f227b0bec631034-10.mp3"/>
                                    </audio>
                                </Item>
                            </List>
                        </div>
                    {/* </div> */}
                </Card>
                <br />
                {/* <div> */}
                    {/* <Comment info={info}>
                        <Comment info={info}>
                        </Comment>
                    </Comment> */}
                {/* </div> */}
            </div>
        )
    }
}

export default Post