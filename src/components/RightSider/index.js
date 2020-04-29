import React from 'react'
import { List, Avatar } from 'antd'
import './styles.css'
const { Item } = List
const { Meta } = Item

let listUser = [
    {
        fullname: 'Quang Linh',
        id: 'qling',
        imgSrc: 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/22852997_833055203566631_7078745034003050229_n.jpg?_nc_cat=106&_nc_sid=09cbfe&_nc_ohc=0turUG7vTdcAX-5hp4_&_nc_ht=scontent.fsgn2-3.fna&oh=dd083f4d92e14d37904c925479abcd88&oe=5EC84796'
    },
    {
        fullname: 'Tung Duong',
        id: 'td20131998',
        imgSrc: 'https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/59477702_1187895581372193_6129036636266168320_o.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=UbaRZ-PuDeoAX-HoEGM&_nc_ht=scontent.fsgn2-4.fna&oh=a3430a2a6f2e943dfa3a1e030044fa4f&oe=5EC9E9E8'
    }
]
class RightSider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listUser: listUser
        }
    }

    render() {
        return (
            <List 
                bordered={true}
                header="Suggetions for you"
                className="right-sider"
                itemLayout="horizontal"
                dataSource={this.state.listUser}
                renderItem={user => (
                    <Item>
                        <Meta 
                            avatar={<Avatar src={user.imgSrc} size="default" />}
                            title={<a href="http://localhost:3000">{user.fullname}</a>}
                            description={`@${user.id}`}
                        />
                    </Item>
                )}
            />
        )
    }
}

export default RightSider