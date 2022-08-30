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
import React from "react";
// import base64ImageDecoder from 'b64-to-image';
import mergeImages from 'merge-images';

class Nfts extends React.Component {
 
  state = {

    img:'',
    //是否打开对话框
    open: false,

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
    beard: ''


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
  handleNft = e => {
    e.preventDefault();
    console.log(this.state);

    // Jimp;
    var a = require('../../assets/nftLayer/background/'+ this.state.background);
    var b = require('../../assets/nftLayer/body/'+ this.state.body);
    var c = require('../../assets/nftLayer/eyes/' +  this.state.eyes);
    var d = require('../../assets/nftLayer/glass/' +  this.state.glass);
    var e = require('../../assets/nftLayer/mouth/' +  this.state.mouth);
    var f = require('../../assets/nftLayer/outfit/' +  this.state.outfit);
    var g = require('../../assets/nftLayer/beard/'+ this.state.beard);

    var images = [a, b, c, d, e, f, g];


    mergeImages(images).then((b64) => {
      console.log(b64);
      this.setState({
        img: b64
      })
    });

  }

  render() {
    return (
      <div className="nftPage">
        <div className="nftHeader">
          <h1 className="nftHeaderText">Enter the World</h1>
          <div className="nftHeaderButtonCreateNft">
            <Button onClick={this.handleClickOpen} color="success" disableRipple sx={{ "&:hover": { backgroundColor: "transparent" }, color: 'black', fontSize: 20, textTransform: 'none' }}> Go</Button>
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

          </div>
        {/* <img src={this.state.img}></img> */}
        </div>
      </div>
    );
  }
};

export default Nfts;