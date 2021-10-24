const handleSortImages = (imagesData: [], userName: string) => imagesData
  .filter(
    (userImages: {userName: string}) => userImages.userName.substring(0, userName.length) === userName,
  );

export default handleSortImages;
