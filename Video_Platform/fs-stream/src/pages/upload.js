import React, { useState, useEffect, useRef } from "react";
import { BiCloud, BiPlus } from "react-icons/bi";
import getContract from "@/utils/getContract";
import lighthouse from '@lighthouse-web3/sdk';

export default function Upload() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [state, setState] = useState(0);
    const [thumbnail, setThumbnail] = useState();
    const [video, setVideo] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
    const [isUploadingVideo, setIsUploadingVideo] = useState(false);


    const thumbnailRef = useRef(null);
    const videoRef = useRef();


    const goBack = () => {
        window.history.back();
    };

    const handleSubmit = async () => {
        let data = {
            video,
            title,
            description,
            thumbnail,
            UploadedDate: Date.now(),
            state,
        };

        await saveVideo(data);
        handleDiscard()
        goBack()
    };

    const progressCallback = (progressData) => {
        let percentageDone =
            100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        console.log(percentageDone);
        setUploadProgress(percentageDone); // Set the upload progress state
    };

    const uploadToLighthouse = async (e, type) => {
        // check if file is selected
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        setIsUploading(true);
        setUploadProgress(0);
        if (type === "thumbnail") {
            setIsUploadingThumbnail(true);
        } else {
            setIsUploadingVideo(true);
        }
        const output = await lighthouse.upload(e.target.files,  process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY, progressCallback);
        console.log('File Status:', output);
        let cid = output.data.Hash;
        if (type === "thumbnail") {
            setThumbnail(cid);
            setIsUploadingThumbnail(false)
        } else {
            setVideo(cid);
            setIsUploadingVideo(false)
        }
        setIsUploading(false);
    };

    const saveVideo = async (data) => {
        const contract = await getContract();
        await contract.uploadVideo(
            data.video,
            data.title,
            data.description,
            data.thumbnail,
            data.UploadedDate,
            data.state
        );

    };

    const handleDiscard = () => {
        setTitle("");
        setDescription("");
        setState("");
        setThumbnail(null);
        setVideo("");
        setIsUploading(null);
    };

    return (
        <div className="w-full h-screen bg-[#1a1c1f] flex flex-row">
            <div className="flex-1 flex flex-col">
                <div className="mt-5 mr-10 flex  justify-end">
                    <div className="flex items-center">
                        <button className="bg-transparent  text-[#9CA3AF] py-2 px-6 border rounded-lg  border-gray-600  mr-6" onClick={handleDiscard}>
                            Discard
                        </button>
                        <button
                            onClick={() => {
                                handleSubmit();
                            }}
                            className="bg-blue-500 hover:bg-blue-700 text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center"
                        >
                            <BiCloud />
                            <p className="ml-2">Upload</p>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col m-10     mt-5  lg:flex-row">
                    <div className="flex lg:w-3/4 flex-col ">
                        <label className="text-[#9CA3AF]  text-sm">Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter your video title here"
                            className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                        />
                        <label className="text-[#9CA3AF] mt-10">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter a brief description for your video here"
                            className="w-[90%] text-white h-32 placeholder:text-gray-600  rounded-md mt-2 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                        />

                        <div className="flex flex-row mt-10 w-[90%]  justify-between">
                            <div className="flex flex-col w-2/5    ">
                                <label className="text-[#9CA3AF]  text-sm">Video State</label>
                                <select
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                                >
                                    <option value="0">Public</option>
                                    <option value="1">Private</option>
                                </select>
                            </div>
                        </div>
                        <label className="text-[#9CA3AF]  mt-10 text-sm">Thumbnail</label>

                        <div
                            onClick={() => {
                                thumbnailRef.current.click();
                            }}
                            className="border-2 w-64 border-gray-600  border-dashed rounded-md mt-2 p-2  h-36 items-center justify-center flex"
                        >
                            {isUploadingThumbnail ? (
                                <div>
                                    <div className="border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                                    <p className="mt-6 items-center justify-center flex">{uploadProgress}%</p>
                                </div>
                            ) : thumbnail ? (
                                <img
                                    onClick={() => {
                                        thumbnailRef.current.click();
                                    }}
                                    src={`${process.env.NEXT_PUBLIC_LIGHT_HOUSE_URL}${thumbnail}`}
                                    alt="thumbnail"
                                    className="h-full rounded-md"
                                />
                            ) : (
                                <BiPlus size={40} color="gray" />
                            )}
                        </div>

                        <input
                            type="file"
                            className="hidden"
                            ref={thumbnailRef}
                            onChange={(e) => {
                                uploadToLighthouse(e, "thumbnail");
                            }}
                        />
                    </div>

                    <div
                        onClick={() => {
                            videoRef.current.click();
                        }}
                        className={
                            video
                                ? " w-96   rounded-md  h-64 items-center justify-center flex"
                                : "border-2 border-gray-600  w-96 border-dashed rounded-md mt-8   h-64 items-center justify-center flex"
                        }
                    >
                        {isUploadingVideo ? (
                            <div>
                                <div className="border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                                <p className="mt-6 items-center justify-center flex">{uploadProgress}%</p>
                            </div>
                        ) : video ? (
                            <video
                                controls
                                src={`${process.env.NEXT_PUBLIC_LIGHT_HOUSE_URL}${video}`}
                                className="h-full rounded-md"
                            />
                        ) : (
                            <p className="text-[#9CA3AF]">Upload Video</p>
                        )}
                    </div>
                </div>
                <input
                    type="file"
                    className="hidden"
                    ref={videoRef}
                    accept={'video/*'}
                    onChange={(e) => {
                        uploadToLighthouse(e, "video");
                    }}
                />
            </div>
        </div>
    );
}
