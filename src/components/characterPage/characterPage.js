import React, {Component} from 'react';
import RowBlock from '../rowBlock';
import ItemList from '../itemList';
import PersonDetails from '../personDetails';
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


    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render(){
        if(this.state.error){
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList onCharSelected={this.onCharSelected} 
                    getData={this.gotService.getAllCharacters}
                    renderItem={(item) => `${item.name} (${item.gender})`}/>
        )
        
        const personDetails = (
            <PersonDetails charId={this.state.selectedChar} />
        )


        return(
            <RowBlock left={itemList} right={personDetails}/> 
        )
    }
}