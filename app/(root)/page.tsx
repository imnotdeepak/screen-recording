import React from "react";
import Header from "../../components/Header";
import VideoCard from "../../components/VideoCard";
import { dummyCards } from "../../constants";

const Page = () => {
  return (
    <main className="page">
      <Header title="All Videos" subHeader="Public Library" />
      <h1 className="text-3xl font-karla">Welcome to Loom Clone</h1>
      <section className="video-grid">
        {dummyCards.map((card) => (
          <VideoCard key={card.id} {...card} />
        ))}
      </section>
    </main>
  );
};

export default Page;
