import React from 'react';
import IVideo from './IVideo';
import ReactPlayer from 'react-player';
import * as VideoService from './VideoService';
import { useHistory } from 'react-router-dom';

import './VideoItem.css'

interface Props {
    video: IVideo;
    loadVideos: () => void;
}

const VideoItem = ({video, loadVideos}: Props) => {
    const history = useHistory();

    const handleDelete = async (id: string) => {
        await VideoService.deleteVideo(id);
        loadVideos();
    }

    return (
        <div className="col-md-4">
            <div
                className="card card-body video-card"
            >
                <div className="d-flex justify-content-between">
                    <h1 onClick={() => history.push(`/${video._id}/edit`)}>{video.title}</h1>
                    <span className="text-danger" onClick={() => video._id && handleDelete(video._id)}>X</span>
                </div>
                <p>{video.description}</p>
                <div className="embed-responsive embed-responsive-16by9">
                    <ReactPlayer url={video.url} width='100%'/>
                </div>
            </div>
        </div>
    )
}

export default VideoItem;
