import { useEffect } from "react";

const BannerAd = () => {
  useEffect(() => {
    const avScript = document.createElement("script");
    avScript.src =
      "https://s3.amazonaws.com/embed.footylight.com/aniview/footylight-101greatgoals-mobile.js";
    avScript.async = true;
    document.head.appendChild(avScript);
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
      <div id="footylight_contextual_player_sticky"></div>
    </div>
  );
};
export default BannerAd;
