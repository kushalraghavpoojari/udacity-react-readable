import React, { Component } from 'react';
import Comment from '../components/Comment'
import CommentIcon from 'react-icons/lib/ti/message'
import {fetchComments, deleteComment, voteComment} from '../actions/Comments'
import {fetchPosts} from '../actions/Post'
import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'

class CommentList extends Component {
    componentWillMount() {
        this.props.fetchComments(this.props.post.id, 'voteScore')
    }

    onDeleteComment = (id) => {
        this.props.deleteComment(id, () => {
            this.props.fetchComments(this.props.post.id, 'voteScore')
            this.props.fetchPosts(this.props.post.id, 'voteScore')
        })
    }

    onVoteScore = (id, vote) => {
        this.props.voteComment(id, vote, () => {
            this.props.fetchComments(this.props.post.id, 'voteScore')
        })
    }

    render() {
        const {comments, post} = this.props
        return (
            <div>
                <div className='container-fluid'>
                    <div className='row'>
                        <span className='comment-heading'>Comments</span>
                        <div className='new-comment'>
                            <Link to={`/posts/${post.id}/comment/new`}>
                                <CommentIcon size={40}/>
                            </Link>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='comment'>
                            {
                                (comments.length === 0) ? 
                                    <div>
                                        <h4>No comments</h4>
                                    </div> :
                                comments.length > 0 && comments.filter((comment) => (
                                    comment.deleted !== true
                                )).map((comment) => (
                                    <Comment key={comment.id} comment={comment} onDeleteComment={this.onDeleteComment} onVoteScore={this.onVoteScore} post={post}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        comments: state.comments
    }
}

export default connect(mapStateToProps, { fetchComments, deleteComment, fetchPosts, voteComment})(withRouter(CommentList))