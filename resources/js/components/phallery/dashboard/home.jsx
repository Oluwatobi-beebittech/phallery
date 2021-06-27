import React, { useEffect, useState, Component } from "react";
import Nav from "./nav";
import Banner from "./banner";
import CreatePost from "./create_post";
import PostContainer from "./post_component/postContainer";
import SearchBar from "./search_component/searchBar";
import axios from "axios";
import Cookies from "universal-cookie";

function Home(props) {
    const [feeds, setFeeds] = useState([]);
    const [isFeedsAvailabilityChecked, setFeedsAvailabilityChecked] = useState(
        false
    );

    const sanctumTokenCookie = new Cookies();
    const sanctumToken = sanctumTokenCookie.get("sanctum_token");

    axios.defaults.headers.common = { Authorization: "Bearer " + sanctumToken };
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const configAxios = { cancelToken: source.token };

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/feeds/all", configAxios)
            .then(response => {
                console.log(response.data);
                setFeeds(response.data);
                setFeedsAvailabilityChecked(true);
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("Home component unmounted");
                } else {
                    setFeedsAvailabilityChecked(true);
                }
            });

        return () => source.cancel("Home component unmounted");
    });

    return (
        <React.Fragment>
            <Nav hasNotification={true} count={9} />
            <Banner text="Feeds" />
            <div className="container my-3">
                <CreatePost caller="home" />
                <SearchBar />

                <div className="row">
                    {feeds.length > 0 ? (
                        feeds.map(item => (
                            <PostContainer
                                key={item.post_id}
                                imgUrl={
                                    "http://localhost:8000/" + item.post_image
                                }
                                poster_first_name={item.poster_first_name}
                                poster_last_name={item.poster_last_name}
                                poster_profile_image={item.poster_profile_image}
                                text={item.post_text}
                                poster_email={item.user_email}
                                likes={item.likes}
                                hearts={item.hearts}
                                comments={item.comments}
                                postId={item.post_id}
                                self_like={item.self_like}
                                self_heart={item.self_heart}
                                self_comment={item.self_comment}
                            />
                        ))
                    ) : isFeedsAvailabilityChecked ? (
                        <p className="offset-md-4 font-weight-bold text-center text-muted">
                            <span className="fab fa-searchengin fa-2x"></span>{" "}
                            Seems there are no posts to load.
                        </p>
                    ) : (
                        <div className="d-block font-weight-bold offset-md-6">
                            <span className="fa fa-spinner fa-pulse fa-3x text-center "></span>
                            <p className="text-center ">Loading</p>
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Home;
