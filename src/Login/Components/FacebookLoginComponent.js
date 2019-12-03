import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

export default class FacebookLoginComponent extends Component {
    state = {
        isLoggedIn: false,
        userId: '',
        displayName: '',
        email: '',
        avatar: '',
        token: '',
    };

    componentClicked = () => console.log("Clicked");
    responseFacebook = (res) => {
        console.log(res);
        const tokenBlob = new Blob([JSON.stringify({ access_token: res.accessToken }, null, 2)], { type: 'application/json' });
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        // fetch('http://localhost:8080/api/v1/auth/facebook', options).then(r => {
        //     const token = r.headers.get('x-auth-token');
        //     r.json().then(user => {
        //         if (token) {
        //             this.setState({isLoggedIn: true, userId: user.id, displayName: user.name, email: user.email, avatar: user.picture.data.url, token: token});
        //         }
        //     })
        // })
        if (options.body)
            this.setState({ isLoggedIn: true, userId: res.id, displayName: res.name, email: res.email, avatar: res.picture.data.url, token: res.accessToken });
    }

    render() {
        console.log(this.state);
        let fbLoginBtn = <FacebookLogin
            appId="1031064350575617"
            autoLoad={false}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
            // icon="fa-facebook"
            textButton="LOGIN WITH FACEBOOK"
            size="small" />
        let authenticatedContent = <div>
            <p>Authenticated</p>
            <div>
                {this.state.displayName}
            </div>
            <div>
                <img src={this.state.avatar}></img>
            </div>
        </div>
        let content;
        if (!!this.state.isLoggedIn) {
            content = authenticatedContent;
        }
        else {
            content = fbLoginBtn;
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}
