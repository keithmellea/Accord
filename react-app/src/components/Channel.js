import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allChannels, getChannelsServer, addChannel, deleteChannel, editChannel, getChannelsCategory } from "../store/channel"

const Channel = () => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");
    //todo- get the server id
    //todo- get the category id
    const dispatch = useDispatch();
    // const channels = useSelector(state => state.)

    useEffect(() => {
        dispatch(allChannels())
    }, [dispatch])

    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(addChannel(title)) //channel form
    }

    const dispatchDeleteChannel = async () => {
        let id = 32;
        await dispatch(deleteChannel(id))
    }

    const dispatchChannelsServerId = async () => {
        let server_id = 1;
        await dispatch(getChannelsServer(server_id))
    }

    const dispatchChannelsCategoryId = async () => {
        let server_id = 1;
        await dispatch(getChannelsServer(server_id))
    }

    const dispatchEditChannel = async () => {
        let id = 1;
        await dispatch(editChannel(id, title));
    }

    return (
        <div>
            <h1>Test Channels</h1>
            <form method="POST" onSubmit={onSubmit}>
                <div>
                    {errors.map((error) => (
                        <div>{error}</div>
                    ))}
                </div>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        type="text"
                        placeholder="Enter Title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button type="submit">Create Channel</button>
                </div>
            </form>
            <button onClick={dispatchDeleteChannel}>Delete a Channel</button>
            <button onClick={dispatchChannelsServerId}>Get all channels based on ServerId</button>
            <div>
                <label>Rename a channel</label>
                <input
                name="title"
                type="text"
                placeholder="Enter New Title Here..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <button onClick={dispatchEditChannel}>Submit</button>
            </div>
        </div>
    );
}

export default Channel;
