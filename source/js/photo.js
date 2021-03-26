const userPhotoChooser = document.querySelector('.ad-form__field input[type=file]');
const userPhotoPreview = document.querySelector('.ad-form-header__preview img');
const placePhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
const placePhotoPreview = document.querySelector('.ad-form__photo');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const showPhotoPreview = (element) => {

  const target = element === 'user' ? userPhotoChooser : placePhotoChooser;

  target.addEventListener('change', () => {
    const file = target.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        if (element === 'user') {
          userPhotoPreview.src = reader.result;
        }

        if (element === 'place') {
          placePhotoPreview.style.background = `no-repeat center/80% url('${reader.result}')`;
        }
      });

      reader.readAsDataURL(file);
    }
  });

}

export { showPhotoPreview };
