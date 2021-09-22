import React, {Component} from 'react';
import RowBlock from '../rowBlock';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../error';
import gotService from '../../services/gotService';




export default class HousesPage extends Component {

    gotService = new gotService();

    state = {
        selectedHouse: null,
        error: false
    }

    componentDidCatch(){
        this.setState({error: true});
    }


    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
    }

    render(){
        if(this.state.error){
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected} 
                getData={this.gotService.getAllHouses}
                renderItem={(item) => `${item.name}`}/>
        )
        
        const itemDetails = (
            <ItemDetails itemId={this.state.selectedHouse} 
                getInfo={this.gotService.getHouse}>
                <Field field='region' label='Region' />
                <Field field='words' label='Words' />
                <Field field='titles' label='Titles' />
                <Field field='overlord' label='Overlord' />
            </ItemDetails>
        )


        return(
            <RowBlock left={itemList} right={itemDetails}/> 
        )
    }
}