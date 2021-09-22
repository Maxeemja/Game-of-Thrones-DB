import React, {Component} from 'react';
import gotService from '../../services/gotService';
import ItemDetails, {Field} from '../itemDetails';

export default class BooksItem extends Component {
    gotService = new gotService();


    render(){
        return(
            <ItemDetails 
                itemId={this.props.bookId} 
                getInfo={this.gotService.getBook}>
                <Field field='numberOfPages' label='Number of pages' />
                <Field field='released' label='Released' />
                <Field field='publisher' label='Publisher' />
            </ItemDetails>
        )
    }

}