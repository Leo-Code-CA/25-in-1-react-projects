import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import useFetch from "../../custom-hooks/useFetch";
import SearchBar from "../search-bar";
import './style.css';

export default function ImageSlider() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [dogBreed, setDogBreed] = useState({ breed: 'sheepdog', sub_breed: 'shetland' });
    const { data: dogListData, error: dogListError, pending: dogListPending } = useFetch(`https://dog.ceo/api/breeds/list/all`);
    const { data: dogBreedImages, error: dogBreedImagesError, pending: dogBreedImagesPending } = useFetch(`https://dog.ceo/api/breed/${dogBreed.breed}${dogBreed.sub_breed && `/${dogBreed.sub_breed}`}/images/random/10`);

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

    function handleDogBreedChoice(e, id = null) {

        if (!id && formattedBreedList.length > 0) {
            e.preventDefault();
            const filteredBreedList = formattedBreedList.filter(breed => breed?.name.startsWith(userInput));
            const space = filteredBreedList[0].name.indexOf(' ');
            setDogBreed(space === - 1 ? {
                breed: filteredBreedList[0].name,
                sub_breed: ''
            } : {
                breed: filteredBreedList[0].name.slice(space + 1),
                sub_breed: filteredBreedList[0].name.slice(0, space)
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

        setUserInput('');

    }

    return (
        <div className="imageSlider">
            <div className="imageSlider__searchBar">
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
            <div className="imageSlider__imgWrapper">
                <button 
                onClick={() => setCurrentSlide(s => s === 0 ? dogBreedImages?.message?.length - 1 : s - 1)}>
                    <BsArrowLeftCircleFill />
                </button>
                {
                    dogBreedImages && dogBreedImages.message && dogBreedImages.message.length > 0 ? 
                    dogBreedImages.message.map((imageItem, index) =>
                        <div 
                        className={currentSlide === index ? "imageSlider__img imageSlider__img--active" : "imageSlider__img"}
                        key={imageItem.slice(imageItem.lastIndexOf('/') + 1, imageItem.lastIndexOf('.'))}>
                            <img
                            alt={dogBreed.sub_breed ? `${dogBreed.sub_breed} ${dogBreed.breed}` : dogBreed.breed}
                            src={imageItem}
                            />
                        </div>
                    )
                    : null
                }
                <button
                onClick={() => setCurrentSlide(s => s === dogBreedImages?.message?.length - 1 ? 0 : s + 1)}>
                    <BsArrowRightCircleFill />
                </button>
            </div>
            <div className="imageSlider__indicatorsWrapper">
                {
                    dogBreedImages && dogBreedImages.message && dogBreedImages.message.length > 0 ?
                    dogBreedImages.message.map((_, index) =>
                        <button
                        key={index}
                        className={currentSlide === index ? "imageSlider__indicator imageSlider__indicator--active" : "imageSlider__indicator"}
                        onClick={() => setCurrentSlide(index)}
                        ></button>
                    )
                    : null
                }
            </div>
        </div>
    );
}