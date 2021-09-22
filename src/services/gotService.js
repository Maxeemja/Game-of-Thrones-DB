
export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async () => {
        let randNum = Math.round(Math.random() * (63 - 1) + 1) ;
        const res = await this.getResource(`/characters?page=${randNum}&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    
    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllBooks = async () => {
        const res = await this.getResource(`/books?page=1&pageSize=10`);
        return res.map(this._transformBook);
    }
    
    getBook = async(id) =>  {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }
    
    getAllHouses = async () => {
        let randNum = Math.round(Math.random() * (44 - 1) + 1) ;
        const res = await this.getResource(`/houses?page=${randNum}&pageSize=10`);
        return res.map(this._transformHouse);
    }
    
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }

    isSet = (data) => {
        
        if (data) {
            return data
        } else {
            return 'no data :('
        }
    }

    _extractId = (item) => {
        return item.url.replace(/\D/g, '');
    }

    _transformCharacter = (char) => {
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died), 
            culture: this.isSet(char.culture)
        };
    }

    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: house.name,
            region:  this.isSet(house.region),
            words: house.words !== '' ? this.isSet(house.words) : 'no-data :(',
            titles: this.isSet(house.titles),
            overlord: this.isSet(house.overlord),
        };
    }
    
    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released.replace('T00:00:00', '')
        };
    }
}
