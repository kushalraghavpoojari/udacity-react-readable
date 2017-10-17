import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Back from 'react-icons/lib/ti/arrow-left-thick'
import {createComment} from '../actions/Comments'
import { connect } from 'react-redux';

class CreateComment extends Component {

    newComment = (e) => {
        e.preventDefault()
        const parentId = this.props.match.params.id
        const author = e.target.author.value
        const body = e.target.body.value
    
        if (body === '' || author === '') {
          alert("Both fields are mandatory")
        } else {
          this.props.createComment({author, body, parentId},
            () => this.props.history.push(`/posts/${parentId}`))
        }
    }

    render() {
        return (
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
                    <form className='col-offset-md-2 col-md-8' onSubmit={this.newComment}>
                        <div className='form-group'>
                            <label htmlFor='author'>Author</label>
                            <input type='text'  id='author' className='form-control' placeholder='Author' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='body'>Comment</label>
                            <textarea type='text' id='body' className='form-control' placeholder='Comment' />
                        </div>
                        <div className='row'>
                            <button type='submit' className='btn btn-md btn-primary margin-btn'>Submit</button>
                            <Link to={`/posts/${this.props.match.params.id}`}>
                                <span className='btn btn-md btn-default margin-btn'>Cancel</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state, { match }) {
    return {
      comments: state.comments
    }
  }

export default connect(mapStateToProps, { createComment})(CreateComment)