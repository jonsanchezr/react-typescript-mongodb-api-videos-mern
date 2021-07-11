import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import IVideo from './IVideo';
import * as VideoService from './VideoService';

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Params {
    id: string
}

const VideoForm = () => {
    const history = useHistory();
    const params = useParams<Params>();

    const [video, setVideo] = useState<IVideo>({
        title: '',
        description: '',
        url: ''
    });

    const handleInputChange = (e: InputChange) => {
        setVideo({...video, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!params.id) {
            await VideoService.createVideo(video);
            toast.success('New video added');
        } else {
            await VideoService.updateVideo(params.id, video);
            toast.success('video updated');
        }

        history.push('/');
    }

    const getVideo = async (id: string) => {
        const res = await VideoService.getVideo(id);
        const { title, description, url } = res.data;
        setVideo({title, description, url});
    }

    useEffect(() => {
        if (params.id) {
            getVideo(params.id);
        }
    }, [])

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <h3>New Video</h3>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group m-3">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Title Video"
                                    className="form-control"
                                    onChange={handleInputChange}
                                    value={video.title}
                                    autoFocus
                                />
                            </div>
                            <div className="form-group m-3">
                                <input
                                    type="text"
                                    name="url"
                                    placeholder="https://site.com"
                                    className="form-control"
                                    onChange={handleInputChange}
                                    value={video.url}
                                />
                            </div>
                            <div className="form-group m-3">
                                <textarea
                                    name="description"
                                    rows={3}
                                    className="form-control"
                                    placeholder="Description Video"
                                    onChange={handleInputChange}
                                    value={video.description}
                                ></textarea>
                            </div>
                            <div className="form-group m-3">
                                {
                                    params.id ?
                                    <button className="btn btn-primary">
                                        Edit Video
                                    </button> :
                                    <button className="btn btn-primary">
                                        Create Video
                                    </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoForm;
