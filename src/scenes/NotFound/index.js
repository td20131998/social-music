import React from 'react'
import { Result, Button } from 'antd'

const NotFound = function({ history }) {
    function backHome() {
        history.push("/")
    }
    return (
        <Result 
            status="404"
            title="404"
            subTitle="Xin lỗi, trang này không tồn tại."
            extra={<Button type="primary" onClick={backHome}>Về trang chủ</Button>}
        />
    )
}

export default NotFound