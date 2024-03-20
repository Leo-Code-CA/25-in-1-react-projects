import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import useFetch from "../../custom-hooks/useFetch";
import SearchBar from "../search-bar";
// import './style.css';

export default function ImageSlider() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [dogBreed, setDogBreed] = useState({ breed: 'sheepdog', sub_breed: 'shetland' });
    const { data: dogBreedData, error: dogBreedError, pending: dogBreedPending } = useFetch(`https://dog.ceo/api/breed/${dogBreed.breed}${dogBreed.sub_breed && `/${dogBreed.sub_breed}`}/images/random/10`);const { data: dogListData, error: dogListError, pending: dogListPending } = useFetch(`https://dog.ceo/api/breeds/list/all`);

    let formattedBreedList = [];

    for (const breed in dogListData?.message) {
        if (dogListData?.message?.[breed]?.length > 0) {
            dogListData.message[breed].map(subBreed => formattedBreedList.push({
                name: `${subBreed} ${breed}`,
                id: Math.round(Math.random() * 10000),
                string: `${subBreed.slice(0, 1).toUpperCase() + subBreed.slice(1)} ${breed.slice(0, 1).toUpperCase() + breed.slice(1)}`
            }));
        } else {
            formattedBreedList.push({
                name: breed,
                id: Math.round(Math.random() * 10000),
                string: breed.slice(0, 1).toUpperCase() + breed.slice(1)
            });
        }
    }

    // console.log(formattedBreedList);
    console.log(dogBreed);
    console.log(dogBreedData);

    function handleDogBreedChoice(e, id = null) {

        if (!id && formattedBreedList.length > 0) {
            e.preventDefault();
            // WRONG HERE YOU NEED TO FILTER THE BREED LIST FIRST DEPENDING ON THE USER INPUT! :)
            const space = formattedBreedList[0].name.indexOf(' ');
            setDogBreed(space === - 1 ? {
                breed: formattedBreedList[0].name,
                sub_breed: ''
            } : {
                breed: formattedBreedList[0].name.slice(space + 1),
                sub_breed: formattedBreedList[0].name.slice(0, space)
            });
        } else if (id && formattedBreedList.length > 0) {
            const findBreed = formattedBreedList.find(breed => breed.id === id);
            const space = findBreed?.name.indexOf(' ');
            findBreed && setDogBreed(space === - 1 ? {
                breed: findBreed?.name,
                sub_breed: ''
            } : {
                breed: findBreed.name.slice(space + 1),
                sub_breed: findBreed.name.slice(0, space)
            });
        }

    }


    // function handlePrevious() {
    //     setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
    // }

    // function handleNext() {
    //     setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
    // }


    // if (loading) {
    //     return <div>Loading data! Please wait...</div>;
    // }

    // if (errorMsg !== null) {
    //     return <div>Error occured! {errorMsg}</div>;
    // }

    return (
        <div className="imageSlider">
            <div>
                <SearchBar 
                searchBarInfo={{
                    label: 'Enter the name of your favorite dog breed',
                    placeholder: 'Shetland Sheepdog',
                    id: 'dogbreed'
                }}
                handleSearch={handleDogBreedChoice}
                dataList={formattedBreedList}
                searchParams={userInput}
                setSearchParams={setUserInput}
                />
            </div>
            {/* <BsArrowLeftCircleFill 
            // onClick={handlePrevious}
            className="arrow arrow-left"/>
            {
                images && images.length ? 
                images.map((imageItem, index) =>
                    <img
                    key={imageItem.id}
                    alt={imageItem.download_url}
                    src={imageItem.download_url}
                    className={currentSlide === index ? "current-image" : "current-image hide-current-image"}
                    />
                )
                : null
            }  */}
            {/* <BsArrowRightCircleFill 
            onClick={handleNext}
            className="arrow arrow-right"
            /> */}
            <span className="circle-indicators">
                {/* {
                    images && images.length ?
                    images.map((_, index) =>
                        <button
                        key={index}
                        className={currentSlide === index ? "current-indicator" : "current-indicator inactive-indicator"}
                        onClick={() => setCurrentSlide(index)}
                        ></button>
                    )
                    : null
                }; */}
            </span>
        </div>
    );
}