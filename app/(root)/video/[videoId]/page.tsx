import { redirect } from "next/navigation";

import VideoPlayer from "@/components/VideoPlayer";
import VideoViewTracker from "@/components/VideoViewTracker";
import { getVideoById } from "@/lib/actions/video";
import VideoDetailHeader from "@/components/VideoDetailHeader";

const page = async ({ params }: Params) => {
  const { videoId } = await params;

  const videoRecord = await getVideoById(videoId);

  if (!videoRecord) {
    redirect("/404");
  }

  const { user, video } = videoRecord;

  return (
    <main className="wrapper page">
      <VideoDetailHeader
        {...video}
        userImg={user?.image}
        username={user?.name}
        ownerId={video.userId}
      />
      <section className="video-details">
        <div className="content">
          <VideoViewTracker videoId={video.videoId}>
            <VideoPlayer videoId={video.videoId} />
          </VideoViewTracker>
        </div>
      </section>
    </main>
  );
};

export default page;
