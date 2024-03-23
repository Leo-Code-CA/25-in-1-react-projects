import { useEffect, useState } from "react";
import useFetch from './../../custom-hooks/useFetch.jsx';

export default function LoadMore() {

    const { data: memeFetchData, error: memeFetchError, pending: memeFetchLoading } = useFetch('https://api.imgflip.com/get_memes');
    const { data: jokeFetchData, error: jokeFetchError, pending: jokeFetchLoading } = useFetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=10&safe-mode');

    let funnyData = [];

    function handleDataFormatting() {

        let updatedMeme;
        let updatedJoke;

        if (memeFetchData?.length > 0 && jokeFetchData.length > 0) {
            memeFetchData?.data?.memes?.map(meme => {
                const { id, name, url } = meme;
                updatedMeme.push({
                    id,
                    name,
                    url,
                    type: 'meme'
                });
            });
    
            jokeFetchData?.jokes.map(joke => {
                const { category, delivery, id, setup, type: part } = joke;
                updatedJoke.push({
                    id,
                    setup,
                    delivery,
                    category,
                    part,
                    type: 'joke'
                });
            });
    
            for (let i = 0; i < updatedJoke.length; i++) {
                funnyData.push(memeFetchData[i]);
                funnyData.push(jokeFetchData[i]);
            }
        }

    }

    handleDataFormatting();
    console.log(funnyData);

    // console.log(memeFetchData);
    // id: "181913649"
    // name: "Drake Hotline Bling"
    // url: "https://i.imgflip.com/30b1gx.jpg"
    // console.log(jokeFetchData);
    // category: "Dark"
    // delivery: "I don't know, he hasn't opened it yet."
    // id: 144
    // setup: "What did the boy with no arms get for Christmas?"
    // type: "twopart"

    return (
        <div className="loadMore">
            <h2>Let's joke a little bit!</h2>
        </div>
    );
}