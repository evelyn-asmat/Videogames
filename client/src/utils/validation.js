export default function validation(userData) {
    const errors = {};

    if (!userData.name.length) errors.name = "Name is required";
    else {
        if (userData.name.length < 1) errors.name = "Min. 1 character";
        if (userData.name.length > 255) errors.name = "Max. 255 characters";
    }

    if (!userData.description.length) errors.description = "Description is required";
    else {
        if (userData.name.length < 1) errors.description = "Min. 1 character";
        if (userData.description.length > 255) errors.description = "Max. 255 characters";
    }

    if (!userData.image.length) errors.image = "Image is required";

    if (!userData.released.length) errors.released = "Released is required";
    else {
        // TODO: validate date
    }

    if (!userData.rating.length) errors.rating = "Rating is required";
    else {
        // TODO: validate range
    }

    // TODO: validate platforms and genres

    return errors;
}