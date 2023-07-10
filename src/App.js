import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import NativeContent from "./components/NativeContent.js";
import BannerAd from "./components/BannerAd";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/eyecon" exact element={<NativeContent />}></Route>
        <Route path="/bannerad" exact element={<BannerAd />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
