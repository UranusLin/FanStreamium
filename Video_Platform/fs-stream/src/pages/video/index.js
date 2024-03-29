import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BiCheck } from "react-icons/bi";
import Avvvatars from "avvvatars-react";
import getContract from "@/utils/getContract";
import VideoPlayer from "@/components/Player";
import VideoComponent from "@/components/Video";
import colors from "tailwindcss/colors";

export default function Video() {
    const router = useRouter();
    const { id } = router.query;
    const [video, setVideo] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState([]);

    const fetchVideos = async () => {
        if (id) {
            let contract = await getContract();
            let video = await contract.videos(id);
            let videosCount = await contract.videoCount();
            let vCount = videosCount.toNumber();
            let videos = [];
            for (var i = vCount; i >= 1; i--) {
                let video = await contract.videos(i);
                // Don't add the current video to the related videos list
                console.log(i, id)
                if (i !== parseInt(id)) {
                    videos.push(video);
                }
            }
            setRelatedVideos(videos);
            setVideo(video);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, [id]);

    return (
            <div className="flex flex-1 flex-col">
                {video && (
                    <div className="m-10 flex flex-col justify-between	  lg:flex-row">
                        <div className="w-6/6 lg:w-4/6">
                            <VideoPlayer id={video.hash} />
                            <div className="border-border-light dark:border-border-dark flex flex-row justify-between border-b-2 py-4">
                                <div>
                                    <h3 className="text-transform: text-2xl capitalize dark:text-white">
                                        {video.title}
                                    </h3>
                                    <p className="mt-1 text-gray-500 ">{video.category} </p>
                                </div>
                            </div>
                            <div>
                                <div className="mt-5 flex flex-row items-center ">
                                    <div className="w-12">
                                        <Avvvatars value={video.author.slice(2, 13)} size={50} />
                                    </div>
                                    <div className="ml-3 flex flex-col">
                                        <p className="text-md mt-1 flex items-center text-black dark:text-white">
                                            {video.author.slice(0, 13)}...{" "}
                                            <BiCheck size="20px" className="fill-gray ml-1" />
                                        </p>
                                        <p className="text-subtitle-light flex items-center text-sm ">
                                            Video by {video.author}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-text-light dark:text-text-dark text-textSubTitle mt-4 ml-16 text-sm">
                                    {video.description}
                                </p>
                            </div>
                        </div>
                        <div className="w-2/6">
                            <h4 className="text-md ml-5 mb-3 font-bold text-black dark:text-white">
                                Related Videos
                            </h4>
                            {relatedVideos.map((relatedVideo) => (
                                <Link href={`/video/?id=${relatedVideo.id}`} key={relatedVideo.id}>
                                    <div className="flex flex-col m-5 cursor-pointer">
                                        <img
                                            className="object-cover rounded-lg w-60"
                                            src={`${process.env.NEXT_PUBLIC_LIGHT_HOUSE_URL}${relatedVideo.thumbnailHash}`}
                                            alt={relatedVideo.title}
                                        />
                                        <h4 className="text-md font-bold dark:text-white mt-3 w-60">
                                            {relatedVideo.title}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
    );
}
