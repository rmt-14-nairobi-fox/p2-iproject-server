const sampleImage = 'https://images.freeimages.com/images/large-previews/981/cow-1380252.jpg'

cloudinary.config({ 
  cloud_name: 'stories-for-all', 
  api_key: '231633758676674', 
  api_secret: 'G5Z5Ab-HoqZBwil_8mcWsYvy3Tw' 
});

cloudinary.v2.uploader.upload(sampleImage,
  { public_id: "sample_woman" }, 
  function(error, result) {console.log(error,result); });

