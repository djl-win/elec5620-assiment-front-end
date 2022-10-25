import { Stack } from "@mui/system";
import React from "react";
import Card from '@mui/material/Card';
import { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Badge from '@mui/material/Badge';
import logo from '../../assets/currency.jpg'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Link } from "react-router-dom";

const Person = (props) => {
    const [item, setItem] = useState(props.location.state.item)


    return (
        <div
            style={{
                width: "100%",
                textAlign: "center"
            }}
        >
            <Card
                sx={{
                    marginTop: "60px",
                    display: "inline-block",
                    boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.1),0 8px 32px 0 rgba(202, 202, 202, 0.37)",
                    backdropFilter: "blur(5.5px)",
                    borderRadius: "30px",
                    border: "3px solid rgba( 255, 255, 255, 0.18 )"
                }}
            >   <Stack direction="row" spacing={2}>
                    <div>
                        <img
                            style={{
                                marginTop: "2px",
                                height: "600px",
                                width: "400px",
                                borderRadius: "30px",

                            }}
                            src={require(`${'../../assets/nftWorks/'}${item.nft.nftUrl}`)}
                            alt={item.nft.nftDescription}
                            loading="lazy"
                        />

                    </div>

                    <div>

                        <div
                            style={{
                                fontSize: "20px",
                                marginTop: "30px",

                                color: "#C99400",
                                display: "flex"
                            }}
                        >{item.userDetail.userDetailName}
                            <div
                                style={{
                                    marginTop: "3px",
                                    marginLeft: "5px",
                                    height: "20px",
                                    width: "20px",
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="css-14nfsts"><path fillRule="evenodd" clipRule="evenodd" d="M15.824 5.34L14.43 2.927 12.02 4.32 9.608 2.928 8.216 5.339H5.43v2.785L3.02 9.516l1.392 2.412-1.392 2.411 2.411 1.392v2.785h2.785l1.392 2.412 2.412-1.393 2.411 1.393 1.393-2.412h2.784v-2.784l2.412-1.393-1.393-2.411 1.393-2.412-2.412-1.392V5.339h-2.784zm-4.964 7.107l4.432-4.431 1.767 1.767-6.199 6.2-3.92-3.92 1.769-1.767 2.151 2.152z" fill="currentColor"></path></svg>
                            </div>
                            {'\u00A0'}{'\u00A0'}@{item.user.userUsername}
                        </div>


                        <div
                            style={{
                                marginTop: "10px",
                                fontSize: "28px",
                                color: "black",
                                display: "flex"
                            }}>
                            {item.nft.nftDescription}  #{item.nft.nftId}
                            <Badge
                                sx={{
                                    marginTop: "5px",
                                    marginLeft: '200px',
                                    marginRight: "30px"
                                }}
                                badgeContent={item.nft.nftLikes} color="secondary">
                                <FavoriteBorderIcon />
                            </Badge>
                        </div>

                        <div
                            style={{
                                marginTop: "40px",
                                fontSize: "14px",
                                color: "#707A8A",
                                display: "flex"
                            }}
                        >Current price:
                        </div>

                        <div
                            style={{
                                fontSize: "25px",
                                marginTop: "10px",
                                color: "#707A8A",
                                display: "flex"
                            }}
                        >
                            <img
                                style={{
                                    height: "30px",
                                    width: "30px",
                                    marginTop: "4px",
                                    borderRadius: "15px",

                                }}
                                alt="wrong"
                                src={logo}
                            />
                            <div
                                style={{
                                    color: "black",
                                }}
                            >

                                {'\u00A0'}{'\u00A0'}{item.nft.nftPrice}{'\u00A0'}ATX

                            </div>
                        </div>

                        <div
                            style={{
                                marginTop: "40px",
                                fontSize: "14px",
                                color: "#707A8A",
                                display: "flex"
                            }}
                        >Contact:{'\u00A0'}{item.userDetail.userDetailEmail}
                        </div>

                        <div
                            style={{
                                marginTop: "200px",
                                display: "flex"
                            }}
                        >
                            <Button color = "error" variant="contained" size="large" endIcon={<KeyboardReturnIcon />}
                                component={Link} to="/market"
                                sx={{
                                    width: "200px"
                                }}
                            >
                                Return
                            </Button>
                            <Button variant="contained" size="large" endIcon={<SendIcon />}
                                sx={{
                                    marginLeft:"20px"
                                }}>
                                Make an offer
                            </Button>
                        </div>

                    </div>
                </Stack>
            </Card>
        </div>
    );
};

export default Person;