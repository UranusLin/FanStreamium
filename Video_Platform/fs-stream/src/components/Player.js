import React from 'react';
import { useAsset, Player } from '@livepeer/react';

const VideoPlayer = ({ id }) => {
    return (
        <Player
            src={`https://gateway.lighthouse.storage/ipfs/${id}`}
            showPipButton
            showTitle={false}
            aspectRatio="16to9"
            controls={{
                autohide: 3000,
            }}
        />
    );
};

export default VideoPlayer;
