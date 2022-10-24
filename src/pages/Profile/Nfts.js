import { FormGroup } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';
import React from "react";
// import base64ImageDecoder from 'b64-to-image';
import mergeImages from 'merge-images';
import axios from "axios";
import ItemList from "../../component/NFTItemList";
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';


class Nfts extends React.Component {

  state = {
    //返回用户的所有nft信息
    itemData: [],

    nftBase64: '',
    //是否打开对话框
    open: false,

    open1: false,

    //nft背景
    background: '',
    //nft身体
    body: '',
    //nft眼睛
    eyes: '',
    //nft眼镜
    glass: '',
    //nft嘴巴
    mouth: '',
    //nft外套
    outfit: '',
    //nft胡子
    beard: '',
    //nft描述
    nftDes: '',
    //是否加载进度条
    loading: false

  }

  //页面加载时显示用户所有的nft信息
  componentDidMount() {
    this.handleSearchNft();
  }
  //一进入页面就执行的操作，向后台发送请求，查询用户数据
  handleSearchNft = async () => {

    //发送ajax请求到后端,查询历史记录等数据
    const response = await axios({
      method: "get",
      url: "/5620/nfts",
    }).catch(err => {
      alert(err);
    })
    // console.log(response.data);

    //封装用户nft信息
    if (response.data.code === 40011) {
      this.setState({
        itemData: response.data.data
      })
    } else if (response.data.code === 40010) {
      alert("Search Nfts unsuccessfuly");
    } else {
      alert("Something wrong in nft page, please contact the IT team");
    }

  }


  //dialog打开按钮
  handleClickOpen = () => {
    this.setState({
      open: true
    })
  };

  //dialog1打开按钮
  handleClickOpen1 = () => {
    this.setState({
      open1: true,
      nftDes: ""
    })
  };

  //dialog关闭按钮
  handleClose = () => {
    this.setState({
      open: false
    })
  };

  //dialog1关闭按钮
  handleClose1 = () => {
    this.setState({
      open1: false,
      nftDes: ""
    })

  };

  //表单处理
  handleChange = e => {
    e.preventDefault();
    //获取当前dom对象
    const target = e.target;
    //获取当前dom对象的name属性
    const name = target.name;
    //获取当前dom对象的value属性
    const value = target.type === 'checkbox' ? target.checked : target.value;
    //更新状态
    this.setState({
      [name]: value
    })

  };

  //创建nft
  handleNft = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.handleClose();
    // Jimp;
    var a = require('../../assets/nftLayer/background/' + this.state.background);
    var b = require('../../assets/nftLayer/body/' + this.state.body);
    var c = require('../../assets/nftLayer/eyes/' + this.state.eyes);
    var d = require('../../assets/nftLayer/glass/' + this.state.glass);
    var e = require('../../assets/nftLayer/mouth/' + this.state.mouth);
    var f = require('../../assets/nftLayer/outfit/' + this.state.outfit);
    var g = require('../../assets/nftLayer/beard/' + this.state.beard);

    var images = [a, b, c, d, e, f, g];

    //发送base64编码的，字节数组到后台，后台接收之后，把这个字节数组转化为图片保存到本地，地址存储到数据库中
    mergeImages(images).then(async (b64) => {
      // console.log(b64);
      // this.setState({
      //   nftBase64: b64
      // })
      const response = await axios({
        method: "post",
        url: "/5620/nfts/createNft",
        data: { nftBase64: b64 }
      }).catch(err => {
        alert(err);
      })
      if (response.data.code === 10011) {
        alert(response.data.msg);
        this.handleSearchNft();
      } else if (response.data.code === 10010) {
        alert(response.data.msg);
      } else {
        alert("Something wrong, please retry!")
      }
    });
  }

  //通过描述创建NFT
  handleNft1 = async () => {
    //判断是否加载动画
    this.setState({
      loading: true
    })
    const novelAi = {
      "input": "masterpiece, best quality, " + this.state.nftDes + ".",
      "model": "safe-diffusion",
      "parameters": {
        "width": 1024,
        "height": 1024,
        "scale": 11,
        "sampler": "k_euler_ancestral",
        "steps": 28,
        "seed": 616118412,
        "n_samples": 1,
        "ucPreset": 0,
        "qualityToggle": true,
        "uc": "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry"
      }
    }

    const response = await axios({
      method: "post",
      url: "https://api.novelai.net/ai/generate-image",
      data: novelAi,
      headers: { authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVOOHhuOVBacWFDSkN1NDQwNVV4VCIsIm5jIjoiVFk0eXlZRE40cWtIOHY3MTI2ZWxuIiwiaWF0IjoxNjY2NTI3MzMyLCJleHAiOjE2NjkxMTkzMzJ9.yDkf8G6uv0AGdb5bt-0FdDVJlWYZ-L0kxtuqldF8ljw" }
    }).catch(err => {
      alert(err);
    })

    if (response.status === 201) {
      const res = await axios({
        method: "post",
        url: "/5620/nfts/createNft",
        data: { nftBase64: response.data }
      }).catch(err => {
        alert(err);
      })
      if (res.data.code === 10011) {
        this.handleClose1();
        alert(res.data.msg);
        this.handleSearchNft();
      } else if (res.data.code === 10010) {
        alert(res.data.msg);
      } else {
        alert("Something wrong, please retry!")
      }
    } else {
      alert("Something wrong, please retry! Contact Jiale!")
    }
    //判断是否加载动画
    this.setState({
      loading: false
    })
    this.handleClose1();
    this.handleSearchNft();

  }

  render() {
    //加载动态数据
    return (
      <div className="nftPage">
        <div className="nftHeader">
          <h1 className="nftHeaderText">Enter the World</h1>
          <div className="nftHeaderButtonCreateNft">
            <Button onClick={this.handleClickOpen} color="success" disableRipple sx={{ "&:hover": { backgroundColor: "transparent" }, color: 'black', fontSize: 20, textTransform: 'none' }}> Type1</Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
              <DialogTitle>Creat NFT</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To create NFTs, enter the characteristics of NFTs below.
                </DialogContentText>

                <FormGroup sx={{ marginTop: "20px" }}>
                  <Stack spacing={3}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Background</InputLabel>

                      {/* 背景 */}
                      <Select
                        name='background'
                        value={this.state.background}
                        onChange={this.handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'1.png'}>Cyan</MenuItem>
                        <MenuItem value={'2.png'}>Claybank</MenuItem>
                        <MenuItem value={'3.png'}>Pink</MenuItem>
                        <MenuItem value={'4.png'}>Gray</MenuItem>
                        <MenuItem value={'5.png'}>Brown</MenuItem>
                        <MenuItem value={'6.png'}>Mazarine</MenuItem>
                        <MenuItem value={'7.png'}>Yellow</MenuItem>
                        <MenuItem value={'8.png'}>Green</MenuItem>
                        <MenuItem value={'9.png'}>Wathet</MenuItem>
                        <MenuItem value={'10.png'}>Red</MenuItem>
                        <MenuItem value={'11.png'}>Buff</MenuItem>
                        <MenuItem value={'12.png'}>Blue</MenuItem>
                        <MenuItem value={'13.png'}>Silver</MenuItem>
                        <MenuItem value={'14.png'}>Galaxy</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      {/* 身体 */}
                      <InputLabel id="demo-simple-select-label">Body</InputLabel>
                      <Select
                        name='body'
                        value={this.state.body}
                        onChange={this.handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'1.png'}>Yellow</MenuItem>
                        <MenuItem value={'2.png'}>Leopard</MenuItem>
                        <MenuItem value={'3.png'}>Blue</MenuItem>
                        <MenuItem value={'4.png'}>Brown</MenuItem>
                        <MenuItem value={'5.png'}>Black</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      {/* 眼睛 */}
                      <InputLabel id="demo-simple-select-label">Eyes</InputLabel>
                      <Select
                        name='eyes'
                        value={this.state.eyes}
                        onChange={this.handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'1.png'}>Blue</MenuItem>
                        <MenuItem value={'2.png'}>Yellow</MenuItem>
                        <MenuItem value={'3.png'}>Black</MenuItem>
                        <MenuItem value={'4.png'}>Red</MenuItem>
                        <MenuItem value={'5.png'}>Green</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      {/* 眼镜 */}
                      <InputLabel id="demo-simple-select-label">Glass</InputLabel>
                      <Select
                        name='glass'
                        value={this.state.glass}
                        onChange={this.handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'1.png'}>Brown</MenuItem>
                        <MenuItem value={'2.png'}>Yellow</MenuItem>
                        <MenuItem value={'3.png'}>Black</MenuItem>
                        <MenuItem value={'4.png'}>Red</MenuItem>
                        <MenuItem value={'5.png'}>Blue</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      {/* 嘴巴 */}
                      <InputLabel id="demo-simple-select-label">Mouth</InputLabel>
                      <Select
                        name='mouth'
                        value={this.state.mouth}
                        onChange={this.handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'1.png'}>Zipper</MenuItem>
                        <MenuItem value={'2.png'}>Regular</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      {/* 外套 */}
                      <InputLabel id="demo-simple-select-label">Outfit</InputLabel>
                      <Select
                        name='outfit'
                        value={this.state.outfit}
                        onChange={this.handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'1.png'}>Black</MenuItem>
                        <MenuItem value={'2.png'}>Red</MenuItem>
                        <MenuItem value={'3.png'}>Blue</MenuItem>
                        <MenuItem value={'4.png'}>Hoody</MenuItem>
                        <MenuItem value={'5.png'}>Colorful</MenuItem>
                        <MenuItem value={'6.png'}>Aqua</MenuItem>
                        <MenuItem value={'7.png'}>White</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      {/* 胡子 */}
                      <InputLabel id="demo-simple-select-label">Beard</InputLabel>
                      <Select
                        name='beard'
                        value={this.state.beard}
                        onChange={this.handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'1.png'}>Style 1</MenuItem>
                        <MenuItem value={'2.png'}>Style 2</MenuItem>
                        <MenuItem value={'3.png'}>Style 3</MenuItem>
                        <MenuItem value={'4.png'}>Style 4</MenuItem>
                        <MenuItem value={'5.png'}>Style 5</MenuItem>
                        <MenuItem value={'6.png'}>Style 6</MenuItem>
                        <MenuItem value={'7.png'}>Style 7</MenuItem>
                        <MenuItem value={'8.png'}>Style 8</MenuItem>
                        <MenuItem value={'9.png'}>Style 9</MenuItem>
                      </Select>
                    </FormControl>

                  </Stack>
                </FormGroup>

              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button onClick={this.handleNft}>Create</Button>
              </DialogActions>
            </Dialog>
            {/* <img src={require(`${'file:///D:\\nftImages\\4b49fd5488904f46b32a5e179eeadbe9.png'}`)}></img> */}
          </div>

          <div className="nftHeaderButtonCreateNft1">
            <Button onClick={this.handleClickOpen1} color="success" disableRipple sx={{ "&:hover": { backgroundColor: "transparent" }, color: 'black', fontSize: 20, textTransform: 'none' }}> Type2</Button>
            {/* 进度条 */}
            <Dialog
              open={this.state.open1}
              onClose={this.handleClose1}
              sx={{
                fontFamily: 'Nunito Sans',
                fontStyle: "normal"
              }}
            >
              <Fade
                in={this.state.loading}
                style={{
                  transitionDelay: this.state.loading ? '800ms' : '0ms',
                }}
                unmountOnExit

              >
                <CircularProgress style={{
                  width: '50px',
                  height: '50px',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  margin: 'auto',
                }}
                  color="secondary"
                />
              </Fade>
              <DialogTitle
                sx={{
                  fontSize: "25px",
                  fontWeight: "bold"
                }}
              >Create NFT</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter the description of this NFT you would like to create
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Description"
                  name="nftDes"
                  type="description"
                  fullWidth
                  variant="standard"
                  value={this.state.nftDes}
                  onChange={this.handleChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose1} sx={{ textTransform: 'none' }}>Cancel</Button>
                <Button onClick={this.handleNft1} sx={{ textTransform: 'none' }}>Create</Button>
              </DialogActions>
            </Dialog>


          </div>
        </div>

        <div className="nftBody">
          <div className="nftBodyImageList">
            <ItemList listData={this.state.itemData}></ItemList>


          </div>
        </div>

      </div>
    );
  }
};

export default Nfts;