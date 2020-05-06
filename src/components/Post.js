import React, { Fragment } from 'react'
import { Card, Avatar, List } from 'antd'
import PropTypes from 'prop-types'
import { SaveOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons'
import Heart from './Heart'
import Comment from './Comment'
import styled from 'styled-components'
import { likePost, unlikePost } from '../services/posts/api'

const { Meta } = Card
const { Item } = List

const DivPost = styled.div`
    .ant-list-item {
        display: block;
    }
    .anticon-heart {
        display: inline !important;
    }
    .count-likes {
         padding-left: 10px;
    }
    .ant-card-body {
        padding: 5px;
    }
    .ant-card-extra {
        float: none;
        padding-top: 8px;
    }
    .ant-card-head-wrapper {
         display: block;
    }
`

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = { ...this.props.info }
        this.toggleLove = this.toggleLove.bind(this)
    }

    toggleLove(isLike) {
        let { _id } = this.state
        if (isLike) {
            unlikePost(_id).then(like => like._id ? this.setState({
                isLike: !isLike,
                likes: this.state.likes.filter(item => item._id !== like._id)
            }) : null)
        } else {
            likePost(_id).then(like => like._id ? this.setState({ 
                isLike: !isLike,
                likes: [...this.state.likes, like]
            }) : null)
        }
    }

    render() {
        let info = this.state
        return (
            <DivPost>
                <Card
                    style={{ width: '100%' }}
                    hoverable={true}
                    loading={false}
                    actions={[
                        <>
                            <Heart 
                                love={info.isLike} 
                                toggleLove={() => this.toggleLove(info.isLike)}
                                style={{ display: 'inline' }}
                            />
                            <span className='count-likes' onClick={() => console.log('aaa')}>{info.likes.length}</span>
                        </>,
                        <SaveOutlined key="save" />,
                        <span onCLick={() => console.log('comment')} ><CommentOutlined key="comment" /></span>,
                        // <ShareAltOutlined key="share" />
                    ]}
                    extra={
                        <>
                            <div style={{ display: 'inline-block', float: 'left', top: '5px' }}>
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                <span>{info.user.username}</span>
                            </div>
                            <div style={{ display: 'inline-block', float: 'right' }}>...</div>
                        </>
                    }
                >
                    <div style={{display: 'inline-block', width: '100%'}}>
                        <List>
                            <Item>
                                <div>{info.song.name}</div>
                                <audio controls>
                                    {/* this is source audio */}
                                    <source src="https://cdns-preview-1.dzcdn.net/stream/c-13039fed16a173733f227b0bec631034-10.mp3"/>
                                </audio>
                            </Item>
                        </List>
                    </div>
                </Card>
                {/* <br /> */}
                <div style={{ background: 'inhert' }}>
                    <Comment info={info}>
                        <Comment info={info}>
                        </Comment>
                    </Comment>
                </div>
            </DivPost>
        )
    }
}

Post.propTypes = {
    info: PropTypes.object.isRequired
}

export default Post