import React from 'react'
import { Card, Avatar } from 'antd'
import { SaveOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons'
import Heart from '../Heart'
import Comment from '../Comment'
import request from '../../services/api/request'

const { Meta } = Card

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
                    {/* <Meta
                        style={{ height: '100px', textAlign: 'left' }}
                        // avatar={}
                        alt={info.author}
                        title={info.author}
                        description={[
                            <Avatar style={{ display: 'block' }} />,
                            <Avatar style={{ display: 'block' }} />
                        ]}
                        
                    /> */}
                    <div>
                        <div style={{display: 'inline-block', width: '10%'}}>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div>{info.author}</div>
                        </div>
                        <div style={{display: 'inline-block', width: '90%'}}>
                            List music
                        </div>
                    </div>
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