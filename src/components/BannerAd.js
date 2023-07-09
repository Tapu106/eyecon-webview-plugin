import { useEffect } from "react";
import { Helmet } from "react-helmet";
const BannerAd = () => {
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
          src="https://s3.amazonaws.com/embed.footylight.com/aniview/footylight-101greatgoals-mobile.js"
          async
        ></script>
      </Helmet>
      <div id="footylight_contextual_player_sticky"></div>
    </div>
  );
};
export default BannerAd;
