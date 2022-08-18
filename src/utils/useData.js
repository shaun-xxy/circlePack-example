import { useState, useEffect } from 'react';
import { json } from 'd3';

const jsonUrl = `${process.env.PUBLIC_URL}/all_sciStrut_res.json`;

export const useData = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        json(jsonUrl).then(setData)
    }, []);
    return data;
}