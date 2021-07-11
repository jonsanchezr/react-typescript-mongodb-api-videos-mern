import { RequestHandler } from 'express';
import Video from './Video';

export const getVideos: RequestHandler = async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        res.json({
            message: 'error',
            error: error
        })
    }
};

export const getVideo: RequestHandler = async (req, res) => {
    const video = await Video.findById(req.params.id);
    if (!video) {
        return res.status(204).json();
    }
    res.json(video);
};

export const createVideo: RequestHandler = async (req, res) => {
    const videoFound = await Video.findOne({url: req.body.url});
    if (videoFound) {
        return res.status(301).json({message: 'The url already exists'});
    }

    const video = new Video(req.body);
    const savedVideo = await video.save();
    res.json({
        message: 'success',
        video: savedVideo
    });
};

export const deleteVideo: RequestHandler = async (req, res) => {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
        return res.status(204).json();
    }
    res.json({
        message: "deleted",
        video: video
    });
};

export const editVideo: RequestHandler = async (req, res) => {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!video) {
        return res.status(204).json();
    }
    
    res.json({
        message: 'updated',
        video: video
    });
};