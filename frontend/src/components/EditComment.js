import React, { Component } from 'react'
import Back from 'react-icons/lib/ti/arrow-left-thick'
import {Link} from 'react-router-dom'
import Loading from './Loading'
import { connect } from 'react-redux';
import {withRouter} from 'react-router'
import { fetchComment, updateComment} from '../actions/Comments'

class EditComment extends Component {

    state = {
        body: ''
    }
    
    componentWillMount() {
        this.props.fetchComment(this.props.match.params.id)
    }


    editComment = (e) => {
        e.preventDefault()
        const commentId = this.props.comment.id
        const postId = this.props.comment.parentId
        const timestamp = Date.now()
        const body = e.target.body.value
    
        if (body === "") {
          alert('Comment cannot be empty')
        } else {
          this.props.updateComment(commentId, postId, timestamp, body, this.props.history, this.props.match.params.category)
        }
    }

    componentDidUpdate() {
        if(!this.state.body) {
            this.setState({body: this.props.comment.body})
        }
    }

    handleChange = (event) => {
        this.setState({body: event.target.value})
    }


    render() {
        const {comment} = this.props
        return (
            (!comment) ? <Loading /> :
            <div>
                <div className='container-fluid'>
                    <div className='row title'>
                        <div className='col-md-1'>
                            <Link to='/'><Back size={30} className='back-icon'/></Link>
                        </div>
                        <div className='col-md-11'>
                            Readable
                        </div>
                    </div>
                    <div className='row post-form'>
                        <form className='col-offset-md-2 col-md-8' onSubmit={this.editComment}>
                            <div className='form-group'>
                                <label htmlFor='author'>Author</label>
                                <h4>{comment.author}</h4>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='body'>Comment</label>
                                <input type='text' value={this.state.body} onChange={(e)=> this.handleChange(e)} id='body' className='form-control' placeholder='Comment' />
                            </div>
                            <div className='row'>
                                <button type='submit' className='btn btn-md btn-primary margin-btn'>Update</button>
                                <Link to='/'>
                                    <span className='btn btn-md btn-default margin-btn'>Cancel</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state, {match} ) {
    return {
      comment: state.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateComment: (commentId, postId, timestamp, body, history, category) => dispatch(updateComment(commentId, postId, timestamp, body,
            () => history.push(`/${category}/posts/${postId}`))),
        fetchComment: (id) => dispatch(fetchComment(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditComment))