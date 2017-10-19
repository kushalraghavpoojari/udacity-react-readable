import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
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
                <Link to='/' onClick={() => onCategorySelected('all')}>
                    <div className='category-item' >
                        <CategoryIcon/>All
                    </div>
                </Link>
                {(categories.length > 0) && categories.map((c) => (
                    <Link to={`/${c.name}`}  key={c.name} onClick={() => onCategorySelected(c.name)}>
                        <div  >
                            
                                <div className='category-item'>
                                    <CategoryIcon/>{c.name}
                                </div>
                            
                        </div>
                    </Link>
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