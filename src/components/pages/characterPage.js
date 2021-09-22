import React, {Component} from 'react';
import RowBlock from '../rowBlock';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../error';
import gotService from '../../services/gotService';




export default class CharacterPage extends Component {

    gotService = new gotService();

    state = {
        selectedChar: null,
        error: false
    }

    componentDidCatch(){
        this.setState({error: true});
    }


    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render(){
        if(this.state.error){
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList onItemSelected={this.onItemSelected} 
                getData={this.gotService.getAllCharacters}
                renderItem={(item) => `${item.name} (${item.gender})`}/>
        )
        
        const personDetails = (
            <ItemDetails itemId={this.state.selectedChar} 
                getInfo={this.gotService.getCharacter}>
                <Field field='gender' label='Gender' />
                <Field field='born' label='Born' />
                <Field field='died' label='Died' />
                <Field field='culture' label='Culture' />
            </ItemDetails>
        )


        return(
            <RowBlock left={itemList} right={personDetails}/> 
        )
    }
}