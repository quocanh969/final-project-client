import React, { Component } from 'react'

import { us } from '../../Services/UserService'

export default class RecoverPassword extends Component {
    
    constructor(props) {
        super(props);
        this.state = ({ 
            isSuccess: false,
            newPassword: '' 
        });
    }

    componentWillMount() {
        let token = this.props.match.params.token;
        let id = this.props.match.params.id;

        us.recoverPassword(id, token)
        .then( data => 
            {
                this.setState({
                    isSuccess: true,
                    newPassword: data.info.data
                })
            }
        )
        .catch( err => {
            this.setState({
                isSuccess: false,
                newPassword: '',
            })
        })
    }

    generateNotice()
    {
        if(this.state.isSuccess)
        {
            return(
                <div className="p-5">
                    <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-2">Your password has recovered</h1>
                        <p className="mb-4">Here is your new password. Keep it carefully.</p>
                    </div>
                    <hr></hr>
                    <h1 className="font-weight-bold text-center">{this.state.newPassword}</h1>
                    <hr></hr>
                </div>
            );
        }
        else
        {
            return(
                <div className="p-5">
                    <div className="text-center">There was an error in connect to server, please retry later at</div>
                    <h3 className="text-primary">UBER TUTOR</h3>
                    <hr></hr>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="container mt-5">
                {/* Outer Row */}
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                        {/* Nested Row within Card Body */}
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-block bg-forgot-password-image" />
                            <div className="col-lg-6">
                                {this.generateNotice()}
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
