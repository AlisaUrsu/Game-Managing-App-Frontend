import "./AddGame.styles.css";
import { ChangeEvent, useEffect, useState } from "react";
import { Game } from "../../models/game";
import * as GamesApi from "../../network/games_api";
import { GameInput } from "../../network/games_api";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';


interface GameFormProps {
    onSubmitButton: (game: Game) => void;
};

const AddGame = ({ onSubmitButton }: GameFormProps) => {
    const [image, setImage] = useState(require("../../assets/placeholder.png"));
    const [genres, setGenres] = useState<string[]>([]);
    const [platforms, setPlatforms] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchGenresAndPlatforms() {
            try {
                const genresData = await GamesApi.getGenres();
                const platformsData = await GamesApi.getPlatforms();
                setGenres(genresData);
                setPlatforms(platformsData);
            } catch (error) {
                console.error("Failed to fetch genres and platforms", error);
            }
        }

        fetchGenresAndPlatforms();
    }, []);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && e.target.result) {
                    setImage(e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    }

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<GameInput>({});

    async function onSubmit(input: GameInput) {
        try {
            let gameResponse: Game;
            gameResponse = await GamesApi.addGame(input);
            onSubmitButton(gameResponse);
            navigate('/home');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }



    return (
        <>
            <div className="container-form">
                <div className="add-game-title">Add a new game</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="inputs">
                        <div className="write-input">
                            <div className="input-box-title">
                                <label htmlFor="title-input">Title</label>
                                <textarea id="title-input" className="title-input" {...register('title', {
                                    required: "Title is required!",
                                    minLength: { value: 2, message: "Title must be at least 2 characters long." },
                                    maxLength: { value: 100, message: "Title cannot exceed 80 characters." }
                                })} />
                                {errors.title && <div className="error">{errors.title.message}</div>}
                            </div>
                            <div className="input-box-title">
                                <label htmlFor="title-input">Developer</label>
                                <textarea id="title-input" className="title-input" {...register('developer', {
                                    required: "Developer is required!",
                                    minLength: { value: 2, message: "Developer must be at least 2 characters long." },
                                    maxLength: { value: 80, message: "Developer cannot exceed 80 characters." }
                                })} />
                                {errors.developer && <div className="error">{errors.developer.message}</div>}
                            </div>
                            <div className="input-box-title">
                                <label htmlFor="title-input">Publisher</label>
                                <textarea id="title-input" className="title-input" {...register('publisher', {
                                    required: "Publisher is required!",
                                    minLength: { value: 2, message: "Publisher must be at least 2 characters long." },
                                    maxLength: { value: 80, message: "Publisher cannot exceed 80 characters." }
                                })} />
                                {errors.publisher && <div className="error">{errors.publisher.message}</div>}
                            </div>
                            <div className="input-box-title">
                                <label htmlFor="description-input">Description</label>
                                <textarea id="description-input"
                                    placeholder="A good description summarizes the game's theme, genre, and special features without being opinionated."
                                    className="description-input"
                                    {...register('description', {
                                        required: "Description is required!",
                                        minLength: { value: 10, message: "Description must be at least 10 characters long." },
                                        maxLength: { value: 220, message: "Description cannot exceed 220 characters." }
                                    })} />
                                {errors.description && <div className="error">{errors.description.message}</div>}
                            </div>
                            <div className="input-box-title">
                                <label htmlFor="description-input">Detailed Description</label>
                                <textarea id="description-input"
                                    className="description-input"
                                    {...register('longDescription', {
                                        required: "Long Description is required!",
                                        minLength: { value: 50, message: "Description must be at least 50 characters long." },
                                        maxLength: { value: 600, message: "Description cannot exceed 600 characters." }
                                    })} />
                                {errors.longDescription && <div className="error">{errors.longDescription.message}</div>}
                            </div>
                            <div className="input-box-title">
                                <label htmlFor="genres-checkboxes">Platforms</label>
                                <div className="genres-checkboxes">
                                    {platforms.map((platform) => (
                                        <label className="checkbox-label" key={platform}>
                                            <input className="checkbox"
                                                type="checkbox"
                                                value={platform}
                                                {...register("platform")}
                                            />
                                            {platform}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="input-box-title">
                                <label htmlFor="genres-checkboxes">Genres</label>
                                <div className="genres-checkboxes">
                                    {genres.map((genre) => (
                                        <label className="checkbox-label" key={genre}>
                                            <input className="checkbox"
                                                type="checkbox"
                                                value={genre}
                                                {...register("genres")}
                                            />
                                            {genre}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="input-box-title">
                                <label htmlFor="release-year-input">Release Date</label>
                                <textarea
                                    id="release-year-input"
                                    className="release-year-input"
                                    placeholder="Enter release date (e.g., YYYY-MM-DD)"
                                    {...register("releaseDate", {
                                        required: "Release date is required!",
                                        validate: {
                                            dateFormat: value =>
                                                /^\d{4}-\d{2}-\d{2}$/.test(value) || "Enter a valid date in the format YYYY-MM-DD"
                                        }
                                    })}
                                />
                                {errors.releaseDate && <div className="error">{errors.releaseDate.message}</div>}
                            </div>
                            <div className="input-box-title">
                                <label htmlFor="rating-input">Rating</label>
                                <textarea id="rating-input" className="release-year-input"
                                    {...register('rating', {
                                        required: "Rating is required!",
                                        min: { value: 1, message: "Rating must be at least 1." },
                                        max: { value: 10, message: "Rating must be at most 10." },
                                        pattern: { value: /^\d+(\.\d{1,2})?$/, message: "Rating must be a number with up to two decimal places." }
                                    })} />
                                {errors.rating && <div className="error">{errors.rating.message}</div>}
                            </div>
                        </div>
                        <div className="input-box-title">
                            <label htmlFor="title-input">Image URL</label>
                            <textarea id="title-input" className="title-input" {...register('image')} />
                        </div>
                    </div>
                    <div className="final-buttons">
                        <input type="button" className="back-button" onClick={() => { navigate('/home') }} value="Back" />
                        <input type="submit" className="submit-button" value="Add Game" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddGame;
