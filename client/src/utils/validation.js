export default function validation(formData) {
    const errors = {};

    if (!formData.name.length) errors.name = "Name is required";
    else {
        if (formData.name.length < 1) errors.name = "Min. 1 character";
        if (formData.name.length > 255) errors.name = "Max. 255 characters";
    }

    if (!formData.description.length) errors.description = "Description is required";
    else {
        if (formData.description.length < 50) errors.description = "Min. 100 character";
        if (formData.description.length > 1000) errors.description = "Max. 255 characters";
    }

    if (!formData.image.length) errors.image = "Image is required";

    if (!formData.released.length) errors.released = "Released is required";
    else {
        const releasedDate = new Date(formData.released);
        const minDate = new Date("01/01/1950");
        const maxDate = new Date();

        if (isNaN(releasedDate.getTime())) errors.released = "Invalid date"
        if (releasedDate < minDate || releasedDate > maxDate) errors.released = "Date out of range"
    }

    if (!formData.rating.length) errors.rating = "Rating is required";
    else {
        if (formData.rating < 0 || formData.rating > 5) errors.rating = "Rating out of range"
    }

    if (!formData.platforms.length) errors.platforms = "Platforms are required";
    if (!formData.genres.length) errors.genres = "Genres are required";

    return errors;
}