const sortImages = (imagesData: [], userName: string) => imagesData
  .filter((userImages: {userName: string}) => userImages.userName.substr(0, userName.length) === userName);

export default sortImages;
