module.exports = ({ env }) => ({
    // ...
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        upload_config: {
            folder: env('CLOUDINARY_FOLDER'),
           // ... and some
        },
        actionOptions: {
          upload: {
            folder: env('CLOUDINARY_FOLDER'),
          },
          delete: {},
        },
      },
    },
    // ...
  });