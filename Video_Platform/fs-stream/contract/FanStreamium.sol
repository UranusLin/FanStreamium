//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract FanStreamium {
    // Declaring the videoCount 0 by default
    uint256 public videoCount = 0;
    // Name of your contract
    string public name = "FanStreamium";
    // Creating a mapping of videoCount to Video
    mapping(uint256 => Video) public videos;

    // enum for define the state of the video public or private
    enum State { Public, Private }

    //  Create a struct called 'Video' with the following properties:
    struct Video {
        uint256 id;
        string hash;
        string title;
        string description;
        string thumbnailHash;
        string date;
        State state;
        address author;
    }

    // Create a 'VideoUploaded' event that emits the properties of the video
    event VideoUploaded(
        uint256 id,
        string hash,
        string title,
        string description,
        string thumbnailHash,
        string date,
        State state,
        address author
    );

    constructor() {}

    // Function to upload a video
    function uploadVideo(
        string memory _videoHash,
        string memory _title,
        string memory _description,
        string memory _thumbnailHash,
        string memory _date,
        State _state
    ) public {
        // Validating the video hash, title and author's address
        require(bytes(_videoHash).length > 0);
        require(bytes(_title).length > 0);
        require(msg.sender != address(0));

        // Incrementing the video count
        videoCount++;
        // Adding the video to the contract
        videos[videoCount] = Video(
            videoCount,
            _videoHash,
            _title,
            _description,
            _thumbnailHash,
            _date,
            _state,
            msg.sender
        );
        // Triggering the event
        emit VideoUploaded(
            videoCount,
            _videoHash,
            _title,
            _description,
            _thumbnailHash,
            _date,
            _state,
            msg.sender
        );
    }
}
