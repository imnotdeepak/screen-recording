import React from "react";
import Header from "../../components/Header";
import VideoCard from "../../components/VideoCard";
import { getAllVideos } from "@/lib/actions/video";
import EmptyState from "@/components/EmptyState";

const Page = async ({ searchParams }: SearchParams) => {
  const { query, filter, page } = await searchParams;

  const { videos } = await getAllVideos(query, filter, Number(page) || 1);

  return (
    <main className="wrapper page">
      <Header subHeader="Public Library" title="All Videos" />

      {videos?.length > 0 ? (
        <section className="video-grid">
          {videos.map(({ video, user }) => {
            return (
              <VideoCard
                key={video.id}
                {...video}
                userImg={user?.image || ""}
                username={user?.name || "Guest"}
                thumbnail={video.thumbnailUrl}
                duration={video.duration || 0}
                videoId={video.videoId}
              />
            );
          })}
        </section>
      ) : (
        <EmptyState
          icon="/assets/icons/video.svg"
          title="No Videos Found"
          description="Try adjusting your search."
        />
      )}
    </main>
  );
};

export default Page;
