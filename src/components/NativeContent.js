import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useWindowHeight } from "@react-hook/window-size";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate, useLocation } from "react-router-dom";

const NativeContent = () => {
  const history = useNavigate();
  const location = useLocation();
  const [aniviewLoading, setAniviewLoading] = useState(true);
  const [videoData, setVideoData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const onlyHeight = useWindowHeight();

  useEffect(() => {
    console.log("height", onlyHeight);
    const scriptTimeout = setTimeout(async () => {
      let config = {
        method: "post",
        url: "https://o50zw4lkpj.execute-api.us-east-1.amazonaws.com/prod/eyecon/v2/get-videos?inputLang=auto&outputLang=en&category=Entertainment",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "VX6UXjRJM1MpFUrnuXY24UsSpYOKCoQ6OLgoFdOg",
        },
      };
      try {
        const response = await axios(config);
        const { translatedResult } = response.data;
        console.log(response.data);
        setVideoData(translatedResult);
        setAniviewLoading(false);

        const newSearch = new URLSearchParams(location.search);
        console.log(videoData);
        newSearch.set("id", translatedResult[0].content_id);
        history({
          pathname: location.pathname,
          search: newSearch.toString(),
        });
      } catch (error) {
        setVideoData([]);
      }
    }, 11000);

    return () => clearTimeout(scriptTimeout);
  }, []);

  useEffect(() => {}, []);
  const handleSlide = (selectedIndex) => {
    // Perform any additional actions or logic based on the slide change event
    setActiveIndex(selectedIndex);
    const video = videoData[selectedIndex];
    console.log("present video", video.content_id);
    const newSearch = new URLSearchParams(location.search);
    newSearch.set("id", video.content_id);

    history({
      pathname: location.pathname,
      search: newSearch.toString(),
    });
  };
  return (
    <div
      style={{
        margin: "0",
        padding: "0",
        display: "flex",
        width: "100%",
        height: "100vh",
        backgroundColor: "rgb(12, 20, 36)",
      }}
    >
      <Helmet>
        <script
          src="https://s3.amazonaws.com/embed.footylight.com/aniview/footylight-eyecon-outstream-1.js"
          async
        ></script>
      </Helmet>
      {!aniviewLoading && videoData.length > 0 ? (
        <Carousel
          activeIndex={activeIndex}
          onSelect={handleSlide}
          style={{
            display: "flex",
            width: "0",
            flexBasis: "100%",
            backgroundSize: "cover",
          }}
        >
          {videoData.slice(0, 10).map((video, id) => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <Carousel.Item style={{ position: "relative" }} key={id}>
              <img
                src="https://www.ramiksadana.com/images/play.png"
                alt="play"
                style={{
                  position: "absolute",
                  width: "100px",
                  left: "35%",
                  top: "30%",
                  alignItems: "center",
                  margin: "0!important",
                  zIndex: "500000",
                }}
              />
              <img
                style={{
                  margin: "0",
                  backgroundSize: "cover",
                  width: "100%",
                  filter: "brightness(50%)",
                }}
                className="d-block"
                src={video.thumbnail}
                alt="First slide"
              />
              <Carousel.Caption>
                <p style={{ margin: "0", textAlign: "center" }}>
                  {video.title}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <div id="aniplayer"></div>
      )}
    </div>
  );
};

export default NativeContent;
