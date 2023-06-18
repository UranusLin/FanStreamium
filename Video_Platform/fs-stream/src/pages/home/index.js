import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import getContract from "@/utils/getContract";
import Video from "@/components/Video";

export default function Main() {
    // Creating a state to store the uploaded video
    const [videos, setVideos] = useState([]);

    // Function to get the videos from contract
    const getVideos = async () => {
        // Get the videos from the contract
        let contract = await getContract();
        let videosCount = await contract.videoCount();
        let videos = [];
        for (var i = videosCount; i >= 1; i--) {
            let video = await contract.videos(i);
            videos.push(video);
        }
        setVideos(videos);
    };

    useEffect(() => {
        // Runs the function getVideos when the component is mounted
        getVideos();
    }, []);
    return (
        <div className="w-full bg-[#1a1c1f] flex flex-row">
            <div className="flex-1 h-screen flex flex-col">
                <div className="flex flex-row flex-wrap">
                    {
                        videos.map((video) => (
                            // eslint-disable-next-line react/jsx-key
                            <div
                                className="w-80"
                                onClick={() => {
                                    // Navigation to the video screen (which we will create later)
                                    window.location.href = `/video?id=${video.id}`;
                                }}
                            >
                                <Video video={video} key={video.id} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
