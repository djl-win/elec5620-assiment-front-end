import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import axios from "axios";
import cardPic from "../../assets/RegisterCard.jpg";

class Register extends React.Component {

  state = {

    //申请钱包显示
    showRegisterPage: 'block',

    //提示卡片显示
    showRegisterCard: 'none',

    //私钥信息
    priKey: ''

  }

  //创建钱包，之后不更新localstorage的问题没解决
  handleCreateWallet = async (event) => {

    //组织默认事件
    event.preventDefault();

    // make axios post request
    const response = await axios({
      method: "put",
      url: "/5620/wallets/create",
    }).catch(err => {
      alert(err);
    })

    // 判断是否新建成功
    if (response.data.code === 30011) {

      //更新成功后，用户便有了钱包，设置路由到/profile/wallet
      localStorage.setItem('walletsJudge', '/profile/wallet');

      console.log(response.data.msg);

      //点击创建后反馈给用户他的私钥信息，把卡片设置为显示,把页面信息设置为不显示，内容设置为私钥信息
      this.setState({
        showRegisterPage: 'none',
        showRegisterCard: 'block',
        priKey: response.data.data
      })

    } else if(response.data.code === 30010){

      alert(response.data.msg);

    } else{

      alert("Something Wrong")

    }
  }

  handleUnderstand = ()=> {
    this.props.history.push(localStorage.getItem('walletsJudge'));
  }

  render() {
    return (
      <div className="RegisterPage" >

        <div style={{ display: this.state.showRegisterPage }} className="RegisterText">
          <h1>
            Create you account firstly
            <span></span>
          </h1>
        </div>


        <div style={{ display: this.state.showRegisterPage }} className="RegisterRemind">
          <p>You need to create a wallet first, and to transact with others</p>
        </div>

        <div style={{ display: this.state.showRegisterPage }} className="RegisterButton">
          <Button onClick={this.handleCreateWallet} variant="contained" color="success" sx={{ fontStyle: 'italic', fontSize: 25, textTransform: 'none' }}> Create </Button>
        </div>

        <div className="RegisterCard">
          <Card sx={{ maxWidth: 450, display: this.state.showRegisterCard }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="270"
              image={cardPic}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Please keep your private key, for the security of your account, we will not record this to the database, it is the only proof of your transactions with others.
              </Typography>
              <Typography variant="body3" color="text.secondary">
                {this.state.priKey}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="large" onClick={this.handleUnderstand} sx={{ fontSize: 20, textTransform: 'none' }}>Understand</Button>
            </CardActions>
          </Card>
        </div>

      </div>
    );
  }
};

export default Register;