import React, { Component } from 'react'
import Back from 'react-icons/lib/ti/arrow-left-thick'
import {Link} from 'react-router-dom'
import Loading from './Loading'
import { connect } from 'react-redux';
import _ from 'lodash'
import {editComment, fetchComment} from '../actions/Comments'

class EditComment extends Component {
    state = {
        body: ''
    }
    componentWillMount() {
        this.props.fetchComment(this.props.match.params.id)
    }


    editComment = (e) => {
        e.preventDefault()
        console.log(this.inputName.value)
    }


    getValue = () => {
        this.setState({ body: this.props.comment.body });
        console.log('test')
    }
    componentDidMount() {
        console.log('inside')
        _.debounce(this.getValue, 500)
    }

    render() {
        console.log(this.props.comment)
        const {comment} = this.props
        const {body} = comment
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
                                <label htmlFor='body'>Comment</label>{comment.body}
                                <input type='text' defaultValue={comment.body}  ref={(input) => this.input = input} id='body' className='form-control' placeholder='Comment' />
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

function mapStateToProps(state , { match }) {
    console.log(state)
    //this.setState({body: state.comments.body})
    return {
      comment: state.comments
    }
  }

export default connect(mapStateToProps, {fetchComment, editComment})(EditComment)