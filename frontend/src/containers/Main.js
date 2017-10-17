import React, { Component } from 'react';
import Categories from '../components/Categories'
import AllPosts from './AllPosts'

class Main extends Component {
    state = {
        category: 'all'
    }
    render() {
        this.onCategorySelected = (categorySelected) => {
            this.setState({category: categorySelected})
        }
        return (
            <div className='container-fluid'>
                <div className='row title'>Readable</div>
                <div className='row full-height'>
                    <div className='col-md-2 categories'>
                        <Categories onCategorySelected={this.onCategorySelected}/>
                    </div>
                    <div className='col-md-8'>
                        <div className='row all-posts'>
                            <AllPosts category={this.state.category} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Main;