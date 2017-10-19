import React, { Component } from 'react'
import {IconMaker} from '../utils/helpers'
import Up from 'react-icons/lib/ti/thumbs-up'
import Down from 'react-icons/lib/ti/thumbs-down'
import Trash from 'react-icons/lib/ti/trash'
import {convertTimestamp} from '../utils/helpers'
import EditIcon from 'react-icons/lib/ti/brush'
import {Link} from 'react-router-dom'

class Comment extends Component {

    render() {
        const {comment, post} = this.props
        return (
            
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-2 circle-name'>{IconMaker(comment.author)}</div>
                    <div className='col-md-10 comment-padding'>
                        <div className='row comment-style'>
                            {comment.body}
                        </div>
                        <div className='row row-padding'>
                            <div className='col-md-9'>
                                <span className='tag'>{comment.author}</span>
                                <span className='tag'>{convertTimestamp(comment.timestamp)}</span>
                            </div>
                            <div className='col-md-3'>
                                <span className='padding-icons'>
                                    <Up size={30} className='cursor' onClick={() => this.props.onVoteScore(comment.id, "upVote")}/>
                                    <Down size={30} className='cursor' onClick={() => this.props.onVoteScore(comment.id, "downVote")}/>
                                    <Link to={`/${post.category}/posts/${post.id}/comment/edit/${comment.id}`}>
                                        <EditIcon size={25} className='cursor'/>
                                    </Link>
                                </span>
                                <Trash size={30} className='cursor' onClick={() => this.props.onDeleteComment(comment.id)}/>
                                <span className='col-md-1 circle voteScore margin-add'>{comment.voteScore}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='hr-line'/>
            </div>
        );
    }

}

export default Comment;