import React from "react";
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import currency from '../../assets/currency.jpg'
import Button from '@mui/material/Button';
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


class Wallet extends React.Component {

  state = {
    //dialog的显示
    open: false,
    //要充值的金额
    charge: {
      amount: ''
    },
    
    //钱包的信息
    wallet: {
      accountId:'',
      accountPublicKey:'',
      accountAvatar:'',
      accountBalance:'',
      accountDeleted:'',
      accountUserId:''
    },
    
    //历史记录信息
    historyLog:[]

  }

  //页面加载前执行一次，render后会继续执行一次,相当于函数组件中的useEffect,useEffect(() => {})
  componentDidMount() {
    this.handleSearch();
  }

  //页面的states变化就会执行
  componentDidUpdate() {
    // this.handleSearch();
  }

  //一进入页面就执行的操作，向后台发送请求，查询用户数据
  handleSearch = async () => {

    //发送ajax请求到后端,查询历史记录等数据
    const response = await axios({
      method: "get",
      url: "/5620/wallets",
    }).catch(err => {
      alert(err);
    })


    //封装用户钱包信息
    if(response.data.code === 40011){
      this.setState({
        wallet: response.data.data.account,
        historyLog: response.data.data.searchList
      })
    } else if(response.data.code === 40010){
      alert(response.data.msg);
    } else{
      alert("Something wrong, please contact the IT team");
    }
  }


  //dialog里面的充值按钮
  handleCharge = async (event) => {

    //组织默认事件
    event.preventDefault();

    //发送ajax请求到后端
    const response = await axios({
      method: "put",
      url: "/5620/wallets",
      data: this.state.charge
    }).catch(err => {
      alert(err);
    })

    //设置长值页面不可见
    this.setState({
      open: false
    })

    //充值成功之后可以设置一些操作，这里还没
    alert(response.data.msg);
    this.handleSearch();
  }

  //dialog打开按钮
  handleClickOpen = () => {
    this.setState({
      open: true
    })
  };

  //dialog关闭按钮
  handleClose = () => {
    this.setState({
      open: false
    })
  };

  render() {
    const columns = [
      { field: "logId", headerName: "ID", width: 100 },
      { field: "logPrice", headerName: "Top-up amount", width: 160 },
      { field: "logDate", headerName: "Top-up date", width: 160 },
      { field: "logStatus", headerName: "Top-up status", width: 160 },
    ];

    const rows = 
      this.state.historyLog;
    

    return (
      <div
        className="walletPage">

        <Card
          className="walletCard"
          variant="outlined"
        >
          <Stack
            spacing={0}
            direction="row"
          >
            <div className="walletLeft">
              <div
                className="walletLeftAvator"
              >
                <Avatar
                  alt="None"
                  src={localStorage.getItem('avator')}
                  sx={{ width: 60, height: 60 }}
                />
              </div>

              <div style={{ fontFamily: 'Times New Roman' }}>
                <h1>{this.state.wallet.accountAvatar}</h1>
              </div>

              <div
                className="walletLeftPubKey"
              >
                {this.state.wallet.accountPublicKey}
              </div>

              <div className="walletLeftBalance">
                <div className="walletLeftBalanceAvatar">
                  <Avatar
                    alt="None"
                    src={currency}
                    sx={{ width: 50, height: 50 }}
                  />
                </div>
                <div style={{ color: 'rgb(255,255,255)', fontSize: '25px', marginLeft: '20px', marginTop: '25px' }}>
                  {this.state.wallet.accountBalance}{"\u00a0"}ATX
                </div>
              </div>

              <div className="walletLeftFooter">
                <span style={{ fontWeight: 'bold' }} >@Group3-CREATX</span><br /><br></br>
                <span >Contact day.dong99@yahoo.com</span> <br />
              </div>
            </div>

            <div className="walletRight">
              <Stack
                spacing={0}
              >
                <div className="walletRightHeader">
                  <div className="walletRightBalance">
                    <div className="walletRightBalanceAvatar">
                      <Avatar
                        alt="None"
                        src={currency}
                        sx={{ width: 50, height: 50 }}
                      />
                      <br />
                      <br />
                      History
                    </div>
                    <div style={{ fontSize: '25px', marginLeft: '20px', marginTop: '25px' }}>
                      {this.state.wallet.accountBalance}{"\u00a0"}ATX
                    </div>
                    <div className="walletRightBalanceCharge">
                     
                      <Button onClick={this.handleClickOpen} variant="outlined" color="primary" sx={{fontSize: 15, textTransform: 'none' }}>Charge</Button>
                      
                      <Dialog open={this.state.open} onClose={this.handleClose}>
                        <DialogTitle>Charge</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Please enter the amount of ATX digital currency you want to purchase
                          </DialogContentText>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="Amount"
                            label="Amount"
                            fullWidth
                            variant="standard"
                            onChange={(e) => {
                              this.setState({
                                charge: {
                                  amount: e.target.value
                                }
                              })
                            }}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={this.handleClose}>Cancel</Button>
                          <Button onClick={this.handleCharge}>Buy</Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="walletRightFooter">
                    <div style={{ height: 400, width: "100%" }}>
                      <DataGrid
                        sx={{
                          border: "none", // also tried setting to none 

                        }}
                        getRowId={rows => rows.logId}
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                      />
                    </div>
                  </div>
                </div>
              </Stack>
            </div>
          </Stack>
        </Card>


      </div>
    );
  }
};

export default Wallet;