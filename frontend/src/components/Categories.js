import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchCategories} from '../actions/Category'
import CategoryIcon from 'react-icons/lib/ti/mortar-board'

class Categories extends Component {

    componentWillMount() {
        this.props.fetchCategories()
    }
    
    render() {
        const {categories, onCategorySelected} = this.props
        return (
            <div>
                <div className='category-title'>Categories</div>
                <hr className='hr-line'/>
                <div className='category-item' onClick={() => onCategorySelected('all')}>
                    <CategoryIcon/>All
                </div>
                {(categories.length > 0) && categories.map((c) => (
                    <div key={c.name} onClick={() => onCategorySelected(c.name)}>
                        <div className='category-item'>
                            <CategoryIcon/>{c.name}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        categories: state.categories
    }
}



export default connect(mapStateToProps,{fetchCategories})(Categories);