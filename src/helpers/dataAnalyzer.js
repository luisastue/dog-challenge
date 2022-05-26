
export const getBreedFromImage = (imageUrl) => {
    
    const breedAndImage = imageUrl.replace("https://images.dog.ceo/breeds/", "")
    const breedAndSubBreed = breedAndImage.substring(0,breedAndImage.indexOf('/'));
    const middle = breedAndImage.indexOf('-')
    const breed = middle > 0 ? breedAndSubBreed.substring(0,middle) : breedAndSubBreed;
    const subBreed = middle > 0 ? breedAndSubBreed.slice(middle+1) : '';
    return {
        breed: breed.charAt(0).toUpperCase() + breed.slice(1), 
        subBreed: subBreed.charAt(0).toUpperCase() + subBreed.slice(1), 
        path: subBreed ? breed+"/"+subBreed : breed
    }
}
