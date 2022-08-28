import * as React from "react";
// import Box from "@mui/material/Box"; 布局
// import FormControl from "@mui/material/FormControl";
// import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
// import InputLabel from "@mui/material/InputLabel";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import Grid from "@material-ui/core/Grid";布局
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from "axios";

class Login extends React.Component {
    state = {
        formData: {
            userUsername: '',
            userPassword: '',
        },
        submitted: false,
    }

    handleChange = event => {
        // //获取当前dom对象
        // const target = e.target;
        // //获取当前dom对象的name属性
        // const name = target.name;
        // //获取当前dom对象的value属性
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        // //更新状态
        // this.setState({
        //     [name]: value
        // })
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    };

    handleClick = async(event) => {
        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });

        // console.log(this.state);

        event.preventDefault();
        const user = this.state.formData;

        // make axios post request
        const response = await axios({
            method: "post",
            url: "/5620/users",
            data: user
        }).catch(err => {
            console.log(err);
        })
        //打印响应数据
        console.log(response.data);

    };

    render() {

        const { formData, submitted } = this.state;
        return (
            <div>


                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleClick}
                >

                    <TextValidator
                        name="userUsername"

                        id="component-outlined"
                        value={formData.userUsername}
                        onChange={this.handleChange}
                        label="username"
                        color="secondary"
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <br />


                    <TextValidator
                        id="component-outlined"
                        name="userPassword"
                        value={formData.userPassword}
                        onChange={this.handleChange}
                        label="pasword"
                        color="secondary"
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <br />
                    {/* 对齐标签 */}

                    <Button
                        disabled={submitted}
                        color="secondary"
                        type="submit"
                        variant="outlined"
                        sx={{
                            width: "120px"
                        }}
                    >

                        {
                            (submitted && 'Ok!')
                            || (!submitted && 'Submit')
                        }

                    </Button>

                </ValidatorForm>

            </div>
        );
    }
};

export default Login;