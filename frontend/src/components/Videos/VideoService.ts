import axios from 'axios';
import IVideo from './IVideo';

export const getVideos = async () => {
    return await axios.get<IVideo[]>('http://localhost:5000/videos');
}

export const getVideo = async (id: string) => {
    return await axios.get<IVideo>('http://localhost:5000/videos/'+id);
}

export const createVideo = async (video: IVideo) => {
    return await axios.post('http://localhost:5000/videos', video);
}

export const updateVideo = async (id: string, video: IVideo) => {
    return await axios.put<IVideo>('http://localhost:5000/videos/'+id, video);
}

export const deleteVideo = async (id: string) => {
    return await axios.delete<IVideo>('http://localhost:5000/videos/'+id);
}