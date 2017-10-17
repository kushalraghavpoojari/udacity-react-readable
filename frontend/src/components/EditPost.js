import React, { Component } from 'react';
import Back from 'react-icons/lib/ti/arrow-left-thick'
import {Link} from 'react-router-dom'
import {fetchPosts, editPost} from '../actions/Post'
import { connect } from 'react-redux';
import _ from 'lodash'
import Loading from './Loading'

class EditPost extends Component {

    componentWillMount() {
        this.props.fetchPosts('voteScore')
    }
    editPost = (e) => {
        e.preventDefault()
        const postId = this.props.post.id
        const title = e.target.title.value
        const body = e.target.body.value
    
        if (body === '' || title === '') {
          alert("Both fields are mandatory")
        } else {
          this.props.editPost(postId, {title: title, body: body},
            () => this.props.history.push('/'))
        }
    }

    render() {
        const { post } = this.props
            return (
                (!post) ? <Loading /> :
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
                        <form className='col-offset-md-2 col-md-8' onSubmit={this.editPost}>
                            <div className='form-group'>
                                <label htmlFor='postTitle'>Title</label>
                                <input type='text'  defaultValue={post.title} id='title' className='form-control' placeholder='Title' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='body'>Body</label>
                                <textarea type='text' defaultValue={post.body} id='body' className='form-control' placeholder='Content' />
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
            );
        }
        
    }


function mapStateToProps({ posts}, { match }) {
    return {
      post: _.find(posts, { id: match.params.id })
    }
  }

export default connect(mapStateToProps, { fetchPosts, editPost})(EditPost)