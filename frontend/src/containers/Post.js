import React, { Component } from 'react';
import Up from 'react-icons/lib/ti/thumbs-up'
import Down from 'react-icons/lib/ti/thumbs-down'
import Trash from 'react-icons/lib/ti/trash'
import CommentIcon from 'react-icons/lib/ti/message'
import EditIcon from 'react-icons/lib/ti/brush'
import {IconMaker} from '../utils/helpers'
import { connect } from 'react-redux';
import {convertTimestamp} from '../utils/helpers'
import {Link} from 'react-router-dom'
import {votePost, fetchPosts} from '../actions/Post'

class Post extends Component {
    
    render() { 
        const {post, deleteClickedPost, voteCurrentPost, fetchAllPosts, sort} = this.props
        
        return (
            <div>
                <div className='post'>
                    <div className='row post-title'>
                        <span className='col-md-2 circle-name'>{IconMaker(post.author)}</span>
                        <Link to={`/posts/${post.id}`}>
                            <h3 className='title-color col-md-7'>{post.title}</h3>
                        </Link>
                        <span className='col-md-1 circle voteScore'>{post.voteScore}</span>
                        <span className='col-offset-md-1 edit-icon' onClick={() => deleteClickedPost(post.id)}>
                            <Trash size={25}/>
                        </span>
                        <Link to={`/edit/${post.id}`}>
                            <span className='col-offset-md-1 edit-icon' title='Edit Post' >
                                <EditIcon size={25}/>
                            </span>
                        </Link>
                    </div>
                    <hr className='hr-line'/>
                    <div>
                        <span className='tag'>{post.author}</span>
                        <span className='tag'>{convertTimestamp(post.timestamp)}</span>
                        <span className='tag'>{post.category}</span>
                    </div>
                    <div className='post-body row'>
                        <div className='col-md-9'>{post.body}</div>
                        <div className='col-md-3'>
                            <span className='padding-icons'>
                                <Up size={30} className='cursor'onClick={() => {voteCurrentPost(post.id, "upVote")
                                 fetchAllPosts(sort)}}/>
                                <Down size={30} className='cursor' onClick={() => {voteCurrentPost(post.id, 'downVote') 
                                fetchAllPosts(sort)}}/>
                            </span>
                            <CommentIcon size={30} className='cursor' />
                            <span className='comment-circle'>{post.commentCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        posts: state.posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        voteCurrentPost: (id, option) => dispatch(votePost(id, option)),
        fetchAllPosts: (sort) => dispatch(fetchPosts(sort))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);