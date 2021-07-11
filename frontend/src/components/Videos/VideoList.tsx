import React, { useEffect, useState } from 'react';
import IVideo from './IVideo';
import * as VideoService from './VideoService';
import VideoItem from './VideoItem';

const VideoList = () => {
    const [videos, setVideos] = useState<IVideo[]>([]);

    const loadVideos = async () => {
        const res = await VideoService.getVideos();

        const formatedVideo = res.data.map(video =>{
            return {
                ...video,
                createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
                updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date(),
            }
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        setVideos(formatedVideo);
    }

    useEffect(() => {
        loadVideos();
    }, [])

    return (
        <div className="row">
            {
                videos.map((video) => {
                    return (
                        <VideoItem key={video._id} video={video} loadVideos={loadVideos} />
                    )
                })
            }
        </div>
    )
}

export default VideoList;
