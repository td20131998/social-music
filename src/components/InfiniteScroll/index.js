import React, { Fragment } from 'react'
import debouce from 'debounce'

class InfiniteScroll extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            hasMore: true,
            isLoading: false,
            data: [],
            i: 0
        }

        window.onscroll = debouce(() => {
            const {
                loadMore,
                state: {
                    error, 
                    isLoading, 
                    hasMore
                }
            } = this

            if (error || isLoading || !hasMore) return

            if (window.innerHeight + window.scrollY === document.body.offsetHeight) {
                    console.log('loading more')
                    loadMore()
                }
        }, 1000)
    }

    loadMore = () => {
        this.setState({ isLoading: true }, () => {
            this.props.loadData()
            .then(results => {
                console.log(results)
                this.setState({
                    hasMore: (this.state.data.length < 100),
                    isLoading: false,
                    data: [
                        ...this.state.data,
                        ...results
                    ],
                    i: this.state.i + 1
                })
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                    isLoading: false
                })
            })
        })
    }

    componentDidMount() {
        this.loadMore()
    }

    render() {
        let { data } = this.state
        return (
            <div>
                {data.map(item => (
                    <Fragment key={this.state.i}>
                        <div style={{ height: '150px'}}>{item.author}</div>
                    </Fragment>
                ))}
            </div>
        )
    }
}

export default InfiniteScroll