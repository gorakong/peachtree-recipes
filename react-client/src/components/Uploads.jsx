import React, { Component } from 'react';
import RecipeList from './RecipeList.jsx';
import axios from 'axios';
import multer from 'multer';
import { Button } from 'semantic-ui-react';

class Uploads extends Component {

	constructor(props) {
        super(props);

        this.state = {
            uploading: false,
            images: []
        }

        this.getUploadedRecipes = this.getUploadedRecipes.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.uploadToServer = this.uploadToServer.bind(this);
    }

    componentDidMount() {
        this.getUploadedRecipes(this.props.userId);
    }

    handleUpload(e) {
        const files = Array.from(e.target.files);
        
        console.log('files', files);
        this.setState = ({
            images: files
        });
    }

    uploadToServer(userId) {
        axios.post(`/${userId}/uploads`, this.state.images)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    uploading: true
                })
            })
            .catch((err) => {
                console.log('Error uploading')
            })
    }

    getUploadedRecipes(userId) {
        axios.get(`/${userId}/uploads`)
        .then((response) => {
            console.log(response.data);
            this.setState({
                images: response.data
            })
        })
        .catch((err) => {
            console.log('Error getting uploads');
        })
    }

    render() {
        const { isLoggedIn, userId } = this.props;
        const { images } = this.state;

        if (isLoggedIn) {
            return (
                <div>
                    <label htmlFor='single'>
                        Upload recipe image
                    </label>
                    <Button onClick={ (userId) => this.uploadToServer(userId) }>Upload</Button>
                    <input type='file' onChange={ (e) => this.handleUpload(e) }/>
                    <input type='text' placeholder='Name'></input>
                    <div>
                        { <RecipeList recipeEntries={ images }/> }
                    </div>
                </div>
            )
        }
    }

}

export default Uploads;