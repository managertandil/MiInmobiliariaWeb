// path: config/plugins.ts

export default ({ env }) => ({
  // ... otras configuraciones de plugins si las tienes ...
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
      },
     actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});