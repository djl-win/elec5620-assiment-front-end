import React from "react";
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AccountMenu from "./AccountMenu";
import { Link } from "react-router-dom";
import { storageUtils } from "../utils/storageUtils";
import axios from "axios";


class HomeHeader extends React.Component {
  //hook特定依赖项，在页面更新时，只更新依赖项中的变量，不更新其他变量  const [count, setCount] = React.useState(null);    useEffect(() => {console.log(count)}, [count])

  //页面加载前执行一次,相当于函数组件中的useEffect，并传入一个空数组，只执行一次 useEffect(() => {}, [])
  constructor(props) {
    super(props);
    //页面还未加载时把用户名存到localStorage，页面直接渲染
    if (storageUtils.getUser() === '') {
      storageUtils.saveUser(window.location.href.split("=")[1]);
      //页面还未加载时把用户的avatar存到localStorage，页面直接渲染
      localStorage.setItem('avator', 'https://api.multiavatar.com/' + window.location.href.split("=")[1] + '.png');
    }

  }

  //页面加载前执行一次，render后会继续执行一次,相当于函数组件中的useEffect,useEffect(() => {})
  componentDidMount() {

    //页面每进行一次render，就去检测用户是否拥有钱包，如果没有钱包，就去创建钱包，存储到localStorage中
    this.checkWallet();

  }

  //判断是否拥有钱包,并打开menu
  checkWallet = async (event) => {
    console.log("checkWallet");

    const response = await axios({
      method: "post",
      url: "/5620/wallets",
    }).catch(err => {
      alert(err);
    })

    //打印响应数据
    // console.log(response.data);

    if (response.data.code === 40011) {
      localStorage.setItem('walletsJudge', '/profile/wallet');

      // alert(response.data.msg);
    } else if (response.data.code === 40010) {
      localStorage.setItem('walletsJudge', '/profile/register');
      //link到钱包页面,可以使用路由拦截器
      // alert(response.data.msg);

    }

  };

  render() {
    //fixed
    // 有bug，不能刷新页面，刷新完之后，用户名不能显示，因为localStorage中的数据从url获取的，刷新完之后url就变了
    //解决的方法就是在登陆的时候，把返回的用户数据存储到localStorage
    //因为这里的登录页面的端口不在3000端口，所以不能用localStorage
    //如果登录的时候存储到localStorage,在8080的localstorage中，而不是在3000的localstorage中，所以不能用localStorage
    //等整合到一个端口的时候在解决这个问题，暂时就别刷新页面了，因为这个问题不是很重要

    // storageUtils.saveUser(window.location.href.split("=")[1]);
    // storageUtils.saveUser('admin');
    // console.log(storageUtils.getUser());

    return (
      // <Router>
      <div className="App">
        <div className="homeHeader">

          <div className="headerImage">
            {/* 图片宽高 */}
            <img src={logo} alt="logo" width={260} height={120} />
          </div>

          <div className="headerSearch">
            <Paper
              component="form"
              sx={{ p: "4px 4px", display: "flex", alignItems: "center", width: 600 }}
            >
              <InputBase
                className="headerSearchInput"
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search items or accounts"
                inputProps={{ "aria-label": "search items and accounts" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>

          <div className="headerExplore">
            <Stack spacing={5} direction="row" >
              {/* disableRipple 禁用背景色 */}
              {/* hover禁用背景色 */}
              {/* textTransfore禁用大写 */}
              <Button component={Link} to="/explore" variant="text" disableRipple sx={{ fontSize: 21, color: 'black', "&:hover": { backgroundColor: "transparent" }, textTransform: 'none' }}>Explore</Button>
              <Button component={Link} to="/rank" variant="text" disableRipple sx={{ fontSize: 21, color: 'black', "&:hover": { backgroundColor: "transparent" }, textTransform: 'none' }} >Rank</Button>
              <Button component={Link} to="/transaction" variant="text" disableRipple sx={{ fontSize: 21, color: 'black', "&:hover": { backgroundColor: "transparent" }, textTransform: 'none' }} >Transaction</Button>
              <AccountMenu />
            </Stack>
          </div>

        </div>
      </div>
      // </Router>
    );
  }
}

export default HomeHeader;