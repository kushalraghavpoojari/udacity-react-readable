import React, { Component } from 'react';
import Post from './Post'
import { connect } from 'react-redux';
import {fetchPosts, deletePost} from '../actions/Post'
import { Link }from 'react-router-dom'
import _ from 'lodash'

class AllPosts extends Component {

    state = {
        sort: 'voteScore'
    }
    
    componentWillMount() {
        this.props.fetchPosts('voteScore')
    }
    render() {
        
        this.onSortChange = (value) => {
            this.setState({sort: value})
            this.props.fetchPosts(value)
        }
        this.deleteClickedPost = (id) => {
            this.props.deletePost(id , () => {})
        }
        let {posts, category} = this.props
        return (
            <div>
                <div className='row'>
                    <div className='col-md-8 posts-text'>Posts</div>
                    <div className='col-md-2'>
                        <Link to='/newPost'><span className='btn btn-md btn-success'>Make a Post</span></Link>
                    </div>
                    <div className='col-md-2'>
                        <select className='sortOrder'onChange={(e) => this.onSortChange(e.target.value)}>
                            <option value="voteScore">Votes</option>
                            <option value="timestamp">Date</option>
                        </select>
                    </div>
                </div>
                <div className='all-posts'>
                    {posts.length > 0 && posts.filter((post) => (
                        category === 'all' ? post  : post.category === category  
                    )).map((post) => (
                        <Post key={post.id} post={post} deleteClickedPost={this.deleteClickedPost} sort={this.state.sort}/>
                    ))}
                </div>
            </div>
        );
    }

}


function mapStateToProps(state) {
    return {
        posts: _.filter(state.posts, post => !post.deleted)
    }
}

export default connect(mapStateToProps,{fetchPosts, deletePost})(AllPosts);