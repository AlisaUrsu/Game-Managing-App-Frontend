import {Game} from "../../models/game";
import {ChangeEvent, useEffect, useState} from "react";
import * as GamesApi from "../../network/games_api";
import { GameInput } from "../../network/games_api";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

interface GameFormProps {
    onUpdateButton: (game: Game) => void;
};

const UpdateGame = ({ onUpdateButton }: GameFormProps) => {
    const [genres, setGenres] = useState<string[]>([]);
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [game, setGame] = useState<Game | null>(null);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<GameInput>();

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

        async function fetchGame() {
            try {
                const response = await GamesApi.fetchGameById(id!);
                setGame(response);
                reset(response); // Reset form with fetched game data
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }

        fetchGame();
        fetchGenresAndPlatforms();
    }, [id, reset]);

    async function onSubmit(input: GameInput) {
        try {
            if (game) {
                const gameResponse = await GamesApi.updateGame(game._id, input);
                onUpdateButton(gameResponse);
                navigate('/home');
            }
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }


    return (
        <div className="container-form">
            <div className="add-game-title">Update Game</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="inputs">
                    <div className="input-box-title">
                        <label htmlFor="title-input">Title</label>
                        <textarea id="title-input" className="title-input" {...register('title', {
                            required: "Title is required!",
                            minLength: { value: 2, message: "Title must be at least 2 characters long." },
                            maxLength: { value: 100, message: "Title cannot exceed 100 characters." }
                        })} />
                        {errors.title && <div className="error">{errors.title.message}</div>}
                    </div>
                    <div className="input-box-title">
                        <label htmlFor="developer-input">Developer</label>
                        <textarea id="developer-input" className="title-input" {...register('developer', {
                            required: "Developer is required!",
                            minLength: { value: 2, message: "Developer must be at least 2 characters long." },
                            maxLength: { value: 80, message: "Developer cannot exceed 80 characters." }
                        })} />
                        {errors.developer && <div className="error">{errors.developer.message}</div>}
                    </div>
                    <div className="input-box-title">
                        <label htmlFor="publisher-input">Publisher</label>
                        <textarea id="publisher-input" className="title-input" {...register('publisher', {
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
                        <label htmlFor="longDescription-input">Detailed Description</label>
                        <textarea id="longDescription-input"
                            className="description-input"
                            {...register('longDescription', {
                                required: "Long Description is required!",
                                minLength: { value: 50, message: "Description must be at least 50 characters long." },
                                maxLength: { value: 600, message: "Description cannot exceed 600 characters." }
                            })} />
                        {errors.longDescription && <div className="error">{errors.longDescription.message}</div>}
                    </div>
                    <div className="input-box-title">
                        <label htmlFor="platforms-checkboxes">Platforms</label>
                        <div className="genres-checkboxes">
                            {platforms.map((platform) => (
                                <label key={platform} className="checkbox-label">
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
                                <label key={genre} className="checkbox-label">
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
                    <div className="input-box-title">
                        <label htmlFor="image-input">Image URL</label>
                        <textarea id="image-input" className="title-input" {...register('image')} />
                    </div>
                </div>
                <div className="final-buttons">
                    <input type="button" className="back-button" onClick={() => { navigate('/home') }} value="Back" />
                    <input type="submit" className="submit-button" value="Update Game" />
                </div>
            </form>
        </div>
    );
}

export default UpdateGame;