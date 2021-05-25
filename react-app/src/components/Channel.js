import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetch_channels, addChannel} from "../store/channel"

const Channel = () => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");
    //todo- get the server id
    //todo- get the category id
    const dispatch = useDispatch();
    // const channels = useSelector(state => state.)

    useEffect(() => {
        dispatch(fetch_channels())
    }, [dispatch])

    const onSubmit = async(e) => {
        e.preventDefault();
        await dispatch(addChannel(title)) //channel form
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
        </div>
    );
}

export default Channel;
