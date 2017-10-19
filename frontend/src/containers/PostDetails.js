import React, { Component } from 'react';
import Back from 'react-icons/lib/ti/arrow-left-thick'
import {Link} from 'react-router-dom'
import {fetchPosts, votePost, deletePost} from '../actions/Post'
import { connect } from 'react-redux';
import _ from 'lodash'
import {IconMaker} from '../utils/helpers'
import Up from 'react-icons/lib/ti/thumbs-up'
import Down from 'react-icons/lib/ti/thumbs-down'
import Trash from 'react-icons/lib/ti/trash'
import CommentIcon from 'react-icons/lib/ti/message'
import EditIcon from 'react-icons/lib/ti/brush'
import {convertTimestamp} from '../utils/helpers'
import CommentList from './CommentList'
import NotFound from '../components/NotFound'

class PostDetails extends Component {
    componentWillMount() {
        this.props.fetchPosts('voteScore')
    }

    render() {

        this.deleteClickedPost = (id) => {
            this.props.deletePost(id, this.props.history)
        }

        const {post, voteCurrentPost} = this.props
        return (
            (!post) ? <NotFound /> :
            <div className='container-fluid'>
                <div className='row title'>
                    <div className='col-md-1'>
                        <Link to='/'><Back size={30} className='back-icon'/></Link>
                    </div>
                    <div className='col-md-11'>
                        Readable
                    </div>
                </div>
                <div className='post'>
                    <div className='row post-title'>
                        <span className='col-md-2 circle-name'>{IconMaker(post.author)}</span>
                        <Link to={`/posts/${post.id}`}>
                            <h3 className='title-color col-md-7'>{post.title}</h3>
                        </Link>
                        <span className='col-md-1 circle voteScore'>{post.voteScore}</span>
                        <span className='col-offset-md-1 edit-icon' >
                            <Trash size={25} onClick={() => this.deleteClickedPost(post.id)}/>
                        </span>
                        <Link to={`/${post.category}/edit/${post.id}`}>
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
                                <Up size={30} className='cursor' onClick={() => voteCurrentPost(post.id, "upVote")}/>
                                <Down size={30} className='cursor' onClick={() => voteCurrentPost(post.id, "downVote")}/>
                            </span>
                            <CommentIcon size={30} className='cursor' />
                            <span className='comment-circle'>{post.commentCount}</span>
                        </div>
                    </div>
                </div>
                <CommentList post={post}/>
            </div>
        );
    }

}

function mapStateToProps({ posts}, { match }) {
    return {
      post: _.find(posts, { id: match.params.id })
    }
}

function mapDispatchToProps (dispatch) {
    return {
        voteCurrentPost: (id, option) => dispatch(votePost(id, option)),
        fetchPosts: () => dispatch(fetchPosts('voteScore')),
        deletePost: (id, history) => dispatch(deletePost(id, () => history.push('/')))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)