import React, { useEffect, useState } from 'react';
import getContract from "@/pages/utils/getContract";

export default function Main() {
    // Creating a state to store the uploaded video.js
    const [videos, setVideos] = useState([]);

    // Function to get the videos from contract
    const getVideos = async () => {
        // Get the videos from the contract
        let contract = await getContract();
        let videosCount = await contract.videoCount();
        console.log(String(videosCount));
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
                        videos.map((video) =>
                            React.createElement(
                                "div",
                                {
                                    className: "w-80",
                                    onClick: () => {
                                        window.location.href = `/video?id=${video.id}`;
                                    }
                                },
                                React.createElement(Video, { video: video })
                            )
                        )
                    }
                </div>
            </div>
        </div>
    );
}
