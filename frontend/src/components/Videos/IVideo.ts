interface IVideo {
    createdAt?: string | Date;
    updatedAt?: string | Date;
    title: string;
    description: string;
    url: string;
    _id?: string;
}

export default IVideo;