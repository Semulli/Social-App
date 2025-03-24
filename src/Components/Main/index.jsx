import React from "react";
import Sidebar from "../SideBar";
import PostCard from "../Card";
import SocialPanel from "../RightPart";



function Main() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "100vh", 
      }}
    >
      
      <Sidebar />
      <div
        style={{
          flex: 1, 
          overflowY: "auto", 
          height: "100vh", 
        }}
      >
        <PostCard />
      </div>
      <SocialPanel />
    </div>
  );
}

export default Main;
