import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { useWindowHeight, useWindowWidth } from "@react-hook/window-size";
function App() {
  const [videoData, setVideoData] = useState([]);
  const [aniviewLoading, setAniviewLoading] = useState(true);
  const [deviceHeight, setDeviceHeight] = useState("100%");
  const onlyHeight = useWindowHeight();
  const onlyWidth = useWindowWidth();

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
      } catch (error) {
        setVideoData([]);
      }
    }, 11000);

    return () => clearTimeout(scriptTimeout);
  }, []);

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
              {/* <a href="#" target="_blank" key={id}>
                <div
                  id="yt-thumb"
                  style={{
                    position: "relative",
                    width: "320px",
                    height: "200px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    margin: "10px",
                    marginLeft: "0px",
                    background: `url(${video.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPositionX: "center",
                    backgroundPositionY: "center",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0px",
                      height: "100px",
                      width: "100%",
                      background:
                        "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                    }}
                  ></div>
                  <img
                    src="https://www.ramiksadana.com/images/play.png"
                    alt="play"
                    style={{
                      position: "absolute",
                      width: "100px",
                      height: "100px",
                      left: "110px",
                      top: "30px",
                      margin: "0!important",
                    }}
                  />

                  <div id={video.source} style={{ visibility: "hidden" }}>
                    ${video.source}
                  </div>
                  <div id={{ id }} style={{ visibility: "hidden" }}>
                    ${video.creator}
                  </div>
                  <p
                    id={id}
                    style={{
                      position: "absolute",
                      bottom: "0px",
                      color: "white",
                      margin: "0px 10px",
                      marginBottom: "15px",
                      fontFamily: "sans-serif",
                      fontSize: "13px",
                    }}
                  >
                    {video.title}
                  </p>
                </div>
              </a> */}
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <div id="aniplayer"></div>
      )}
    </div>
  );
}

export default App;
